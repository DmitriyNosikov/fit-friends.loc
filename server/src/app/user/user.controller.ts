import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDTO } from '../libs/helpers';
import { MongoIdValidationPipe } from '../libs/pipes';

import { RequestWithUser } from './interfaces/request-with-user.interface';

import { UserMessage } from './user.constant';
import { UserService } from './user.service';

import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { CreateUserDTO } from '@shared/user/dto/create-user.dto';
import { LoginUserDTO } from '@shared/user/dto/login-user.dto';
import { LoggedUserRDO } from '@shared/user/rdo/logged-user.rdo';
import { UserRDO } from '@shared/user/rdo/user.rdo';
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ){}


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
  public async create(@Body() registerUserDto: CreateUserDTO) {
    const newUser = await this.userService.register(registerUserDto);

    return fillDTO(UserRDO, newUser.toPOJO());
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user by passed credentials' })
  @UseGuards(LocalAuthGuard) // Верификация перенесена в гард через LocalStrategy
  @ApiResponse({
    type: UserRDO,
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
    const userToken = await this.userService.createToken(loggedUser);

    const loggedUserWithPayload = {
      ...loggedUser.toPOJO(),
      ...userToken
    };

    return fillDTO(LoggedUserRDO, loggedUserWithPayload);
  }

  @Post('check')
  @ApiOperation({ summary: 'Check user`s JWT-Token' })
  @UseGuards(JWTAuthGuard)
  public async checkToken(@Req() { user: tokenPayload }: RequestWithUser) {
    return tokenPayload;
  }

  @Get('/:userId')
  @UseGuards(JWTAuthGuard)
  @ApiOperation({ summary: 'Get detail info about user' })
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: UserMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: UserMessage.ERROR.NOT_FOUND
  })
  public async show(@Param('userId') userId: string): Promise<LoggedUserRDO> {
    const userDetail = await this.userService.getUserDetail(userId);

    return fillDTO(LoggedUserRDO, userDetail.toPOJO());
  }

  @Delete(':userId')
  @UseGuards(JWTAuthGuard)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: UserMessage.SUCCESS.DELETED
  })
  public async deleteUser(@Param('userId', MongoIdValidationPipe) userId: string): Promise<void> {
    await this.userService.deleteUser(userId);
  }
}
