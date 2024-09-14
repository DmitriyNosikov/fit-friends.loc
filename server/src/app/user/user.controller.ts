import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { JWTRefreshGuard } from './guards/jwt-refresh.guard';
import { InjectUserIdInterceptor } from '@server/libs/interceptors/inject-user-id.interceptor';

import { fillDTO } from '../libs/helpers';

import { RequestWithUser } from './interfaces/request-with-user.interface';

import { AdditionalInfoRDO, CreateUserDTO, LoggedUserRDO, LoginUserDTO, ToggleUserFriendsDTO, UpdateUserDTO, UserRDO, UsersWithPaginationRDO } from '../../../../shared/user/';
import { trainingDurationList, genderTypeList, locationList, trainingTypeList, userRolesList, userLevelList } from '@server/libs/types';
import { UserInterface } from './interfaces';
import { UserMessage } from './user.constant';

import { UserService } from './user.service';
import { SortDirectionEnum, SortTypeEnum, UserIdPayload } from '@shared/types';
import { BaseSearchQuery, DefaultSearchParam } from '@shared/types/search/base-search-query.type';


@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }
  @Get('search')
  @ApiOperation({ summary: 'Get users list' })
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
    type: UsersWithPaginationRDO,
    status: HttpStatus.CREATED,
    description: UserMessage.SUCCESS.FOUND
  })
  public async index(@Query() query: BaseSearchQuery) {
    const users = await this.userService.search(query);

    const result = {
      ...users,
      entities:  users.entities.map((user) => fillDTO(UserRDO, user.toPOJO()))
    };

    return result;
  }

  @Get('additional')
  @ApiOperation({ summary: 'Return additional info about availible genders, locations, training types and training durations' })
  @ApiResponse({
    type: AdditionalInfoRDO,
    status: HttpStatus.OK,
    description: UserMessage.SUCCESS.ADDITIONAL
  })
  @ApiResponse({
    type: AdditionalInfoRDO,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: UserMessage.ERROR.CANT_FOUND_ADDITIONAL
  })
  public async getAdditionalInfo(): Promise<AdditionalInfoRDO> {
    return {
      gender: genderTypeList,
      location: locationList,
      trainingType: trainingTypeList,
      trainingDuration: trainingDurationList,
      roles: userRolesList,
      levels: userLevelList
    };
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.CREATED,
    description: UserMessage.SUCCESS.CREATED
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: UserMessage.ERROR.ALREADY_EXISTS
  })
  public async create(@Body() dto: CreateUserDTO) {
    const newUser = await this.userService.register(dto);

    return fillDTO(UserRDO, newUser.toPOJO());
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user by passed credentials' })
  @UseGuards(LocalAuthGuard) // Верификация перенесена в гард через LocalStrategy
  @ApiResponse({
    type: LoggedUserRDO,
    status: HttpStatus.OK,
    description: UserMessage.SUCCESS.LOGGED_IN
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UserMessage.ERROR.INCORRECT_CREDENTIALS
  })
  // LocalAuthGuard выкидывает результат своей работы в
  // объект Request, в свойство user. Из него мы и возьмем информацию,
  // которую нам возвращает UserService.validate() через LocalAuthGuard
  public async login(@Body() dto: LoginUserDTO, @Req() { user: loggedUser }: RequestWithUser) {
    const userToken = await this.userService.createToken(loggedUser as UserInterface);

    const loggedUserWithPayload = {
      ...loggedUser.toPOJO(),
      ...userToken
    };

    return fillDTO(LoggedUserRDO, loggedUserWithPayload);
  }

  @Post('friends')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: UserMessage.SUCCESS.FRIEND_ADDED
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UserMessage.ERROR.INCORRECT_CREDENTIALS
  })
  public async addFriend(
    @Body() dto: ToggleUserFriendsDTO
  ) {
    const { userId, targetUserId, otherCurrentUser } = dto;
    const currentUser = otherCurrentUser ?? userId;
    const result = await this.userService.addFriendToUser(currentUser, targetUserId);

    return fillDTO(UserRDO, result);
  }

  @Delete('friends')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: UserMessage.SUCCESS.FRIEND_REMOVED
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UserMessage.ERROR.INCORRECT_CREDENTIALS
  })
  public async removeFriend(
    @Body() dto: ToggleUserFriendsDTO
  ) {
    const { userId, targetUserId, otherCurrentUser } = dto;
    const currentUser = otherCurrentUser ?? userId;
    const result = await this.userService.removeFriendFromUser(currentUser, targetUserId);

    return fillDTO(UserRDO, result);
  }

  @Get('/')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiOperation({ summary: 'Get detail info about user' })
  @ApiResponse({
    type: LoggedUserRDO,
    status: HttpStatus.OK,
    description: UserMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: UserMessage.ERROR.NOT_FOUND
  })
  public async show(@Body('userId') userId: string): Promise<LoggedUserRDO> {
    const userDetail = await this.userService.findById(userId);

    return fillDTO(LoggedUserRDO, userDetail.toPOJO());
  }

  @Get('/:userId')
  @UseGuards(JWTAuthGuard)
  @ApiOperation({ summary: 'Get info about user by id' })
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: UserMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: UserMessage.ERROR.NOT_FOUND
  })
  public async getUserById(@Param('userId') userId: string): Promise<UserRDO> {
    const userDetail = await this.userService.findById(userId);

    return fillDTO(UserRDO, userDetail.toPOJO());
  }

  @Patch('/')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiOperation({ summary: 'Update user info' })
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.CREATED,
    description: UserMessage.SUCCESS.UPDATED
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: UserMessage.ERROR.CANT_UPDATE
  })
  public async updateUser(
    @Body() dto: UpdateUserDTO & UserIdPayload
  ): Promise<UserRDO | null> {
    const updatedUser = await this.userService.updateUser(dto.userId, dto);

    return fillDTO(UserRDO, updatedUser.toPOJO());
  }

  @Delete(':userId')
  @UseGuards(JWTAuthGuard)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: UserMessage.SUCCESS.DELETED
  })
  public async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.userService.deleteUser(userId);
  }

  @Post('check')
  @ApiOperation({ summary: 'Check user`s JWT-Token' })
  @UseGuards(JWTAuthGuard)
  public async checkToken(@Req() { user: tokenPayload }: RequestWithUser) {
    return tokenPayload;
  }

  @Post('refresh')
  @UseGuards(JWTRefreshGuard)
  @ApiOperation({ summary: 'Refresh JWT-Tokens pair by refresh token' })
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: UserMessage.SUCCESS.NEW_TOKENS
  })
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: UserMessage.ERROR.CANT_CREATE_TOKENS
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    const userToken = await this.userService.createToken(user);

    const loggedUserWithPayload = {
      ...user.toPOJO(),
      ...userToken
    };

    return fillDTO(LoggedUserRDO, loggedUserWithPayload);
  }
}
