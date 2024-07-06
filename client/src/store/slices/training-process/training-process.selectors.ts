import { Namespace } from '@client/src/const';
import { TrainingStateNamespace } from '@client/src/types/selector';
import { CreateTrainingRDO, TrainingsWithPaginationRDO } from '@shared/training';

export function getTrainingsList(state: TrainingStateNamespace): TrainingsWithPaginationRDO | null {
  return state[Namespace.TRAINING].paginatedTrainings;
}

export function getTrainingsListLoadingStatus(state: TrainingStateNamespace): Boolean {
  return state[Namespace.TRAINING].isTrainingsLoading;
}

export function getUserConvenientTrainings(state: TrainingStateNamespace): TrainingsWithPaginationRDO | null {
  return state[Namespace.TRAINING].paginatedConvenientTrainings;
}

export function getConvenientTrainingsLoadingStatus(state: TrainingStateNamespace): Boolean {
  return state[Namespace.TRAINING].isConvenientTrainingsLoading;
}

export function getTrainingItem(state: TrainingStateNamespace): CreateTrainingRDO | null {
  return state[Namespace.TRAINING].trainingItem;
}
