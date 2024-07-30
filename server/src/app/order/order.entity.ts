import { Entity } from '@server/libs/entities';
import { StorableEntityInterface } from '@server/libs/interfaces';

import { UserInterface } from '@server/user/interfaces';
import { OrderInterface } from './interfaces/order.interface';
import { TrainingInterface } from '@server/training/interfaces/training.interface';

import { PaymentType } from '@shared/types/payment-type.enum';
import { OrderType } from '@server/libs/types';

type TrainingInfo = {
  training?: TrainingInterface
};
export class OrderEntity extends Entity implements StorableEntityInterface<OrderInterface> {
  public createdAt?: Date;
  public updatedAt?: Date;

  public type: OrderType;
  public trainingId: TrainingInterface['id'];
  public price: TrainingInterface['price'];
  public trainingsCount: number;
  public totalPrice: number;
  public paymentType: PaymentType;
  public userId: UserInterface['id'];

  public training?: TrainingInterface;

  constructor(order?: OrderInterface) {
    super();
    this.populate(order);
  }

  populate(order: OrderInterface & TrainingInfo) {
    if (!order) {
      return;
    }

    this.id = order.id;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;

    this.type = order.type;
    this.trainingId = order.trainingId;
    this.price = order.price;
    this.trainingsCount = order.trainingsCount;
    this.totalPrice = order.totalPrice;
    this.paymentType = order.paymentType;
    this.userId = order.userId;

    this.training = order.training;
  }

  toPOJO(): OrderInterface & TrainingInfo {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      type: this.type,
      trainingId: this.trainingId,
      price: this.price,
      trainingsCount: this.trainingsCount,
      totalPrice: this.totalPrice,
      paymentType: this.paymentType,
      userId: this.userId,

      training: this.training
    };
  }
}