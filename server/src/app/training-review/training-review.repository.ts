import { Injectable } from '@nestjs/common';

import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { BasePostgresRepository } from '../libs/data-access';

import { TrainingReviewInterface } from './interfaces';
import { TrainingReviewFactory } from './training-reviews.factory';
import { TrainingReviewEntity } from './training-review.entity';
import { BaseSearchQuery, SortDirection, SortType, SortTypeEnum, TrainingIdPayload } from '@shared/types';
import { PaginationResult } from '@server/libs/interfaces';
import { DefaultSearchParam } from '@shared/types/search/base-search-query.type';
import { TrainingReviewsSearchFilters } from '@shared/training-review';
import { Prisma } from '@prisma/client';

@Injectable()
export class TrainingReviewRepository extends BasePostgresRepository<TrainingReviewEntity, TrainingReviewInterface> {
  constructor(
    entityFactory: TrainingReviewFactory,
    readonly dbClient: PrismaClientService
  ) {
    super(entityFactory, dbClient);
  }

  public async findById(reviewId: string): Promise<TrainingReviewEntity | null> {
    const review = await this.dbClient.trainingReview.findFirst({
      where: { id: reviewId }
    });

    if (!review) {
      return null;
    }

    const reviewEntity = this.getEntity(review);

    return reviewEntity;
  }


  public async findByTrainingId(trainingId: string): Promise<TrainingReviewEntity[] | null> {
    const reviews = await this.dbClient.trainingReview.findMany({
      where: { trainingId }
    });

    if (!reviews) {
      return null;
    }

    const reviewEntities = reviews.map((review) => this.getEntity(review));

    return reviewEntities;
  }

  public async search(query?: BaseSearchQuery & TrainingIdPayload): Promise<PaginationResult<TrainingReviewEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = (!query?.limit || query?.limit > DefaultSearchParam.MAX_ITEMS_PER_PAGE) ? DefaultSearchParam.MAX_ITEMS_PER_PAGE : query.limit;
    const { where, orderBy } = this.getSearchFilters(query);

    // Запрос на получение результата поиска
    const [items, totalItemsCount] = await Promise.all([
      this.dbClient.trainingReview.findMany({
        where,

        include: {
          user: true
        },

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
      currentPage: query?.page ?? 0,
      totalPages: this.calculateItemsPage(totalItemsCount, take),
      totalItems: totalItemsCount,
      itemsPerPage: take ?? totalItemsCount,
    }
  }

  public async create(entity: TrainingReviewEntity): Promise<TrainingReviewEntity | null> {
    const review = await this.dbClient.trainingReview.create({
      data: entity
    });

    if (!review) {
      return null;
    }

    const reviewEntity = this.getEntity(review);

    return reviewEntity;
  }

  public async updateById(
    reviewId: string,
    fieldsToUpdate: Partial<TrainingReviewEntity>
  ): Promise<TrainingReviewEntity | null> {
    const updatedReview = await this.dbClient.trainingReview.update({
      where: { id: reviewId },
      data: { ...fieldsToUpdate }
    });

    if (!updatedReview) {
      return Promise.resolve(null);
    }

    const reviewEntity = this.getEntity(updatedReview);

    return reviewEntity;
  }

  public async deleteById(reviewId: string): Promise<void> {
    await this.dbClient.trainingReview.delete({
      where: { id: reviewId }
    });
  }

  public async checkAccess(reviewId: string, userId: string) {
    const review = await this.dbClient.trainingReview.findFirst({
      where: {
        id: reviewId,
        userId
      },
    });

    if (!review) {
      return false;
    }

    return true;
  }

  public async exists(reviewId: string): Promise<boolean> {
    const review = await this.dbClient.trainingReview.findFirst({
      where: { id: reviewId }
    });

    if (!review) {
      return false;
    }

    return true;
  }

  private getEntity(document): TrainingReviewEntity {
    return this.createEntityFromDocument(document as unknown as TrainingReviewInterface);
  }

  //////////////////// Вспомогательные методы поиска и пагинации ////////////////////
  private getSearchFilters(query: BaseSearchQuery & TrainingIdPayload): TrainingReviewsSearchFilters {
    const where: Prisma.TrainingReviewWhereInput = {};
    const orderBy: Prisma.TrainingReviewOrderByWithRelationInput = {};

    if (query?.trainingId) {
      where.trainingId = query.trainingId;
    }

    // Сортировка и направление сортировки
    const { key, value } = this.getSortKeyValue(query.sortType, query.sortDirection);

    orderBy[key] = value;

    return { where, orderBy };
  }

  private getSortKeyValue(sortType: SortType, sortDirection: SortDirection) {
    switch (sortType) {
      case (SortTypeEnum.CREATED_AT): {
        return { key: 'createdAt', value: sortDirection };
      }
      default: {
        return { key: DefaultSearchParam.SORT.TYPE, value: DefaultSearchParam.SORT.DIRECTION };
      }
    }
  }

  private async getItemsCount(where: Prisma.TrainingReviewWhereInput): Promise<number> {
    return this.dbClient.trainingReview.count({ where });
  }
}
