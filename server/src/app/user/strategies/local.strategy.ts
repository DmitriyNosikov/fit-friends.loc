import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local';


import { UserEntity } from '../user.entity';
import { UserService } from '../user.service';

const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService
  ) {
    super({ usernameField: USERNAME_FIELD_NAME  });
  }

  public async validate(email: string, password: string): Promise<UserEntity> {
    return this.userService.verify({ email, password});
  }
}
