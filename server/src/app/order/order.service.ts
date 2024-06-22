import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { fillDTO, omitUndefined } from '@server/libs/helpers';

import { OrderRepository } from './order.repository';
import { OrderFactory } from './order.factory';

import { CreateOrderDTO, UpdateOrderDTO } from '@shared/order';
import { OrderMessage } from './order.constant';
import { OrderEntity } from './order.entity';
import { TrainingService } from '@server/training/training.service';
import { BaseSearchQuery, UserIdPayload } from '@shared/types';
import { BalanceService } from '../balance/balance.service';
import { CreateBalanceDTO } from '@shared/balance';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderFactory: OrderFactory,
    private readonly trainingService: TrainingService,
    private readonly balanceService: BalanceService,
  ) { }


  public async getOrderDetail(orderId: string, userId: string): Promise<OrderEntity | null> {
    await this.checkAccess(orderId, userId);
    
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException(OrderMessage.ERROR.NOT_FOUND);
    }

    return order;
  }

  public async search(query?: BaseSearchQuery & UserIdPayload) {
    const orders = await this.orderRepository.search(query);

    if(!orders && query) {
      throw new NotFoundException(`Can't find products by passed params " ${query}"`);
    }

    return orders;
  }

  public async create(dto: CreateOrderDTO) {
    const { price, totalPrice } = await this.countPricesByTraining(dto.serviceId, dto.trainingsCount);
    const createOrderDTO = {
      ...dto,
      price,
      totalPrice
    };
    const orderEntity = this.orderFactory.create(createOrderDTO);

    const order = await this.orderRepository.create(orderEntity);

    const balanceData: CreateBalanceDTO = {
      orderId: order.id,
      remainingTrainingsCount: order.trainingsCount
    };
    await this.balanceService.create(balanceData)

    return order;
  }

  
  public async updateById(orderId: string, fieldsToUpdate: UpdateOrderDTO) {
    const { userId } = fieldsToUpdate;

    await this.checkAccess(orderId, userId);
    
    const order = await this.getOrderDetail(orderId, userId);
    const trainingsCount = fieldsToUpdate.trainingsCount ?? order.trainingsCount;

    let price = order.price;
    let totalPrice = order.totalPrice;

    if(fieldsToUpdate.serviceId) {
      const { price: newPrice, totalPrice: newTotalPrice } = await this.countPricesByTraining(fieldsToUpdate.serviceId, trainingsCount);
      price = newPrice;
      totalPrice = newTotalPrice;
    }

    if(fieldsToUpdate.price) {
      price = fieldsToUpdate.price;
      totalPrice = fieldsToUpdate.price * trainingsCount;
    }

    if(fieldsToUpdate.trainingsCount) {
      totalPrice = price * fieldsToUpdate.trainingsCount;
    }

    const updateFieldsDTO = {
      ...fieldsToUpdate,
      price,
      totalPrice
    };

    const updatedOrder = await this.orderRepository.updateById(orderId, updateFieldsDTO);

    return updatedOrder;
  }

  public async deleteOrder(orderId: string, userId: string): Promise<void> {
    await this.checkAccess(orderId, userId);

    return await this.orderRepository.deleteById(orderId);
  }

  //////////////////// Вспомогательные методы ////////////////////
  public filterQuery(query: BaseSearchQuery) {
    const filteredQuery = fillDTO(BaseSearchQuery, query);
    const omitedQuery = omitUndefined(filteredQuery as Record<string, unknown>);

    return omitedQuery;
  }

  private async countPricesByTraining(serviceId: string, trainingsCount: number) {
    const training = await this.trainingService.getTrainingDetail(serviceId);
    const price = training.price;
    const totalPrice = price * trainingsCount;

    return { price, totalPrice };
  }

  private async checkAccess(orderId: string, userId: string): Promise<boolean | void> {
    const isUserHaveAccessToOrder = await this.orderRepository.checkAccess(orderId, userId);

    if(!isUserHaveAccessToOrder) {
      throw new UnauthorizedException(`${OrderMessage.ERROR.HAVENT_ACCESS}. Order id: ${orderId}`);
    }

    return true;
  }
}