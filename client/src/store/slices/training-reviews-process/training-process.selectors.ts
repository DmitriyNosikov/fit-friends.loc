import { Namespace } from '@client/src/const';
import { TrainingReviewsStateNamespace } from '@client/src/types/selector';
import { TrainingReviewsWithPaginationRDO } from '@shared/training-review';

// Lists
export function getTrainingReviewsList(state: TrainingReviewsStateNamespace): TrainingReviewsWithPaginationRDO | null {
  return state[Namespace.TRAINING_REVIEWS].paginatedTrainingReviews;
}


// Loading statuses
export function getTrainingsReviewsLoadingStatus(state: TrainingReviewsStateNamespace): boolean {
  return state[Namespace.TRAINING_REVIEWS].isTrainingsReviewsLoading;
}
