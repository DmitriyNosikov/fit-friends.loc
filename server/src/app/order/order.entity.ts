import { Entity } from '@server/libs/entities';
import { StorableEntityInterface } from '@server/libs/interfaces';

import { UserInterface } from '@server/user/interfaces';
import { OrderInterface } from './interfaces/order.interface';
import { TrainingInterface } from '@server/training/interfaces/training.interface';

import { PaymentType } from '@shared/types/payment-type.enum';
import { OrderType } from '@server/libs/types';

export class OrderEntity extends Entity implements StorableEntityInterface<OrderInterface> {
  public createdAt?: Date;
  public updatedAt?: Date;

  public type: OrderType;
  public serviceId: string;
  public price: TrainingInterface['price'];
  public trainingsCount: number;
  public totalPrice: number;
  public paymentType: PaymentType;
  public userId: UserInterface['id'];

  constructor(order?: OrderInterface) {
    super();
    this.populate(order);
  }

  populate(order: OrderInterface) {
    if (!order) {
      return;
    }

    this.id = order.id;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;

    this.type = order.type;
    this.serviceId = order.serviceId;
    this.price = order.price;
    this.trainingsCount = order.trainingsCount;
    this.totalPrice = order.totalPrice;
    this.paymentType = order.paymentType;
    this.userId = order.userId;
  }

  toPOJO(): OrderInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      type: this.type,
      serviceId: this.serviceId,
      price: this.price,
      trainingsCount: this.trainingsCount,
      totalPrice: this.totalPrice,
      paymentType: this.paymentType,
      userId: this.userId,
    };
  }
}