import { Injectable } from '@nestjs/common';

import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { BasePostgresRepository } from '@server/libs/data-access';

import { OrderEntity } from './order.entity';
import { OrderInterface } from './interfaces/order.interface';
import { OrderFactory } from './order.factory';

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

  public async exists(orderId: string): Promise<boolean> {
    const order = await this.dbClient.order.findFirst({
      where: { id: orderId }
    });

    if (!order) {
      return false;
    }

    return true;
  }

  private getEntity(document): OrderEntity {
    return this.createEntityFromDocument(document as unknown as OrderInterface);
  }
}