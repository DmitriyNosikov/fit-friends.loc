import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { BCryptHasher, excludeKeys, getJWTPayload, omitUndefined } from '../libs/helpers';

import { jwtConfig } from 'server/src/config';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { GenderEnum, RequestWithUserId } from '@server/libs/types';

// TODO: Заменить путь на @shared как будет больше времени разобраться
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from '../../../../shared/user/'; 

import { AuthUserInterface, UserInterface } from './interfaces';
import { USER_DEFAULT, UserMessage } from './user.constant';
import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';
import { UserRepository } from './user.repository';



@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,

    @Inject('Hasher')
    private readonly hasher: BCryptHasher,

    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,

    private readonly refreshTokenService: RefreshTokenService
  ) {}

  public async findById(userId: string): Promise<UserEntity | null> {
    const existUser = await this.userRepository.findById(userId);

    if(!existUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return existUser;
  }

  public async getUserByEmail(email: string): Promise<UserEntity | null> {
    const existUser = await this.userRepository.findByEmail(email);

    if(!existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  public async register(dto: CreateUserDTO): Promise<UserEntity> {
    const { email, password } = dto;
    const user = await this.userRepository.findByEmail(email);

    if(user) { // Если пользователь уже есть в системе - не регистрируем
      throw new ConflictException(UserMessage.ERROR.ALREADY_EXISTS);
    }

    let dayCaloriesLimit = dto.dayCaloriesLimit ?? 0;

    if(!dto.dayCaloriesLimit) {
      dayCaloriesLimit = (dto.gender === GenderEnum.MALE)
      ? USER_DEFAULT.CALORIES.MALE
      : (dto.gender === GenderEnum.FEMALE)
        ? USER_DEFAULT.CALORIES.FEMALE
        : 0
    }

    const newUser = {
      ...dto,
      dayCaloriesLimit,
      passwordHash: ''
    } as unknown as AuthUserInterface;

    
    const userEntity = this.userFactory.create(newUser);
    const hashedPassword = await this.hasher.getHash(password);

    userEntity.setPassword(hashedPassword);

    const registeredUser = await this.userRepository.create(userEntity);

    return registeredUser;
  }
  
  public async updateUser(
    userId: string,
    dto: UpdateUserDTO & RequestWithUserId
  ): Promise<UserEntity | null> {
    const currentUserId = dto.userId;

    if(userId !== currentUserId) {
      throw new BadRequestException(UserMessage.ERROR.CANT_UPDATE_USER);
    }

    const isUserExists = await this.userRepository.exists(userId);

    if(!isUserExists) {
      throw new NotFoundException(UserMessage.ERROR.NOT_FOUND);
    }

    const fieldsToUpdate = omitUndefined(dto as Record<string, unknown>);

    if(Object.keys(fieldsToUpdate).length <= 0) {
      throw new BadRequestException(UserMessage.ERROR.CANT_UPDATE);
    }

    const preparedFields = excludeKeys(fieldsToUpdate, ['userId']);
    const updatedUser = await this.userRepository.updateById(userId, preparedFields);

    return updatedUser;
  }


  public async getUserDetail(userId: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findById(userId);

    if(!user) {
      throw new NotFoundException(UserMessage.ERROR.NOT_FOUND);
    }

    return user;
  }

  public async deleteUser(userId: string): Promise<void> {
    const isUserExists = await this.userRepository.exists(userId);

    if(!isUserExists) {
      return;
    }

    return await this.userRepository.deleteById(userId);
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
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.accessTokenExpiresIn
      });

      // Сохраняем refresh-токен в БД
      await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);

      throw new HttpException('Can`t create JWT Token.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
