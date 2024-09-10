import { Injectable } from '@nestjs/common';
import { EntityFactoryInterface } from '../libs/interfaces';
import { TrainingRequestEntity } from './training-request.entity';
import { TrainingRequestInterface } from './interfaces/training-request.interface';


@Injectable()
export class TrainingRequestFactory implements EntityFactoryInterface<TrainingRequestEntity> {
  public create(entityPlainData: TrainingRequestInterface): TrainingRequestEntity {
    return new TrainingRequestEntity(entityPlainData);
  }
}
