import { Injectable } from '@nestjs/common';
import { EntityFactoryInterface } from '../libs/interfaces';
import { TrainingReviewEntity } from './training-review.entity';
import { TrainingReviewInterface } from './interfaces';

@Injectable()
export class TrainingReviewFactory implements EntityFactoryInterface<TrainingReviewEntity> {
  public create(entityPlainData: TrainingReviewInterface): TrainingReviewEntity {
    return new TrainingReviewEntity(entityPlainData);
  }
}
