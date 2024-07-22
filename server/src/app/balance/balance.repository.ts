import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { BasePostgresRepository } from '@server/libs/data-access';

import { BalanceEntity } from './balance.entity';
import { BalanceInterface } from './interfaces/balance.interface';
import { BalanceFactory } from './balance.factory';

import { SortType, SortTypeEnum } from '@shared/types/sort/sort-type.enum';
import { SortDirection } from '@shared/types/sort/sort-direction.enum';
import { BaseSearchQuery, DefaultSearchParam } from '@shared/types/search/base-search-query.type';
import { PaginationResult } from '@server/libs/interfaces';
import { BalanceSearchFilters } from '@shared/balance';
import { UserIdPayload } from '@shared/types';

@Injectable()
export class BalanceRepository extends BasePostgresRepository<BalanceEntity, BalanceInterface> {
  constructor(
    entityFactory: BalanceFactory,
    readonly dbClient: PrismaClientService
  ) {
    super(entityFactory, dbClient);
  }


  public async findById(balanceId: string): Promise<BalanceEntity | null> {
    const balance = await this.dbClient.balance.findFirst({
      where: { id: balanceId }
    });

    if (!balance) {
      return null;
    }

    return this.getEntity(balance);
  }

  public async findUserBalanceByTrainingId(userId: string, trainingId: string): Promise<BalanceEntity | null> {
    const balance = await this.dbClient.balance.findFirst({
      where: { trainingId, userId }
    });

    if (!balance) {
      return null;
    }

    return this.getEntity(balance);
  }

  public async search(query?: BaseSearchQuery & UserIdPayload): Promise<PaginationResult<BalanceEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = (!query?.limit || query?.limit > DefaultSearchParam.MAX_ITEMS_PER_PAGE) ? DefaultSearchParam.MAX_ITEMS_PER_PAGE : query.limit;
    const { where, orderBy } = this.getSearchFilters(query);

    // Запрос на получение результата поиска
    const [items, totalItemsCount] = await Promise.all([
      this.dbClient.balance.findMany({
        where,

        // Pagination
        take,
        skip,
        orderBy
      }),
      this.getItemsCount(where)
    ]);

    const itemsEntities = items.map((item) => this.createEntityFromDocument(item as unknown as BalanceInterface));

    return {
      entities: itemsEntities,
      currentPage:  query?.page ?? 0,
      totalPages: this.calculateItemsPage(totalItemsCount, take),
      totalItems: totalItemsCount,
      itemsPerPage: take ?? totalItemsCount,
    }
  }

  public async create(entity: BalanceEntity): Promise<BalanceEntity | null> {
    const balance = await this.dbClient.balance.create({
      data: entity
    });

    if (!balance) {
      return null;
    }

    return this.getEntity(balance);
  }

  public async updateById(
    balanceId: string,
    fieldsToUpdate: Partial<BalanceEntity>
  ): Promise<BalanceEntity | null> {
    const updatedBalance = await this.dbClient.balance.update({
      where: { id: balanceId },
      data: { ...fieldsToUpdate }
    });

    if (!updatedBalance) {
      return Promise.resolve(null);
    }

    return this.getEntity(updatedBalance);
  }

  public async deleteById(balanceId: string): Promise<void> {
    await this.dbClient.balance.delete({
      where: { id: balanceId }
    });
  }

  public async getUserTrainingBalance(userId: string) {
    const documents = await this.dbClient.balance.findMany({
      where: {
        AND: [
          { userId },
          { remainingTrainingsCount: { gt: 0 } }
        ]
      }
    });

    const remainingTrainings = documents.map((training) => this.createEntityFromDocument(training as unknown as BalanceInterface));
    
    return remainingTrainings;
  }

  public async changeTrainingBalance(balanceId: string, balance: number) {
    // Обновляем баланс
    const updatedOrder = await this.dbClient.balance.update({
      where: { id: balanceId },
      data: { remainingTrainingsCount: balance }
    });

    const orderWithUpdatedBalance = this.createEntityFromDocument(updatedOrder as unknown as BalanceInterface);

    return orderWithUpdatedBalance;
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

  public async checkAccess(balanceId: string, userId: string) {
    const balance = await this.dbClient.balance.findFirst({
      where: {
        id: balanceId,
        userId
      },
    });

    if(!balance) {
      return false;
    }

    return true;
  }

  private getEntity(document): BalanceEntity {
    return this.createEntityFromDocument(document as unknown as BalanceInterface);
  }

  //////////////////// Вспомогательные методы поиска и пагинации ////////////////////
  private getSearchFilters(query: BaseSearchQuery & UserIdPayload): BalanceSearchFilters {
    const where: Prisma.BalanceWhereInput = {};
    const orderBy: Prisma.BalanceOrderByWithRelationInput = {};

    if(query?.userId) {
      where.userId = query.userId;
    }

    // Сортировка и направление сортировки
    const { key, value } = this.getSortKeyValue(query.sortType, query.sortDirection);

    orderBy[key] = value;

    return { where, orderBy };
  }

  private getSortKeyValue(sortType: SortType, sortDirection: SortDirection) {
    switch(sortType) {
      case(SortTypeEnum.CREATED_AT): {
        return { key: 'createdAt', value: sortDirection };
      }
      default: {
        return { key: DefaultSearchParam.SORT.TYPE, value: DefaultSearchParam.SORT.DIRECTION };
      }
    }
  }

  private async getItemsCount(where: Prisma.BalanceWhereInput): Promise<number> {
    return this.dbClient.balance.count({ where });
  }
}