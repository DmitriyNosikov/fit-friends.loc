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

      console.log('QUERY: ', query);

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
      const priceFilterFrom = [];
      if(query?.priceFrom) {
        priceFilterFrom.push({ price: { equals: query.priceFrom } })
        priceFilterFrom.push({ price: { gt: query.priceFrom } })
      }

      const priceFilterTo = [];
      if(query?.priceTo) {
        where.OR.push({ price: { equals: query.priceTo } })
        where.OR.push({ price: { lt: query.priceTo } })
      }

      if(priceFilterFrom.length > 0 || priceFilterTo.length > 0) {
        where.AND.push({ OR: priceFilterFrom });
        where.AND.push({ OR: priceFilterTo });
      }

      // Поиск по калориям/диапазону калорий
      const caloriesFilterFrom = [];
      if(query?.caloriesFrom) {
        where.OR.push({ calories: { equals: query.caloriesFrom } })
        where.OR.push({ calories: { gt: query.caloriesFrom } })
      }

      const caloriesFilterTo = [];
      if(query?.caloriesTo) {
        where.OR.push({ calories: { equals: query.caloriesTo } })
        where.OR.push({ calories: { lt: query.caloriesTo } })
      }

      if(caloriesFilterFrom.length > 0 || caloriesFilterTo.length > 0) {
        where.AND.push({ OR: caloriesFilterFrom });
        where.AND.push({ OR: caloriesFilterTo });
      }

      // Поиск по рейтингу/диапазону рейтингов
      const ratingFilterFrom = [];
      if(query?.ratingFrom) {
        where.OR.push({ rating: { equals: query.ratingFrom } })
        where.OR.push({ rating: { gt: query.ratingFrom } })
      }

      const ratingFilterTo = [];
      if(query?.ratingTo) {
        where.OR.push({ rating: { equals: query.ratingTo } })
        where.OR.push({ rating: { lt: query.ratingTo } })
      }

      if(ratingFilterFrom.length > 0 || ratingFilterTo.length > 0) {
        where.AND.push({ OR: caloriesFilterFrom });
        where.AND.push({ OR: caloriesFilterTo });
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
        default: {
          return { key: DefaultSearchParam.SORT.TYPE, value: DefaultSearchParam.SORT.DIRECTION };
        }
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