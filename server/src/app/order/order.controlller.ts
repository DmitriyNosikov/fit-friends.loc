import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDTO, UpdateOrderDTO, CreateOrderRDO, OrdersWithPaginationRDO } from '@shared/order';

import { fillDTO } from '@server/libs/helpers';
import { JWTAuthGuard } from '@server/user/guards/jwt-auth.guard';

import { OrderService } from './order.service';
import { OrderMessage } from './order.constant';

import { BaseSearchQuery, DefaultSearchParam } from '@shared/types/search/base-search-query.type';
import { SortType } from '@shared/types/sort/sort-type.enum';
import { SortDirection } from '@shared/types/sort/sort-direction.enum';
import { InjectUserIdInterceptor } from '@server/libs/interceptors/inject-user-id.interceptor';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JWTAuthGuard)
@UseInterceptors(InjectUserIdInterceptor)
export class OrderController {
  constructor(
    private readonly orderService: OrderService
  ) { }

  @Post('')
  @ApiOperation({ summary: 'Add new order' })
  @ApiResponse({
    type: CreateOrderDTO,
    status: HttpStatus.CREATED,
    description: OrderMessage.SUCCESS.CREATED
  })
  public async create(@Body() dto: CreateOrderDTO) {
    const newOrder = await this.orderService.create(dto);

    return fillDTO(CreateOrderRDO, newOrder.toPOJO());
  }

  @Get('/')
  @ApiOperation({ summary: 'Get orders list by passed params (or without it)' })
  @ApiQuery({
    name: "createdAt",
    description: `Item's creation date`,
    example: "2024-05-29",
    required: false
  })
  @ApiQuery({
    name: "limit",
    description: `Items per page (pagination). Max limit: ${DefaultSearchParam.MAX_ITEMS_PER_PAGE}`,
    example: "50",
    required: false
  })
  @ApiQuery({
    name: "page",
    description: `Current page in pagination (if items count more than "limit"). Default page: ${DefaultSearchParam.PAGE}`,
    example: "1",
    required: false
  })
  @ApiQuery({
    name: "sortType",
    description: `Sorting type. Default sort type: ${DefaultSearchParam.SORT.TYPE}`,
    enum: SortType,
    example: "createdAt",
    required: false
  })
  @ApiQuery({
    name: "sortDirection",
    description: `Sorting direction. Default direction: ${DefaultSearchParam.SORT.DIRECTION}`,
    enum: SortDirection,
    example: " desc",
    required: false
  })
  public async index(
    @Body('userId') userId,
    @Query() query?: BaseSearchQuery
  ): Promise<OrdersWithPaginationRDO | null> {
    const preparedQuery = this.orderService.filterQuery(query);
    const documents = await this.orderService.search({
      ...preparedQuery,
      userId
    });

    if(!documents.entities || documents.entities.length <= 0) {
      return;
    }

    const orders = {
      ...documents,
      entities: documents.entities.map((document) => document.toPOJO())
    }

    return orders;
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'Get detail info about order' })
  @ApiResponse({
    type: CreateOrderRDO,
    status: HttpStatus.OK,
    description: OrderMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: OrderMessage.ERROR.NOT_FOUND
  })
  public async show(
    @Param('orderId') orderId: string,
    @Body('userId') userId: string
  ): Promise<CreateOrderRDO> {
    const orderDetail = await this.orderService.getOrderDetail(orderId, userId);

    return fillDTO(CreateOrderRDO, orderDetail.toPOJO());
  }

  @Patch(':orderId')
  @ApiOperation({ summary: 'Update order info' })
  @ApiResponse({
    type: CreateOrderRDO,
    status: HttpStatus.CREATED,
    description: OrderMessage.SUCCESS.UPDATED
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: OrderMessage.ERROR.CANT_UPDATE
  })
  public async updateTraining(
    @Param('orderId') orderId: string,
    @Body() dto: UpdateOrderDTO
  ): Promise<CreateOrderRDO | null> {
    const updatedOrder = await this.orderService.updateById(orderId, dto);

    return fillDTO(CreateOrderRDO, updatedOrder.toPOJO());
  }

  
  @Delete(':orderId')
  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: OrderMessage.SUCCESS.DELETED
  })
  public async deleteOrder(
    @Param('orderId') orderId: string,
    @Body('userId') userId: string,
  ): Promise<void> {
    await this.orderService.deleteOrder(orderId, userId);
  }
}