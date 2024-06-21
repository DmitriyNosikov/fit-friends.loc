import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { BasePostgresRepository } from '@server/libs/data-access';

import { TrainingEntity } from './training.entity';
import { TrainingInterface } from './interfaces/training.interface';
import { TrainingFactory } from './training.factory';

import { DefaultSearchParam } from '@shared/types/search/base-search-query.type';
import { TrainingSearchFilters, TrainingSearchQuery } from '@shared/training';
import { SortDirectionEnum, SortType, SortTypeEnum } from '@shared/types/sort/sort.enum';
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

    const itemsEntities = items.map((item) => this.createEntityFromDocument(item as unknown as TrainingInterface));

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
    where.AND = [];

    // Поиск по заголовку
    if(query?.title) {
      where.title = {
        contains: query.title,
        mode: 'insensitive'
      }
    }

    // Поиск по определенному типу
    if(query?.trainingType) {
      if(!Array.isArray(query.trainingType)) {
        query.trainingType = [query.trainingType];
      }

      where.trainingType = {
        in: query.trainingType,
      };
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
    if(query?.caloriesFrom || query?.caloriesTo) {
      this.setCaloriesFilter(query, andFilters);
    }

    // Поиск по рейтингу/диапазону рейтингов
    if(query?.ratingFrom || query?.ratingTo) {
      this.setRatingFilter(query, andFilters);
    }

    // Добавление установелнных фильтров
    if(andFilters.length > 0) {
      where.AND.push(...andFilters);
    }

    // Сортировка и направление сортировки
    const { key, value } = this.getSortKeyValue(query.sortType, query.sortDirection);

    orderBy[key] = value;

    return { where, orderBy };
  }

  private getSortKeyValue(sortType: SortTypeEnum, sortDirection: SortDirectionEnum) {
    switch(sortType) {
      case(SortType.CREATED_AT): {
        return { key: 'createdAt', value: sortDirection };
      }
      case(SortType.PRICE): {
        return { key: 'price', value: sortDirection };
      }
      case(SortType.CALORIES): {
        return { key: 'calories', value: sortDirection };
      }
      case(SortType.RATING): {
        return { key: 'rating', value: sortDirection };
      }
      default: {
        return { key: DefaultSearchParam.SORT.TYPE, value: DefaultSearchParam.SORT.DIRECTION };
      }
    }
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

    if(priceFilterFrom.length > 0 || priceFilterTo.length > 0) {
      andFilters.push({ OR: priceFilterFrom } as never);
      andFilters.push({ OR: priceFilterTo } as never);
    }
  }

  private setCaloriesFilter(query: TrainingSearchQuery, andFilters: AndFilters ) {
    const caloriesFilterFrom = [];
    if(query?.caloriesFrom) {
      caloriesFilterFrom.push({ calories: { equals: query.caloriesFrom } })
      caloriesFilterFrom.push({ calories: { gt: query.caloriesFrom } })
    }

    const caloriesFilterTo = [];
    if(query?.caloriesTo) {
      caloriesFilterTo.push({ calories: { equals: query.caloriesTo } })
      caloriesFilterTo.push({ calories: { lt: query.caloriesTo } })
    }

    if(caloriesFilterFrom.length > 0 || caloriesFilterTo.length > 0) {
      andFilters.push({ OR: caloriesFilterFrom } as never);
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

    if(ratingFilterFrom.length > 0 || ratingFilterTo.length > 0) {
      andFilters.push({ OR: ratingFilterFrom } as never);
      andFilters.push({ OR: ratingFilterTo } as never);
    }
  }

  private async getItemsCount(where: Prisma.TrainingWhereInput): Promise<number> {
    return this.dbClient.training.count({ where });
  }

  private calculateItemsPage(totalCount: number, limit: number): number {
    const postsPages = Math.ceil(totalCount / limit);
    return postsPages;
  }
}