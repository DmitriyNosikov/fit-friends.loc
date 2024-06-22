import { Injectable } from '@nestjs/common';
import { EntityFactoryInterface } from '../libs/interfaces';
import { BalanceEntity } from './balance.entity';
import { BalanceInterface } from './interfaces/balance.interface';

@Injectable()
export class BalanceFactory implements EntityFactoryInterface<BalanceEntity> {
  public create(entityPlainData: BalanceInterface): BalanceEntity {
    return new BalanceEntity(entityPlainData);
  }
}
