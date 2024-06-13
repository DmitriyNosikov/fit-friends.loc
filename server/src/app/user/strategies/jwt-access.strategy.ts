import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigEnvironment, JWTConfigEnum } from '../../../config/';
import { TokenPayloadInterface } from '../../libs/interfaces/';


@Injectable()
export class JWTAccessStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(`${ConfigEnvironment.JWT}.${JWTConfigEnum.JWT_ACCESS_TOKEN_SECRET}`)
    });
  }

  public async validate(payload: TokenPayloadInterface) {
    return payload;
  }
}

