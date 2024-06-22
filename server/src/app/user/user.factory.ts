import { Injectable } from '@nestjs/common';
import { EntityFactoryInterface } from '../libs/interfaces';
import { AuthUserInterface } from './interfaces';
import { UserEntity } from './user.entity';

@Injectable()
export class UserFactory implements EntityFactoryInterface<UserEntity> {
  public create(entityPlainData: AuthUserInterface): UserEntity {
    return new UserEntity(entityPlainData);
  }
}
