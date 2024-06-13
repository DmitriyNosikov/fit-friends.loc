import { ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { BCryptHasher, getJWTPayload, validateMongoID } from '../libs/helpers';
import { UserInterface } from '../libs/interfaces';
import { SendMailService } from '../send-mail/send-mail.service';

import { UserMessage } from './user.constant';
import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';
import { UserRepository } from './user.repository';

import { CreateUserDTO } from '@shared/user/dto/create-user.dto';
import { LoginUserDTO } from '@shared/user/dto/login-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,

    @Inject('Hasher')
    private readonly hasher: BCryptHasher,

    private readonly jwtService: JwtService,
    private readonly sendMailService: SendMailService
  ) {}

  public async register(dto: CreateUserDTO): Promise<UserEntity> {
    const { name, email, password } = dto;
    const user = await this.userRepository.findByEmail(email);

    if(user) { // Если пользователь уже есть в системе - не регистрируем
      throw new ConflictException(UserMessage.ERROR.ALREADY_EXISTS);
    }

    const blogUser = {
      name,
      email,
      passwordHash: ''
    };

    const userEntity = this.userFactory.create(blogUser);
    const hashedPassword = await this.hasher.getHash(password);

    userEntity.setPassword(hashedPassword);

    await this.userRepository.create(userEntity);

    // Отправляем пользователю Email об успешной регистрации
    await this.sendMailService.sendNewUserEmail(userEntity.toPOJO());

    return userEntity;
  }

  public async getUserByEmail(email: string): Promise<UserEntity | null> {
    const existUser = await this.userRepository.findByEmail(email);

    if(!existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  public async verify(dto: LoginUserDTO): Promise<UserEntity> {
    const { email, password } = dto;
    const user = await this.userRepository.findByEmail(email);

    if(!user) {
      throw new NotFoundException(UserMessage.ERROR.NOT_FOUND);
    }

    const verifyUser = await this.hasher.checkHash(password, user.passwordHash);

    if(!verifyUser) {
      throw new UnauthorizedException(UserMessage.ERROR.INCORRECT_CREDENTIALS);
    }

    return user;
  }

  public async createToken(user: UserInterface) {
    const accessTokenPayload = getJWTPayload(user);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);

      return { accessToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);

      throw new HttpException('Can`t create JWT Token.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUserDetail(userId: string): Promise<UserEntity | null> {
    await validateMongoID(userId);

    const user = await this.userRepository.findById(userId);

    if(!user) {
      throw new NotFoundException(UserMessage.ERROR.NOT_FOUND);
    }

    return user;
  }

  public async deleteUser(userId: string): Promise<void> {
    await validateMongoID(userId);

    const isUserExists = await this.userRepository.exists(userId);

    if(!isUserExists) {
      return;
    }

    return await this.userRepository.deleteById(userId);
  }
}
