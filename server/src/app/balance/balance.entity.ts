import { Entity } from '@server/libs/entities';
import { StorableEntityInterface } from '@server/libs/interfaces';
import { BalanceInterface } from './interfaces/balance.interface';
import { OrderInterface } from '@server/order/interfaces/order.interface';

export const TRAINING_DEFAULT = {
  RATING: 0,
} as const;

export class BalanceEntity extends Entity implements StorableEntityInterface<BalanceInterface> {
  public createdAt?: Date;
  public updatedAt?: Date;

  public orderId: OrderInterface['id'];
  public remainingTrainingsCount: number;

  constructor(balance?: BalanceInterface) {
    super();
    this.populate(balance);
  }

  populate(balance: BalanceInterface) {
    if (!balance) {
      return;
    }

    this.id = balance.id;
    this.createdAt = balance.createdAt;
    this.updatedAt = balance.updatedAt;

    this.orderId = balance.orderId;
    this.remainingTrainingsCount = balance.remainingTrainingsCount;
  }

  toPOJO(): BalanceInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      orderId: this.orderId,
      remainingTrainingsCount: this.remainingTrainingsCount,
    };
  }
}