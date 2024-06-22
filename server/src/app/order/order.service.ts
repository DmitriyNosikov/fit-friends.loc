import { Injectable, NotFoundException } from '@nestjs/common';

import { OrderRepository } from './order.repository';
import { OrderFactory } from './order.factory';

import { CreateOrderDTO, UpdateOrderDTO } from '@shared/order';
import { OrderMessage } from './order.constant';
import { OrderEntity } from './order.entity';
import { TrainingService } from '@server/training/training.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderFactory: OrderFactory,
    private readonly trainingService: TrainingService
  ) { }


  public async getOrderDetail(orderId: string): Promise<OrderEntity | null> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException(OrderMessage.ERROR.NOT_FOUND);
    }

    return order;
  }

  public async search(userId: string): Promise<OrderEntity[] | null> {
    const orders = await this.orderRepository.findByUserId(userId);

    if (!orders) {
      throw new NotFoundException(OrderMessage.ERROR.NOT_FOUND);
    }

    return orders;
  }

  public async create(dto: CreateOrderDTO) {
    const training = await this.trainingService.getTrainingDetail(dto.serviceId);
    const price = training.price;
    const totalPrice = price * dto.trainingsCount;
    const createOrderDTO = {
      ...dto,
      price,
      totalPrice
    };
    const orderEntity = this.orderFactory.create(createOrderDTO);
    const order = await this.orderRepository.create(orderEntity);

    return order;
  }

  
  public async updateById(orderId: string, fieldsToUpdate: UpdateOrderDTO) {
    const isOrderExists = await this.orderRepository.exists(orderId);

    if(!isOrderExists) {
      throw new NotFoundException(`${OrderMessage.ERROR.NOT_FOUND}. Passed ID: ${orderId}`);
    }

    const updatedOrder = await this.orderRepository.updateById(orderId, fieldsToUpdate);

    return updatedOrder;
  }

  public async deleteOrder(orderId: string): Promise<void> {
    const isOrderExists = await this.orderRepository.exists(orderId);

    if (!isOrderExists) {
      return;
    }

    return await this.orderRepository.deleteById(orderId);
  }
}