
import { Injectable } from '@nestjs/common';
import { EntityFactoryInterface } from '../libs/interfaces';
import { StorableJWTTokenInterface } from '../libs/interfaces/storable-jwt-token.interface';
import { RefreshTokenEntity } from './refresh-token.entity';

@Injectable()
export class RefreshTokenFactory implements EntityFactoryInterface<RefreshTokenEntity> {
  public create(entityPlainData: StorableJWTTokenInterface): RefreshTokenEntity {
    return new RefreshTokenEntity(entityPlainData);
  }
}
