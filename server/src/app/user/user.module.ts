import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { ConfigEnvironment } from '../../config';
import { BCryptHasher, getJWTOptions } from '../libs/helpers';
import { JWTAccessStrategy } from './strategies/jwt-access.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import { UserModel, UserSchema } from './user.model';
import { UserFactory } from './user.factory';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { SendMailModule } from '../send-mail/send-mail.module';
import { SendMailService } from '../send-mail/send-mail.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema }
    ]),

    // Модуль для работы с JWT-токенами
    JwtModule.registerAsync(
      getJWTOptions(ConfigEnvironment.JWT)
    ),

    SendMailModule,
  ],
  controllers: [UserController],
  // Провайдеры модуля (API)
  providers: [
    UserService,
    UserRepository,
    UserFactory,

    // Стратегии авторизации (PassportJS)
    JWTAccessStrategy,
    LocalStrategy,

    {
      provide: 'Hasher',
      useClass: BCryptHasher,
    },

    SendMailService
  ],
  //Провайдеры, доступные в других модулях при импорте данного модуля (внешнее API)
  exports: [UserFactory, UserService, UserRepository],
})
export class UserModule {}
