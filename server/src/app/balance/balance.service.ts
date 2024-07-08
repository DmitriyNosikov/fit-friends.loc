import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { fillDTO, omitUndefined } from '@server/libs/helpers';

import { BalanceEntity } from './balance.entity';
import { BalanceFactory } from './balance.factory';
import { BalanceRepository } from './balance.repository';
import { BalanceMessage } from './balance.constant';

import { BaseSearchQuery, UserIdPayload } from '@shared/types';
import { CreateBalanceDTO, UpdateBalanceDTO } from '@shared/balance';

@Injectable()
export class BalanceService {
  constructor(
    private readonly balanceRepository: BalanceRepository,
    private readonly balanceFactory: BalanceFactory,
  ) { }


  public async getBalanceDetail(balanceId: string, userId: string): Promise<BalanceEntity | null> {
    await this.checkAccess(balanceId, userId);

    const balance = await this.balanceRepository.findById(balanceId);

    if (!balance) {
      throw new NotFoundException(BalanceMessage.ERROR.NOT_FOUND);
    }

    return balance;
  }

  public async getUserBalanceByServiceId(serviceId: string, userId: string): Promise<BalanceEntity | null> {
    const balance = await this.balanceRepository.findByServiceId(serviceId, userId);

    if (!balance) {
      throw new NotFoundException(BalanceMessage.ERROR.NOT_FOUND);
    }

    return balance;
  }

  public async getUserTrainingBalance(userId: string) {
    const balances = await this.balanceRepository.getUserTrainingBalance(userId);

    if (!balances) {
      throw new NotFoundException(BalanceMessage.ERROR.NOT_FOUND);
    }

    return balances;
  }

  public async search(query?: BaseSearchQuery & UserIdPayload) {
    const balances = await this.balanceRepository.search(query);

    if (!balances && query) {
      throw new NotFoundException(`Can't find products by passed params " ${query}"`);
    }

    return balances;
  }

  public async create(dto: CreateBalanceDTO) {
    const balanceEntity = this.balanceFactory.create(dto);
    const balance = await this.balanceRepository.create(balanceEntity);

    return balance;
  }

  public async updateById(balanceId: string, fieldsToUpdate: UpdateBalanceDTO) {
    const { userId } = fieldsToUpdate;

    await this.checkAccess(balanceId, userId);

    fieldsToUpdate.userId = undefined;

    const updatedOrder = await this.balanceRepository.updateById(balanceId, fieldsToUpdate);

    return updatedOrder;
  }

  public async deleteBalance(balanceId: string, userId: string): Promise<void> {
    await this.checkAccess(balanceId, userId);

    return await this.balanceRepository.deleteById(balanceId);
  }

  public async decreaseTrainingBalance(
    balanceId: string,
    userId: string,
    amount: number
  ) {
    const updatedBalance = await this.changeTrainingBalance(balanceId, userId, amount, false);

    return updatedBalance;
  }

  public async increaseTrainingBalance(
    balanceId: string,
    userId: string,
    amount: number) {
    const updatedBalance = await this.changeTrainingBalance(balanceId, userId, amount, true);

    return updatedBalance;
  }

  public async changeTrainingBalance(
    balanceId: string,
    userId: string,
    amount: number, // На сколько изменять баланс
    increase: boolean = false // Увеличивать баланс (true) / Уменьшать баланс (false)
  ): Promise<BalanceEntity> {
    const balance = await this.getBalanceDetail(balanceId, userId);
    let newBalance = 0;

    if (increase) {
      newBalance = balance.remainingTrainingsCount + amount;
    } else {
      newBalance = balance.remainingTrainingsCount - amount;
    }

    if (newBalance < 0) {
      newBalance = 0;
    }

    const updatedBalance = await this.balanceRepository.changeTrainingBalance(balanceId, newBalance);

    return updatedBalance;
  }

  public async countAvailableTrainings(userId: string) {
    const userTrainings = await this.balanceRepository.getUserTrainingBalance(userId);

    if(!userTrainings) {
      throw new NotFoundException(BalanceMessage.ERROR.EMPTY_BALANCE);
    }

    const count = userTrainings.reduce((accumulator, training) => {
      return accumulator += training.remainingTrainingsCount;
    }, 0);

    return count;
  }

  // Вспомогательные методы
  public filterQuery(query: BaseSearchQuery) {
    const filteredQuery = fillDTO(BaseSearchQuery, query);
    const omitedQuery = omitUndefined(filteredQuery as Record<string, unknown>);

    return omitedQuery;
  }

  private async checkAccess(balanceId: string, userId: string): Promise<boolean | void> {
    const isUserHaveAccessToBalance = await this.balanceRepository.checkAccess(balanceId, userId);

    if (!isUserHaveAccessToBalance) {
      throw new UnauthorizedException(`${BalanceMessage.ERROR.HAVENT_ACCESS}. Balance id: ${balanceId}`);
    }

    return true;
  }
}