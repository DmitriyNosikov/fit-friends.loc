import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { BasePostgresRepository } from '../libs/data-access';

import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';
import { UserInterface } from './interfaces';

import { SortDirection, UserRoleEnum } from '@shared/types';
import { DefaultSearchParam } from '@shared/types/search/base-search-query.type';
import { PaginationResult } from '@server/libs/interfaces';
import { UserSearchFilters, UserSearchQuery } from '@shared/user';
import { UserSortType, UserSortTypeEnum } from '@shared/user/types/user-sort-type.enum';

@Injectable()
export class UserRepository extends BasePostgresRepository<UserEntity, UserInterface> {
  constructor(
    entityFactory: UserFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }

  public async findByEmail(userEmail: string): Promise<UserEntity | null> {
    const user = await this.dbClient.user.findFirst({
      where: { email: userEmail }
    });
    
    if(!user) {
      return null;
    }

    const userEntity = this.getEntity(user);

    return userEntity;
  }

  public async findById(userId: string): Promise<UserEntity | null> {
    const user = await this.dbClient.user.findFirst({
      where: { id: userId }
    });

    if(!user) {
      return null;
    }

    const userEntity = this.getEntity(user);

    return userEntity;
  }

  public async search(query?: UserSearchQuery): Promise<PaginationResult<UserEntity>> {
    const itemsPerPage =  query?.limit;
    const page = query?.page;
    const { where, orderBy } = this.getSearchFilters(query);

    // Запрос на получение результата поиска
    const  preparedQuery = {
      where,
      orderBy
    };

    const paginatedResult = await this.getPaginatedResult(preparedQuery, itemsPerPage, page);

    return paginatedResult;
  }

  public async create(entity: UserEntity): Promise<UserEntity | null> {
    const user = await this.dbClient.user.create({
      data: entity
    });

    if(!user) {
      return null;
    }

    const newUser = this.getEntity(user);

    return newUser;
  }

  public async updateById(
    userId: string,
    fieldsToUpdate: Partial<UserEntity>
  ): Promise<UserEntity | null> {
    const updatedUser = await this.dbClient.user.update({
      where: { id: userId },
      data: { ...fieldsToUpdate }
    });

    if(!updatedUser) {
      return Promise.resolve(null);
    }

    const userEntity = this.getEntity(updatedUser);

    return userEntity;
  }

  public async deleteById(userId: string): Promise<void> {
    await this.dbClient.user.delete({
      where: { id: userId }
    });
  }

  public async addFriendToUser(userId: string, friendId: string): Promise<UserEntity> {
    const updatedUser = await this.dbClient.user.update({
      where: { id: userId },
      data: {
        friends: {
          connect: { id: friendId }
        }
      }
    });

    /* т.к. запрос на дружбу принимается автоматически
    нам также нужно добавить друга в список друзей
    второго пользователя */
    await this.dbClient.user.update({
      where: { id: friendId },
      data: {
        friends: {
          connect: { id: userId }
        }
      }
    });

    const userEntity = this.getEntity(updatedUser);

    return userEntity;
  }

  public async removeFriendFromUser(userId: string, friendId: string): Promise<UserEntity> {
    const updatedUser = await this.dbClient.user.update({
      where: { id: userId },
      data: {
        friends: {
          disconnect: { id: friendId }
        }
      }
    });

    /* удаляем друга у второго пользователя */
    await this.dbClient.user.update({
      where: { id: friendId },
      data: {
        friends: {
          disconnect: { id: userId }
        }
      }
    });

    const userEntity = this.getEntity(updatedUser);

    return userEntity;
  }

  public async getUserRole(userId: string): Promise<string | null> {
    const { role } = await this.dbClient.user.findFirst({
      where: { id: userId },
      select: {
        role: true
      }
    });

    if(!role) {
      return null;
    }

    return role;
  }

  public async exists(userId: string): Promise<boolean> {
    const user = await this.dbClient.user.findFirst({
      where: { id: userId }
    });

    if(!user) {
      return false;
    }

    return true;
  }

  private getEntity(document): UserEntity {
    return this.createEntityFromDocument(document as unknown as UserInterface);
  }

  //////////////////// Вспомогательные методы поиска и пагинации ////////////////////
  public async getPaginatedResult(
    query: Prisma.UserFindManyArgs,
    itemsPerPage: number = DefaultSearchParam.MAX_ITEMS_PER_PAGE,
    page?: number
  ): Promise<PaginationResult<UserEntity>> {
    const skip = (page && itemsPerPage)
      ? (page - 1) * itemsPerPage
      : undefined;
    const take = (!itemsPerPage || itemsPerPage > DefaultSearchParam.MAX_ITEMS_PER_PAGE)
      ? DefaultSearchParam.MAX_ITEMS_PER_PAGE
      : itemsPerPage;

    // Запрос на получение результата поиска
    const [items, totalItemsCount] = await Promise.all([
      this.dbClient.user.findMany({
        ...query,

        // Pagination
        take,
        skip,
      }),
      this.getItemsCount(query.where)
    ]);

    const itemsEntities = items.map((item) => this.createEntityFromDocument(item as unknown as UserInterface));
    
    return {
      entities: itemsEntities,
      currentPage: page ?? 0,
      totalPages: this.calculateItemsPage(totalItemsCount, take),
      totalItems: totalItemsCount,
      itemsPerPage: take ?? totalItemsCount,
    }
  }

  private getSearchFilters(query: UserSearchQuery): UserSearchFilters {
    const where: Prisma.UserWhereInput = {};
    const orderBy: Prisma.UserOrderByWithRelationInput = {};

    if(query?.location && Array.isArray(query.location)) {
      where.location = {
        in: query.location
      }
    }

    // т.к. в бд TrainingType = массив, и в запросе query.trainingType - масси
    // надо проверить, что массив TrainingType содержит все значиния из query.trainingType
    // через hasEvery
    if(query?.trainingType && Array.isArray(query.trainingType)) {
      where.trainingType = {
        hasEvery: query.trainingType
      }
    }

    if(query?.level && Array.isArray(query.level)) {
      where.level = {
        in: query.level
      }
    }

    if(query?.role && Array.isArray(query.role)) {
      where.role = {
        in: query.role
      }
    } else {
      // Если не передана никакая роль, ищем по всем, кроме админов
      where.role = {
        not: UserRoleEnum.ADMIN
      }
    }

    if('isReadyToTraining' in query) {
      where.isReadyToTraining = query.isReadyToTraining;
    }

    // Сортировка и направление сортировки
    const { key, value } = this.getSortKeyValue(query.sortType, query.sortDirection);

    orderBy[key] = value;

    return { where, orderBy };
  }

  private getSortKeyValue(sortType: UserSortType, sortDirection: SortDirection) {
    switch (sortType) {
      case (UserSortTypeEnum.CREATED_AT): {
        return { key: 'createdAt', value: sortDirection };
      }
      case (UserSortTypeEnum.ROLE): {
        return { key: 'role', value: sortDirection };
      }
      default: {
        return { key: DefaultSearchParam.SORT.TYPE, value: DefaultSearchParam.SORT.DIRECTION };
      }
    }
  }

  private async getItemsCount(where: Prisma.UserWhereInput): Promise<number> {
    return this.dbClient.user.count({ where });
  }
}
