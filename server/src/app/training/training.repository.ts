import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { BasePostgresRepository } from '@server/libs/data-access';

import { TrainingEntity } from './training.entity';
import { TrainingInterface } from './interfaces/training.interface';
import { TrainingFactory } from './training.factory';

import { DefaultSearchParam } from '@shared/types/search/base-search-query.type';
import { TrainingSearchFilters, TrainingSearchQuery } from '@shared/training';
import { SortDirectionEnum} from '@shared/types/sort/sort-direction.enum';
import { TrainingSortType, TrainingSortTypeEnum } from '@shared/training';
import { PaginationResult } from '@server/libs/interfaces';

type AndFilters = [{ 'OR'?: Prisma.TrainingWhereInput[] }] | [];
@Injectable()
export class TrainingRepository extends BasePostgresRepository<TrainingEntity, TrainingInterface> {
  constructor(
    entityFactory: TrainingFactory,
    readonly dbClient: PrismaClientService
  ) {
    super(entityFactory, dbClient);
  }


  public async findById(trainingId: string): Promise<TrainingEntity | null> {
    const training = await this.dbClient.training.findFirst({
      where: { id: trainingId }
    });

    if (!training) {
      return null;
    }

    return this.getEntity(training);
  }

  public async search(query?: TrainingSearchQuery): Promise<PaginationResult<TrainingEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = (!query?.limit || query?.limit > DefaultSearchParam.MAX_ITEMS_PER_PAGE) ? DefaultSearchParam.MAX_ITEMS_PER_PAGE : query.limit;
    const { where, orderBy } = this.getSearchFilters(query);

    // Запрос на получение результата поиска
    const [items, totalItemsCount] = await Promise.all([
      this.dbClient.training.findMany({
        where,

        // Pagination
        take,
        skip,
        orderBy
      }),
      this.getItemsCount(where)
    ]);

    const itemsEntities = items.map((item) => this.getEntity(item));

