import { Module } from '@nestjs/common';

import { ConfigEnvironment } from '../../config';
import { BCryptHasher, getJWTOptions } from '../libs/helpers';
import { JWTAccessStrategy } from './strategies/jwt-access.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import { JwtModule } from '@nestjs/jwt';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { JWTRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { UserController } from './user.controller';
import { UserFactory } from './user.factory';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';


@Module({
  imports: [
    PrismaClientModule,
    RefreshTokenModule,

    JwtModule.registerAsync(
      getJWTOptions(ConfigEnvironment.JWT)
    ),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserFactory,

    JWTAccessStrategy,
    JWTRefreshStrategy,
    LocalStrategy,

    {
      provide: 'Hasher',
      useClass: BCryptHasher,
    },
  ],
  exports: [UserFactory, UserService, UserRepository],
})
export class UserModule {}
