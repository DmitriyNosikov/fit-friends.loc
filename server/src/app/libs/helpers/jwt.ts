import { JwtModuleAsyncOptions } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';

import { TokenPayloadInterface } from '../interfaces/';
import { UserInterface } from '@server/user/interfaces';


export function getJWTOptions(optionSpace?: string): JwtModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      return {
        secret: configService.get<string>(`${optionSpace}.accessTokenSecret`),
        signOptions: {
          expiresIn: configService.get<string>(`${optionSpace}.accessTokenExpiresIn`),
          algorithm: 'HS256',
        }
      };
    },
    inject: [ConfigService]
  }
}

export function getJWTPayload(user: UserInterface): TokenPayloadInterface {
  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }
}
