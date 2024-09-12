import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../prisma-client/prisma-client.service';

import { BasePostgresRepository } from '@server/libs/data-access';
import { TrainingRequestInterface } from './interfaces/training-request.interface';
import { TrainingRequestEntity } from './training-request.entity';
import { TrainingRequestFactory } from './training-request.factory';
import { BaseSearchQuery, SortDirection, SortType, SortTypeEnum } from '@shared/types';
import { PaginationResult } from '@server/libs/interfaces';
import { DefaultSearchParam } from '@shared/types/search/base-search-query.type';
import { TrainingRequestSearchFilters } from '@shared/training-request';
import { Prisma } from '@prisma/client';

export type UserAndTrainerIdsPayload = {
  userId?: string,
  trainerId?: string
};

@Injectable()
export class TrainingRequestRepository extends BasePostgresRepository<TrainingRequestEntity, TrainingRequestInterface> {
  constructor(
    entityFactory: TrainingRequestFactory,
    readonly dbClient: PrismaClientService
  ) {
    super(entityFactory, dbClient);
  }
  public async create(entity: TrainingRequestEntity): Promise<TrainingRequestEntity | null> {
    const trainingRequest = await this.dbClient.trainingRequest.create({
      data: entity
    });

    if (!trainingRequest) {
      return null;
    }

    return this.getEntity(trainingRequest);
  }

  public async updateById(
    requestId: string,
    fieldsToUpdate: Partial<TrainingRequestEntity>
  ): Promise<TrainingRequestEntity | null> {
    const updatedRequest = await this.dbClient.trainingRequest.update({
      where: { id: requestId },
      data: { ...fieldsToUpdate }
    });

    if (!updatedRequest) {
      return Promise.resolve(null);
    }

    return this.getEntity(updatedRequest);
  }

  public async deleteById(requestId: string): Promise<void> {
    await this.dbClient.trainingRequest.delete({
      where: { id: requestId }
    });
  }

  // TODO: Унифицировать метод поиска
  public async search(query?: BaseSearchQuery & UserAndTrainerIdsPayload): Promise<PaginationResult<TrainingRequestEntity>> {
    const itemsPerPage =  query?.limit;
    const page = query?.page;
    const { where, orderBy } = this.getSearchFilters(query);

    // Запрос на получение результата поиска
    const  preparedQuery = {
      where,
      orderBy,

      include: {
        initiator: true,
        trainer: true
      }
    };

    const paginatedResult = await this.getPaginatedResult(preparedQuery, itemsPerPage, page);

    return paginatedResult;
  }

  public async findById(requestId: string): Promise<TrainingRequestEntity | null> {
    const trainingRequest = await this.dbClient.trainingRequest.findFirst({
      where: { id: requestId }
    });

    if (!trainingRequest) {
      return null;
    }

    return this.getEntity(trainingRequest);
  }

  public async findByUserAndTrainerId(userId: string, trainerId: string): Promise<TrainingRequestEntity | null> {
    const trainingRequest = await this.dbClient.trainingRequest.findFirst({
      where: { initiatorId: userId, trainerId: trainerId }
    })

    if (!trainingRequest) {
      return null;
    }

    return this.getEntity(trainingRequest);
  }

  public async findTrainersRequests(trainerId: string): Promise<TrainingRequestEntity[] | null> {
    const trainingRequests = await this.dbClient.trainingRequest.findMany({
      where: { trainerId }
    })

    if (!trainingRequests) {
      return null;
    }

    const requestEntities = trainingRequests.map((request) => this.getEntity(request));

    return requestEntities;
  }

  // Серивсные методы
  public async checkAccess(requestId: string, userId: string) {
    const request = await this.dbClient.trainingRequest.findFirst({
      where: { id: requestId, initiatorId: userId },
    });

    if (!request) {
      return false;
    }

    return true;
  }

  private getEntity(document): TrainingRequestEntity {
    return this.createEntityFromDocument(document as unknown as TrainingRequestInterface);
  }

  //////////////////// Вспомогательные методы поиска и пагинации ////////////////////
  public async getPaginatedResult(
    query: Prisma.TrainingRequestFindManyArgs,
    itemsPerPage: number = DefaultSearchParam.MAX_ITEMS_PER_PAGE,
    page?: number
  ): Promise<PaginationResult<TrainingRequestEntity>> {
    const skip = (page && itemsPerPage)
      ? (page - 1) * itemsPerPage
      : undefined;
    const take = (!itemsPerPage || itemsPerPage > DefaultSearchParam.MAX_ITEMS_PER_PAGE)
      ? DefaultSearchParam.MAX_ITEMS_PER_PAGE
      : itemsPerPage;

    // Запрос на получение результата поиска
    const [items, totalItemsCount] = await Promise.all([
      this.dbClient.trainingRequest.findMany({
        ...query,

        // Pagination
        take,
        skip,
      }),
      this.getItemsCount(query.where)
    ]);

    const itemsEntities = items.map((item) => this.createEntityFromDocument(item as unknown as TrainingRequestInterface));

    return {
      entities: itemsEntities,
      currentPage: page ?? 0,
      totalPages: this.calculateItemsPage(totalItemsCount, take),
      totalItems: totalItemsCount,
      itemsPerPage: take ?? totalItemsCount,
    }
  }

  private getSearchFilters(query: BaseSearchQuery & UserAndTrainerIdsPayload): TrainingRequestSearchFilters {
    const where: Prisma.TrainingRequestWhereInput = {};
    const orderBy: Prisma.TrainingRequestOrderByWithRelationInput = {};

    if (query?.userId) {
      where.initiatorId = query.userId;
    }

    if (query?.trainerId) {
      where.trainerId = query.trainerId;
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

  private async getItemsCount(where: Prisma.TrainingRequestWhereInput): Promise<number> {
    return this.dbClient.trainingRequest.count({ where });
  }
}