import { Injectable } from '@nestjs/common';
import { EntityFactoryInterface } from '../libs/interfaces';
import { OrderEntity } from './order.entity';
import { OrderInterface } from './interfaces/order.interface';

@Injectable()
export class OrderFactory implements EntityFactoryInterface<OrderEntity> {
  public create(entityPlainData: OrderInterface): OrderEntity {
    return new OrderEntity(entityPlainData);
  }
}
