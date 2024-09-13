import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { JWTRefreshGuard } from './guards/jwt-refresh.guard';
import { InjectUserIdInterceptor } from '@server/libs/interceptors/inject-user-id.interceptor';

import { fillDTO } from '../libs/helpers';

import { RequestWithUser } from './interfaces/request-with-user.interface';

import { AdditionalInfoRDO, CreateUserDTO, LoggedUserRDO, LoginUserDTO, UpdateUserDTO, UserRDO } from '../../../../shared/user/';
import { trainingDurationList, genderTypeList, locationList, trainingTypeList, userRolesList, userLevelList } from '@server/libs/types';
import { UserInterface } from './interfaces';
import { UserMessage } from './user.constant';

import { UserService } from './user.service';
import { UserIdPayload } from '@shared/types';


@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }
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
