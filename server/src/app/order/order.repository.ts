import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { BasePostgresRepository } from '@server/libs/data-access';

import { OrderEntity } from './order.entity';
import { OrderInterface } from './interfaces/order.interface';
import { OrderFactory } from './order.factory';

import { SortType, SortTypeEnum } from '@shared/types/sort/sort-type.enum';
import { SortDirectionEnum } from '@shared/types/sort/sort-direction.enum';
import { BaseSearchQuery, DefaultSearchParam } from '@shared/types/search/base-search-query.type';
import { PaginationResult } from '@server/libs/interfaces';
import { OrderSearchFilters } from '@shared/order';
import { UserIdPayload } from '@shared/types';

@Injectable()
export class OrderRepository extends BasePostgresRepository<OrderEntity, OrderInterface> {
  constructor(
    entityFactory: OrderFactory,
    readonly dbClient: PrismaClientService
  ) {
    super(entityFactory, dbClient);
  }


  public async findById(orderId: string): Promise<OrderEntity | null> {
    const order = await this.dbClient.order.findFirst({
      where: { id: orderId }
    });

    if (!order) {
      return null;
    }

    return this.getEntity(order);
  }

  public async findByUserId(userId: string): Promise<OrderEntity[] | null> {
    const orders = await this.dbClient.order.findMany({
      where: { userId }
    });

    if (!orders) {
      return null;
    }

    const result = orders.map((order) => this.getEntity(order));

    return result;
  }

  public async search(query?: BaseSearchQuery & UserIdPayload): Promise<PaginationResult<OrderEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = (!query?.limit || query?.limit > DefaultSearchParam.MAX_ITEMS_PER_PAGE) ? DefaultSearchParam.MAX_ITEMS_PER_PAGE : query.limit;
    const { where, orderBy } = this.getSearchFilters(query);

    // Запрос на получение результата поиска
    const [items, totalItemsCount] = await Promise.all([
      this.dbClient.order.findMany({
        where,

        // Pagination
        take,
        skip,
        orderBy
      }),
      this.getItemsCount(where)
    ]);

    const itemsEntities = items.map((item) => this.createEntityFromDocument(item as unknown as OrderInterface));

    return {
      entities: itemsEntities,
      currentPage:  query?.page ?? 0,
      totalPages: this.calculateItemsPage(totalItemsCount, take),
      totalItems: totalItemsCount,
      itemsPerPage: take ?? totalItemsCount,
    }
  }

  public async create(entity: OrderEntity): Promise<OrderEntity | null> {
    const order = await this.dbClient.order.create({
      data: entity
    });

    if (!order) {
      return null;
    }

    return this.getEntity(order);
  }

  public async updateById(
    orderId: string,
    fieldsToUpdate: Partial<OrderEntity>
  ): Promise<OrderEntity | null> {
    const updatedOrder = await this.dbClient.order.update({
      where: { id: orderId },
      data: { ...fieldsToUpdate }
    });

    if (!updatedOrder) {
      return Promise.resolve(null);
    }

    return this.getEntity(updatedOrder);
  }

  public async deleteById(orderId: string): Promise<void> {
    await this.dbClient.order.delete({
      where: { id: orderId }
    });
  }

  public async getUserTrainingBalance(userId: string) {
    const documents = await this.dbClient.order.findMany({
      where: {
        AND: [
          { userId },
          { remainingTrainingsCount: { gt: 0 } }
        ]
      }
    });

    const remainingTrainings = documents.map((training) => this.createEntityFromDocument(training as unknown as OrderInterface));
    
    return remainingTrainings;
  }

  public async changeTrainingBalance(orderId: string, balance: number) {
    const updatedOrder = await this.dbClient.order.update({
      where: { id: orderId },
      data: { remainingTrainingsCount: balance }
    });

    const orderWithUpdatedBalance = this.createEntityFromDocument(updatedOrder as unknown as OrderInterface);

    return this.createEntityFromDocument(orderWithUpdatedBalance);
  }

  public async exists(orderId: string): Promise<boolean> {
    const order = await this.dbClient.order.findFirst({
      where: { id: orderId }
    });

    if (!order) {
      return false;
    }

    return true;
  }

  public checkAccess(orderId: string, userId: string) {
    const order = this.dbClient.order.findFirst({
      where: {
        id: orderId,
        userId
      }
    });

    if(!order) {
      return false;
    }

    return true;
  }

  private getEntity(document): OrderEntity {
    return this.createEntityFromDocument(document as unknown as OrderInterface);
  }

  //////////////////// Вспомогательные методы поиска и пагинации ////////////////////
  private getSearchFilters(query: BaseSearchQuery & UserIdPayload): OrderSearchFilters {
    const where: Prisma.OrderWhereInput = {};
    const orderBy: Prisma.OrderOrderByWithRelationInput = {};

    if(query?.userId) {
      where.userId = query.userId;
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

  private async getItemsCount(where: Prisma.OrderWhereInput): Promise<number> {
    return this.dbClient.order.count({ where });
  }
}