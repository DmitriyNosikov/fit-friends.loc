import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JWTAuthGuard } from '@server/user/guards/jwt-auth.guard';
import { InjectUserIdInterceptor } from '@server/libs/interceptors/inject-user-id.interceptor';

import { fillDTO } from '@server/libs/helpers';
import { BalancesWithPaginationRDO, ChangeBalanceDTO, CreateBalanceDTO, CreateBalanceRDO, UpdateBalanceDTO } from '@shared/balance';

import { BalanceService } from './balance.service';
import { BalanceMessage } from './balance.constant';

import { BaseSearchQuery, DefaultSearchParam } from '@shared/types/search/base-search-query.type';
import { SortDirectionEnum, SortTypeEnum } from '@shared/types';

@ApiTags('balance')
@Controller('balance')
@UseGuards(JWTAuthGuard)
@UseInterceptors(InjectUserIdInterceptor)
export class BalanceController {
  constructor(
    private readonly balanceService: BalanceService
  ) { }

  @Post('')
  @ApiOperation({ summary: 'Add new balance' })
  @ApiResponse({
    type: CreateBalanceRDO,
    status: HttpStatus.CREATED,
    description: BalanceMessage.SUCCESS.CREATED
  })
  public async create(@Body() dto: CreateBalanceDTO) {
    const balance = await this.balanceService.create(dto);

    return fillDTO(CreateBalanceRDO, balance.toPOJO());
  }

  @Get('')
  @ApiOperation({ summary: 'Get user`s training balance' })
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
    enum: SortTypeEnum,
    example: "createdAt",
    required: false
  })
  @ApiQuery({
    name: "sortDirection",
    description: `Sorting direction. Default direction: ${DefaultSearchParam.SORT.DIRECTION}`,
    enum: SortDirectionEnum,
    example: " desc",
    required: false
  })
  @ApiResponse({
    type: BalancesWithPaginationRDO,
    status: HttpStatus.OK,
    description: BalanceMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BalanceMessage.ERROR.NOT_FOUND
  })
  public async index(
    @Query() query: BaseSearchQuery,
    @Body('userId') userId: string
  ): Promise<BalancesWithPaginationRDO> {
    const searchQuery = {
      ...query,
      userId
    };
    const trainingBalance = await this.balanceService.search(searchQuery);

    const result = {
      ...trainingBalance,
      entities:  trainingBalance.entities.map((training) => fillDTO(CreateBalanceRDO, training.toPOJO()))
    };

    return result;
  }

  @Get('by-training/:trainingId')
  @ApiOperation({ summary: 'Get user`s balance by training id' })
  @ApiResponse({
    type: CreateBalanceDTO,
    status: HttpStatus.CREATED,
    description: BalanceMessage.SUCCESS.CREATED
  })
  public async getUserBalance(
    @Param('trainingId') trainingId: string,
    @Body('userId') userId: string
  ) {
    const balance = await this.balanceService.getUserBalanceByTrainingId(userId, trainingId);

    return fillDTO(CreateBalanceRDO, balance.toPOJO());
  }

  @Get('/count')
  @ApiOperation({ summary: 'Get summary user`s balance' })
  @ApiResponse({
    type: Number,
    status: HttpStatus.OK,
    description: BalanceMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BalanceMessage.ERROR.NOT_FOUND
  })
  public async countBalance(@Body('userId') userId: string): Promise<number> {
    const trainingBalance = await this.balanceService.countAllAvailableTrainings(userId);

    return trainingBalance;
  }

  @Patch('/increase')
  @ApiOperation({ summary: 'Increase training balance by passed amount' })
  @ApiResponse({
    type: CreateBalanceRDO,
    status: HttpStatus.OK,
    description: BalanceMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BalanceMessage.ERROR.NOT_FOUND
  })
  public async increaseBalance( @Body() dto: ChangeBalanceDTO ): Promise<CreateBalanceRDO> {
    const { trainingId, userId, amount } = dto;
    const newBalance = await this.balanceService.increaseTrainingBalance(trainingId, userId, amount);

    return fillDTO(CreateBalanceRDO, newBalance.toPOJO());
  }

  @Patch('/decrease')
  @ApiOperation({ summary: 'Decrease training balance by passed amount' })
  @ApiResponse({
    type: CreateBalanceRDO,
    status: HttpStatus.OK,
    description: BalanceMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BalanceMessage.ERROR.NOT_FOUND
  })
  public async decreaseBalance( @Body() dto: ChangeBalanceDTO ): Promise<CreateBalanceRDO> {
    const { trainingId, userId, amount } = dto;
    const newBalance = await this.balanceService.decreaseTrainingBalance(trainingId, userId, amount);

    return fillDTO(CreateBalanceRDO, newBalance.toPOJO());
  }

  @Patch(':balanceId')
  @ApiOperation({ summary: 'Update balance info' })
  @ApiResponse({
    type: CreateBalanceRDO,
    status: HttpStatus.CREATED,
    description: BalanceMessage.SUCCESS.UPDATED
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BalanceMessage.ERROR.CANT_UPDATE
  })
  public async update(
    @Param('balanceId') balanceId: string,
    @Body() dto: UpdateBalanceDTO
  ): Promise<CreateBalanceRDO | null> {
    const updatedBalance = await this.balanceService.updateById(balanceId, dto);

    return fillDTO(CreateBalanceRDO, updatedBalance.toPOJO());
  }

  @Delete(':balanceId')
  @ApiOperation({ summary: 'Delete balance' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: BalanceMessage.SUCCESS.DELETED
  })
  public async deleteOrder(
    @Param('balanceId') balanceId: string,
    @Body('userId') userId: string,
  ): Promise<void> {
    await this.balanceService.deleteBalance(balanceId, userId);
  }
}