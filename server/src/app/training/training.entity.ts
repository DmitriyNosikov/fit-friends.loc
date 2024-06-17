import { Entity } from '@server/libs/entities';
import { StorableEntityInterface } from '@server/libs/interfaces';
import { TrainingInterface } from './interfaces/training.interface';

export const TRAINING_DEFAULT = {
    RATING: 0,

} as const;

export class TrainingEntity extends Entity implements StorableEntityInterface<TrainingInterface> {
    constructor(training?: TrainingInterface) {
        super();
        this.populate(training);
    }

    populate(training: TrainingInterface) {

    }

    toPOJO(): TrainingInterface {
        
    }
}