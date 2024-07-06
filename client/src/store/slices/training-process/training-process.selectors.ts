import { Namespace } from '@client/src/const';
import { TrainingStateNamespace } from '@client/src/types/selector';
import { CreateTrainingRDO, TrainingsWithPaginationRDO } from '@shared/training';

// Lists
export function getTrainingsList(state: TrainingStateNamespace): TrainingsWithPaginationRDO | null {
  return state[Namespace.TRAINING].paginatedTrainings;
}

export function getUserConvenientTrainings(state: TrainingStateNamespace): TrainingsWithPaginationRDO | null {
  return state[Namespace.TRAINING].paginatedConvenientTrainings;
}

export function getTrainingsWithDiscount(state: TrainingStateNamespace): TrainingsWithPaginationRDO | null {
  return state[Namespace.TRAINING].paginatedWithDiscountTrainings;
}

export function getTrainingsWithRating(state: TrainingStateNamespace): TrainingsWithPaginationRDO | null {
  return state[Namespace.TRAINING].paginatedWithRatingTrainings;
}

// Loading statuses
export function getTrainingsListLoadingStatus(state: TrainingStateNamespace): Boolean {
  return state[Namespace.TRAINING].isTrainingsLoading;
}

export function getConvenientTrainingsLoadingStatus(state: TrainingStateNamespace): Boolean {
  return state[Namespace.TRAINING].isConvenientTrainingsLoading;
}

export function getWithDiscountTrainingsLoadingStatus(state: TrainingStateNamespace): Boolean {
  return state[Namespace.TRAINING].isWithDiscountTrainingsLoading;
}

export function getWithRatingTrainingsLoadingStatus(state: TrainingStateNamespace): Boolean {
  return state[Namespace.TRAINING].isWithRatingTrainingsLoading;
}


// Trainings item
export function getTrainingItem(state: TrainingStateNamespace): CreateTrainingRDO | null {
  return state[Namespace.TRAINING].trainingItem;
}
