import { Module } from '@nestjs/common';

import { ConfigEnvironment } from '../../config';
import { BCryptHasher, getJWTOptions } from '../libs/helpers';
import { JWTAccessStrategy } from './strategies/jwt-access.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import { UserFactory } from './user.factory';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { JWTRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    PrismaClientModule,
    RefreshTokenModule,

    // Модуль для работы с JWT-токенами
    JwtModule.registerAsync(
      getJWTOptions(ConfigEnvironment.JWT)
    ),
  ],
  controllers: [UserController],
  // Провайдеры модуля (API)
  providers: [
    UserService,
    UserRepository,
    UserFactory,

    // Стратегии авторизации (PassportJS)
    JWTAccessStrategy,
    JWTRefreshStrategy,
    LocalStrategy,

    {
      provide: 'Hasher',
      useClass: BCryptHasher,
    },
  ],
  //Провайдеры, доступные в других модулях при импорте данного модуля (внешнее API)
  exports: [UserFactory, UserService, UserRepository],
})
export class UserModule {}
