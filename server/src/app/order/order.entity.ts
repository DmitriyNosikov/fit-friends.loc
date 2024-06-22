import { Entity } from '@server/libs/entities';
import { StorableEntityInterface, UserInterface } from '@server/libs/interfaces';
import { OrderInterface } from './interfaces/order.interface';
import { OrderType } from '@server/libs/types';
import { TrainingInterface } from '@server/training/interfaces/training.interface';
import { PaymentType } from '@server/libs/types/payment-type.enum';

export const TRAINING_DEFAULT = {
  RATING: 0,
} as const;

export class OrderEntity extends Entity implements StorableEntityInterface<OrderInterface> {
  public createdAt?: Date;
  public updatedAt?: Date;

  public type: OrderType;
  public serviceId: TrainingInterface['id'];
  public price: TrainingInterface['price'];
  public trainingsCount: number;
  public remainingTrainingsCount: number;
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
    this.remainingTrainingsCount = order.remainingTrainingsCount;
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
      remainingTrainingsCount: this.remainingTrainingsCount,
      totalPrice: this.totalPrice,
      paymentType: this.paymentType,
      userId: this.userId,
    };
  }
}