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

import { CreateUserDTO, LoginUserDTO, UpdateUserDTO, UserSearchQuery } from '@shared/user'; 

import { USER_DEFAULT, UserMessage } from './user.constant';
import { AuthUserInterface, UserInterface } from './interfaces';

import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';
import { UserRepository } from './user.repository';
import { RequestService } from '../request/request.service';
import { CreateRequestDTO, RequestTypeEnum } from '@shared/request';
import { UserIdPayload } from '@shared/types';



@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,

    private readonly requestService: RequestService,

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

  public async search(query?: UserSearchQuery) {
    const users = await this.userRepository.search(query);

    if (!users && query) {
      throw new NotFoundException(`Can't find users by passed params " ${query}"`);
    }

    return users;
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

    if(dto.pageBackground && dto.avatar) {
      dto.pageBackground = dto.avatar;
    }

    if(dto.birthDate) {
      dto.birthDate = dto.birthDate ? new Date(dto.birthDate) : null;
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

    if(fieldsToUpdate?.birthDate) {
      fieldsToUpdate.birthDate = fieldsToUpdate.birthDate
      ? new Date(fieldsToUpdate.birthDate as string)
      : null;
    }

    const preparedFields = excludeKeys(fieldsToUpdate, ['userId']);
    const updatedUser = await this.userRepository.updateById(userId, preparedFields);

    return updatedUser;
  }

  public async deleteUser(userId: string): Promise<void> {
    const isUserExists = await this.userRepository.exists(userId);

    if(!isUserExists) {
      return;
    }

    return await this.userRepository.deleteById(userId);
  }

  public async addFriendToUser(currentUserId: string, addingUserId: string) {
    if(!currentUserId || !addingUserId) {
      throw new BadRequestException('To add new friend you have to pass current and adding user ids.');
    }

    const currentUserInfo = await this.userRepository.findById(currentUserId);
    const addingUserInfo = await this.userRepository.findById(addingUserId);

    if(currentUserInfo.friendsList.includes(addingUserId)) {
      return currentUserInfo;
    }

    currentUserInfo.friendsList.push(addingUserId);
    addingUserInfo.friendsList.push(currentUserId);

    // Добавляемся в друзья обоим пользователям
    await this.userRepository.addFriendToUser(currentUserId, addingUserId); // Текущему юзеру
    await this.userRepository.addFriendToUser(addingUserId, currentUserId); // Целевому юзеру

    // Обновляем список друзей пользователя currentUserId
    const updatedUser = await this.userRepository.updateById(currentUserId, { friendsList: currentUserInfo.friendsList });
    
    // Обновляем список друзей пользователя targetUserId
    await this.userRepository.updateById(addingUserId, { friendsList: addingUserInfo.friendsList });

    // Добавляем соответствующий запрос в таблицу запросов
    const requestData: CreateRequestDTO & UserIdPayload = {
      requestType: RequestTypeEnum.FRIENDSHIP,
      userId: currentUserId,
      targetUserId: addingUserId
    };

    await this.requestService.create(requestData);

    return updatedUser;
  }

  public async removeFriendFromUser(currentUserId: string, removingUserId: string) {
    if(!currentUserId || !removingUserId) {
      throw new BadRequestException('To remove friend you have to pass current and removing user ids.');
    }

    const currentUserInfo = await this.userRepository.findById(currentUserId);
    const removingUserInfo = await this.userRepository.findById(removingUserId);

    if(!currentUserInfo.friendsList.includes(removingUserId)) {
      return currentUserInfo;
    }

    const currentUserUpdatedFriendsList = currentUserInfo.friendsList.filter((userId) => userId !== removingUserId);
    const removingUserUpdatedFriendsList = removingUserInfo.friendsList.filter((userId) => userId !== currentUserId);

    // Удаляемся из друзей у обоих пользователей
    await this.userRepository.removeFriendFromUser(currentUserId, removingUserId); // У текущего юзера
    await this.userRepository.removeFriendFromUser(removingUserId, currentUserId); // У целевого юзера

    // Обновляем список друзей пользователя currentUserId
    const updatedUser = await this.userRepository.updateById(currentUserId, { friendsList: currentUserUpdatedFriendsList });
    
    // Обновляем список друзей пользователя targetUserId
    await this.userRepository.updateById(removingUserId, { friendsList: removingUserUpdatedFriendsList });

    // Удаляем запрос из таблицы запросов
    const request = await this.requestService.getRequestByInitiatorAndTargetUserId(currentUserId, removingUserId);
    
    if(request) {
      await this.requestService.delete(request.id, currentUserId);
    }

    return updatedUser;
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