    return {
      entities: itemsEntities,
      currentPage:  query?.page ?? 0,
      totalPages: this.calculateItemsPage(totalItemsCount, take),
      totalItems: totalItemsCount,
      itemsPerPage: take ?? totalItemsCount,
    }
  }

  public async create(entity: TrainingEntity): Promise<TrainingEntity | null> {
    const training = await this.dbClient.training.create({
      data: entity
    });

    if (!training) {
      return null;
    }

    return this.getEntity(training);
  }

  public async updateById(
    trainingId: string,
    fieldsToUpdate: Partial<TrainingEntity>
  ): Promise<TrainingEntity | null> {
    const updatedTraining = await this.dbClient.training.update({
      where: { id: trainingId },
      data: { ...fieldsToUpdate }
    });

    if (!updatedTraining) {
      return Promise.resolve(null);
    }

    return this.getEntity(updatedTraining);
  }

  public async deleteById(trainingId: string): Promise<void> {
    await this.dbClient.training.delete({
      where: { id: trainingId }
    });
  }

  public async getTrainingsForUser(query?: TrainingSearchQuery): Promise<PaginationResult<TrainingEntity>> {
    const convenientTrainings = await this.search(query);

    return convenientTrainings;
  }

  public async exists(trainingId: string): Promise<boolean> {
    const training = await this.dbClient.training.findFirst({
      where: { id: trainingId }
    });

    if (!training) {
      return false;
    }

    return true;
  }

  private getEntity(document): TrainingEntity {
    return this.createEntityFromDocument(document as unknown as TrainingInterface);
  }

  //////////////////// Вспомогательные методы поиска и пагинации ////////////////////
  private getSearchFilters(query: TrainingSearchQuery): TrainingSearchFilters {
    const where: Prisma.TrainingWhereInput = {};
    const orderBy: Prisma.TrainingOrderByWithRelationInput = {};

    const andFilters: AndFilters = [];

    // Поиск по заголовку
    if(query?.title) {
      where.title = {
        contains: query.title,
        mode: 'insensitive'
      }
    }

    // Поиск по определенному типу тренировок
    if(query?.trainingType) {
      if(!Array.isArray(query.trainingType)) {
        query.trainingType = [query.trainingType];
      }

      if(query.trainingType.length > 0) {
        where.trainingType = {
          in: query.trainingType,
        };
      }
    }

    // Поиск по длительности тренировок
    if(query?.trainingDuration) {
      if(!Array.isArray(query.trainingDuration)) {
        query.trainingDuration = [query.trainingDuration];
      }

      if(query.trainingDuration.length > 0) {
        where.trainingDuration = {
          in: query.trainingDuration,
        };
      }
    }

    // Поиск по уровню пользователя
    if(query?.level) {  
      where.userLevel = query.level;
    }

    // Поиск по полу
    if(query?.gender) {  
      where.gender = query.gender;
    }

    // Поиск по цене/диапазону цен
    if(query?.priceFrom || query?.priceTo) {
      this.setPriceFilter(query, andFilters);
    }

    // Поиск по калориям/диапазону калорий
    if(query?.dayCaloriesFrom || query?.dayCaloriesTo) {
      this.setDayCaloriesFilter(query, andFilters);
    }

    // Поиск по рейтингу/диапазону рейтингов
    if(query?.ratingFrom || query?.ratingTo) {
      this.setRatingFilter(query, andFilters);
    }

    // Добавление установелнных фильтров
    if(andFilters.length > 0) {
      where.AND = [];
      where.AND.push(...andFilters);
    }

    // Сортировка и направление сортировки
    const { key, value } = this.getSortKeyValue(query.sortType, query.sortDirection);

    orderBy[key] = value;

    return { where, orderBy };
  }

  private setPriceFilter(query: TrainingSearchQuery, andFilters: AndFilters ) {
    const priceFilterFrom = [];
    if(query?.priceFrom) {
      priceFilterFrom.push({ price: { equals: query.priceFrom } })
      priceFilterFrom.push({ price: { gt: query.priceFrom } })
    }

    const priceFilterTo = [];
    if(query?.priceTo) {
      priceFilterTo.push({ price: { equals: query.priceTo } })
      priceFilterTo.push({ price: { lt: query.priceTo } })
    }

    if(priceFilterFrom.length > 0) {
      andFilters.push({ OR: priceFilterFrom } as never);
    }

    if(priceFilterTo.length > 0) {
      andFilters.push({ OR: priceFilterTo } as never);
    }
  }

  private setDayCaloriesFilter(query: TrainingSearchQuery, andFilters: AndFilters ) {
    const caloriesFilterFrom = [];
    if(query?.dayCaloriesFrom) {
      caloriesFilterFrom.push({ calories: { equals: query.dayCaloriesFrom } })
      caloriesFilterFrom.push({ calories: { gt: query.dayCaloriesFrom } })
    }

    const caloriesFilterTo = [];
    if(query?.dayCaloriesTo) {
      caloriesFilterTo.push({ calories: { equals: query.dayCaloriesTo } })
      caloriesFilterTo.push({ calories: { lt: query.dayCaloriesTo } })
    }

    if(caloriesFilterFrom.length > 0) {
      andFilters.push({ OR: caloriesFilterFrom } as never);
    }

    if( caloriesFilterTo.length > 0) {
      andFilters.push({ OR: caloriesFilterTo } as never);
    }
  }

  private setRatingFilter(query: TrainingSearchQuery, andFilters: AndFilters ) {
    const ratingFilterFrom = [];
    if(query?.ratingFrom) {
      ratingFilterFrom.push({ rating: { equals: query.ratingFrom } })
      ratingFilterFrom.push({ rating: { gt: query.ratingFrom } })
    }

    const ratingFilterTo = [];
    if(query?.ratingTo) {
      ratingFilterTo.push({ rating: { equals: query.ratingTo } })
      ratingFilterTo.push({ rating: { lt: query.ratingTo } })
    }

    if(ratingFilterFrom.length > 0 ) {
      andFilters.push({ OR: ratingFilterTo } as never);
    }

    if(ratingFilterTo.length > 0) {
      andFilters.push({ OR: ratingFilterTo } as never);
    }
  }

  private getSortKeyValue(sortType: TrainingSortTypeEnum, sortDirection: SortDirectionEnum) {
    switch(sortType) {
      case(TrainingSortType.CREATED_AT): {
        return { key: 'createdAt', value: sortDirection };
      }
      case(TrainingSortType.PRICE): {
        return { key: 'price', value: sortDirection };
      }
      case(TrainingSortType.CALORIES): {
        return { key: 'calories', value: sortDirection };
      }
      case(TrainingSortType.RATING): {
        return { key: 'rating', value: sortDirection };
      }
      default: {
        return { key: DefaultSearchParam.SORT.TYPE, value: DefaultSearchParam.SORT.DIRECTION };
      }
    }
  }

  private async getItemsCount(where: Prisma.TrainingWhereInput): Promise<number> {
    return this.dbClient.training.count({ where });
  }
}