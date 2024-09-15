import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { JWTAuthGuard } from '@server/user/guards/jwt-auth.guard';
import { InjectUserIdInterceptor } from '@server/libs/interceptors/inject-user-id.interceptor';

import { RequestService } from './request.service';

import { SortDirectionEnum, SortTypeEnum, UserIdPayload } from '@shared/types';
import { RequestMessage } from './request.constant';
import { BaseSearchQuery, DefaultSearchParam } from '@shared/types/search/base-search-query.type';

import { CreateRequestDTO, CreateRequestRDO, RequestsWithPaginationRDO, UpdateRequestDTO, UserAndTargetUserIdsPayload } from '@shared/request';
import { fillDTO } from '@server/libs/helpers';

@ApiTags('requests')
@Controller('requests')
@UseGuards(JWTAuthGuard)
@UseInterceptors(InjectUserIdInterceptor)
export class RequestController {
  constructor(
    private readonly requestService: RequestService
  ) { }
  @Post('')
  @ApiOperation({ summary: 'Add new training request' })
  @ApiResponse({
    type: CreateRequestRDO,
    status: HttpStatus.CREATED,
    description: RequestMessage.SUCCESS.CREATED
  })
  public async create(@Body() dto: CreateRequestDTO & UserIdPayload) { // FIXME: При слиянии типов Swagger не подтягивает автоматом Request Body для запроса
    const request = await this.requestService.create(dto);

    return fillDTO(CreateRequestRDO, request.toPOJO());
  }

  @Patch(':requestId')
  @ApiOperation({ summary: 'Update request info' })
  @ApiResponse({
    type: CreateRequestRDO,
    status: HttpStatus.CREATED,
    description: RequestMessage.SUCCESS.UPDATED
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: RequestMessage.ERROR.CANT_UPDATE
  })
  public async update(
    @Param('requestId') requestId: string,
    @Body() dto: UpdateRequestDTO & UserIdPayload
  ): Promise<CreateRequestRDO | null> {
    const updatedRequest = await this.requestService.updateById(requestId, dto);

    return fillDTO(CreateRequestRDO, updatedRequest.toPOJO());
  }

  @Delete(':requestId')
  @ApiOperation({ summary: 'Delete request' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: RequestMessage.SUCCESS.DELETED
  })
  public async delete(
    @Param('requestId') requestId: string,
    @Body('userId') userId: string
  ): Promise<void> {
    await this.requestService.delete(requestId, userId);
  }

  @Get('/by-target/:targetUserId')
  @ApiOperation({ summary: 'Get all requests to target user' })
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
    type: RequestsWithPaginationRDO,
    status: HttpStatus.CREATED,
    description: RequestMessage.SUCCESS.FOUND
  })
  public async getAllRequestsToTarget(
    @Param('targetUserId') targetUserId: string,
    @Query() query: BaseSearchQuery
  ) {
    const preparedQuery = { ...query, targetUserId };
    const requests = await this.requestService.search(preparedQuery);

    const result = {
      ...requests,
      entities:  requests.entities.map((request) => fillDTO(CreateRequestRDO, request.toPOJO()))
    };

    return result;
  }

  @Get('/by-initiator/:initiatorUserId')
  @ApiOperation({ summary: 'Get all requests from initiator user' })
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
    type: RequestsWithPaginationRDO,
    status: HttpStatus.CREATED,
    description: RequestMessage.SUCCESS.FOUND
  })
  public async getAllRequestsByInitiator(
    @Param('initiatorUserId') initiatorUserId: string,
    @Query() query: BaseSearchQuery
  ) {
    const preparedQuery = { ...query, initiatorUserId };
    const requests = await this.requestService.search(preparedQuery);

    const result = {
      ...requests,
      entities:  requests.entities.map((request) => fillDTO(CreateRequestRDO, request.toPOJO()))
    };

    return result;
  }

  @Get('/by-users')
  @ApiOperation({ summary: 'Get request by user and trainer' })
  @ApiResponse({
    type: CreateRequestRDO,
    status: HttpStatus.CREATED,
    description: RequestMessage.SUCCESS.CREATED
  })
  public async findByInitiatorAndTargetUsers(@Body() dto: UserAndTargetUserIdsPayload) {
    const { userId, targetUserId } = dto;
    const request = await this.requestService.getRequestByInitiatorAndTargetUserId(userId, targetUserId);

    return fillDTO(CreateRequestRDO, request.toPOJO());
  }

  @Get('/search')
  @ApiOperation({ summary: 'Search by requests' })
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
    type: RequestsWithPaginationRDO,
    status: HttpStatus.OK,
    description: RequestMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: RequestMessage.ERROR.NOT_FOUND
  })
  public async search(
    @Query() query: BaseSearchQuery,
    @Body() payload: UserAndTargetUserIdsPayload
  ): Promise<RequestsWithPaginationRDO> {
    const { userId, targetUserId } = payload;
    const searchQuery = {
      ...query,
      userId,
      targetUserId
    };
    const requests = await this.requestService.search(searchQuery);

    const result = {
      ...requests,
      entities:  requests.entities.map((request) => fillDTO(CreateRequestRDO, request.toPOJO()))
    };

    return result;
  }
}