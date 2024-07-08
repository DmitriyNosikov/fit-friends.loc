import { Namespace } from '@client/src/const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateTrainingReviewRDO, TrainingReviewsWithPaginationRDO } from '@shared/training-review'
import { fetchTrainingReviewsAction } from '../../actions/api-training-review-action';

export type TrainingReviewsProcess = {
  paginatedTrainingReviews: TrainingReviewsWithPaginationRDO | null,
  isTrainingsReviewsLoading: boolean
};

const initialState: TrainingReviewsProcess = {
  paginatedTrainingReviews: null,
  isTrainingsReviewsLoading: false,
};

export const trainingReviewsProcess = createSlice({
  name: Namespace.TRAINING_REVIEWS,
  initialState,
  reducers: {
    // Список тренировок
    setTrainingReviewsAction: (state, action: PayloadAction<TrainingReviewsWithPaginationRDO | null>) => {
      state.paginatedTrainingReviews = action.payload;
    },

    // Список тренировок
    appendTrainingReviewsAction: (state, action: PayloadAction<CreateTrainingReviewRDO | null>) => {
      if(!action.payload) {
        return;
      }

      state.paginatedTrainingReviews?.entities.push(action.payload)
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchTrainingReviewsAction.pending, (state) => {
        state.isTrainingsReviewsLoading = true;
      })
      .addCase(fetchTrainingReviewsAction.fulfilled, (state) => {
        state.isTrainingsReviewsLoading = false;
      })
      .addCase(fetchTrainingReviewsAction.rejected, (state) => {
        state.isTrainingsReviewsLoading = false;
      })
  },
});

export const {
  setTrainingReviewsAction,
  appendTrainingReviewsAction
} = trainingReviewsProcess.actions;
