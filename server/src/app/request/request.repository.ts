import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientService } from '../prisma-client/prisma-client.service';

import { BaseSearchQuery, SortDirection, SortType, SortTypeEnum } from '@shared/types';
import { DefaultSearchParam } from '@shared/types/search/base-search-query.type';
import { PaginationResult } from '@server/libs/interfaces';
import { RequestSearchFilters, UserAndTargetUserIdsPayload } from '@shared/request';

import { BasePostgresRepository } from '@server/libs/data-access';
import { RequestInterface } from './interfaces/request.interface';
import { RequestEntity } from './request.entity';
import { RequestFactory } from './request.factory';
import { RequestType } from '@server/libs/types';

@Injectable()
export class RequestRepository extends BasePostgresRepository<RequestEntity, RequestInterface> {
  constructor(
    entityFactory: RequestFactory,
    readonly dbClient: PrismaClientService
  ) {
    super(entityFactory, dbClient);
  }
  public async create(entity: RequestEntity): Promise<RequestEntity | null> {
    const request = await this.dbClient.request.create({
      data: entity
    });

    if (!request) {
      return null;
    }

    return this.getEntity(request);
  }

  public async updateById(
    requestId: string,
    fieldsToUpdate: Partial<RequestEntity>
  ): Promise<RequestEntity | null> {
    const updatedRequest = await this.dbClient.request.update({
      where: { id: requestId },
      data: { ...fieldsToUpdate }
    });

    if (!updatedRequest) {
      return Promise.resolve(null);
    }

    return this.getEntity(updatedRequest);
  }

  public async deleteById(requestId: string): Promise<void> {
    await this.dbClient.request.delete({
      where: { id: requestId }
    });
  }

  public async deleteAllUserRequests(initiatorUserId: string, targetUserId: string) {
    const relatedUserRequests = await this.dbClient.request.findMany({
      where: {
        OR: [
          { initiatorUserId, targetUserId },
          { initiatorUserId: targetUserId, targetUserId: initiatorUserId }
        ]
      },

      select: { id: true }
    })

    if(!relatedUserRequests || relatedUserRequests.length <= 0) {
      return;
    }

    const deleteIds = relatedUserRequests.map((request) => request.id);

    await this.dbClient.request.deleteMany({
      where: {
        id: { in: deleteIds }
      }
    });
  }

  // TODO: Унифицировать метод поиска
  public async search(query?: BaseSearchQuery & UserAndTargetUserIdsPayload): Promise<PaginationResult<RequestEntity>> {
    const itemsPerPage = query?.limit;
    const page = query?.page;
    const { where, orderBy } = this.getSearchFilters(query);

    // Запрос на получение результата поиска
    const preparedQuery = {
      where,
      orderBy,

      include: {
        initiatorUser: true,
        targetUser: true
      }
    };

    const paginatedResult = await this.getPaginatedResult(preparedQuery, itemsPerPage, page);

    return paginatedResult;
  }

  // TODO: Унифицировать метод поиска
  public async getAllUserRequests(userId: string, requestType?: RequestType): Promise<RequestEntity[]> {
    const where: Prisma.RequestWhereInput = {};

    // Все запросы пользователя, где он либо инициатор
    // либо цель запроса
    where.OR = [
      { initiatorUserId: userId },
      { targetUserId: userId }
    ]

    if (requestType) {
      where.requestType = requestType;
    }

    // Запрос на получение результата поиска
    const preparedQuery = {
      where,

      include: {
        initiatorUser: true,
        targetUser: true
      }
    };

    const requests = await this.dbClient.request.findMany(preparedQuery)
    const requestEntities = requests.map((request) => this.createEntityFromDocument(request as unknown as RequestInterface));

    return requestEntities;
  }

  public async findById(requestId: string): Promise<RequestEntity | null> {
    const request = await this.dbClient.request.findFirst({
      where: { id: requestId }
    });

    if (!request) {
      return null;
    }

    return this.getEntity(request);
  }

  public async findByInitiatorAndTargetUserId(
    initiatorUserId: string,
    targetUserId: string,
    requestType?: string
  ): Promise<RequestEntity | null> {
    const request = await this.dbClient.request.findFirst({
      where: {
        initiatorUserId,
        targetUserId,
        requestType
      }
    })

    if (!request) {
      return null;
    }

    return this.getEntity(request);
  }

  public async findTargetRequests(targetUserId: string): Promise<RequestEntity[] | null> {
    const requests = await this.dbClient.request.findMany({
      where: { targetUserId }
    })

    if (!requests) {
      return null;
    }

    const requestEntities = requests.map((request) => this.getEntity(request));

    return requestEntities;
  }

  // Сервисные методы
  public async checkAccess(requestId: string, userId: string) {
    const request = await this.dbClient.request.findFirst({
      where: { id: requestId, initiatorUserId: userId },
    });

    if (!request) {
      return false;
    }

    return true;
  }

  private getEntity(document): RequestEntity {
    return this.createEntityFromDocument(document as unknown as RequestInterface);
  }

  //////////////////// Вспомогательные методы поиска и пагинации ////////////////////
  public async getPaginatedResult(
    query: Prisma.RequestFindManyArgs,
    itemsPerPage: number = DefaultSearchParam.MAX_ITEMS_PER_PAGE,
    page?: number
  ): Promise<PaginationResult<RequestEntity>> {
    const skip = (page && itemsPerPage)
      ? (page - 1) * itemsPerPage
      : undefined;
    const take = (!itemsPerPage || itemsPerPage > DefaultSearchParam.MAX_ITEMS_PER_PAGE)
      ? DefaultSearchParam.MAX_ITEMS_PER_PAGE
      : itemsPerPage;

    // Запрос на получение результата поиска
    const searchQuery = {
      ...query,

      // Pagination
      take,
      skip,
    };

    const [items, totalItemsCount] = await Promise.all([
      this.dbClient.request.findMany(searchQuery),
      this.getItemsCount(query.where)
    ]);

    const itemsEntities = items.map((item) => this.createEntityFromDocument(item as unknown as RequestInterface));

    return {
      entities: itemsEntities,
      currentPage: page ?? 0,
      totalPages: this.calculateItemsPage(totalItemsCount, take),
      totalItems: totalItemsCount,
      itemsPerPage: take ?? totalItemsCount,
    }
  }

  private getSearchFilters(query: BaseSearchQuery & UserAndTargetUserIdsPayload): RequestSearchFilters {
    const where: Prisma.RequestWhereInput = {};
    const orderBy: Prisma.RequestOrderByWithRelationInput = {};

    if (query?.userId || query?.initiatorUserId) {
      where.initiatorUserId = query.userId ?? query?.initiatorUserId;
    }

    if (query?.targetUserId) {
      where.targetUserId = query.targetUserId;
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

  private async getItemsCount(where: Prisma.RequestWhereInput): Promise<number> {
    return this.dbClient.request.count({ where });
  }
}