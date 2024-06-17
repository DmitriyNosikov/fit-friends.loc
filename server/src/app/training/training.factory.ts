import { Injectable } from '@nestjs/common';
import { EntityFactoryInterface } from '../libs/interfaces';
import { TrainingEntity } from './training.entity';
import { TrainingInterface } from './interfaces/training.interface';

@Injectable()
export class TrainingFactory implements EntityFactoryInterface<TrainingEntity> {
  public create(entityPlainData: TrainingInterface): TrainingEntity {
    return new TrainingEntity(entityPlainData);
  }
}
