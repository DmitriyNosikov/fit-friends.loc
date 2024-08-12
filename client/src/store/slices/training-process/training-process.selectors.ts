import { Namespace } from '@client/src/const';
import { TrainingStateNamespace } from '@client/src/types/selector';
import { CreateTrainingRDO, TrainingFilterParamsRDO, TrainingsWithPaginationRDO } from '@shared/training';

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

// Trainings item
export function getTrainingItem(state: TrainingStateNamespace): CreateTrainingRDO | null {
  return state[Namespace.TRAINING].trainingItem;
}

// Training filter params
export function getTrainingFilterParams(state: TrainingStateNamespace): TrainingFilterParamsRDO | null {
  return state[Namespace.TRAINING].filterParams;
}


// Loading statuses
export function getTrainingsListLoadingStatus(state: TrainingStateNamespace): boolean {
  return state[Namespace.TRAINING].isTrainingsLoading;
}

export function getConvenientTrainingsLoadingStatus(state: TrainingStateNamespace): boolean {
  return state[Namespace.TRAINING].isConvenientTrainingsLoading;
}

export function getWithDiscountTrainingsLoadingStatus(state: TrainingStateNamespace): boolean {
  return state[Namespace.TRAINING].isWithDiscountTrainingsLoading;
}

export function getWithRatingTrainingsLoadingStatus(state: TrainingStateNamespace): boolean {
  return state[Namespace.TRAINING].isWithRatingTrainingsLoading;
}

export function getTrainingItemLoadingStatus(state: TrainingStateNamespace): boolean {
  return state[Namespace.TRAINING].isTrainingsItemLoading;
}
