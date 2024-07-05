import { Namespace } from '@client/src/const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateTrainingRDO, TrainingsWithPaginationRDO } from '@shared/training';

import { fetchConvenientTrainingsAction, fetchTrainingsAction } from '../../actions/api-training-action';

export type TrainingProcess = {
  paginatedTrainings: TrainingsWithPaginationRDO | null,
  paginatedConvenientTrainings: TrainingsWithPaginationRDO | null,
  trainingItem: CreateTrainingRDO | null,

  isTrainingsLoading: boolean,
  isConvenientTrainingsLoading: boolean,
};

const initialState: TrainingProcess = {
  paginatedTrainings: null,
  paginatedConvenientTrainings: null,
  trainingItem: null,

  isTrainingsLoading: false,
  isConvenientTrainingsLoading: false,
};

export const trainingProcess = createSlice({
  name: Namespace.TRAINING,
  initialState,
  reducers: {
    setTrainingsAction: (state, action: PayloadAction<TrainingsWithPaginationRDO | null>) => {
      state.paginatedTrainings = action.payload;
    },

    setConvenientTrainingsAction: (state, action: PayloadAction<TrainingsWithPaginationRDO | null>) => {
      state.paginatedConvenientTrainings = action.payload;
    },

    setTrainingItemAction: (state, action: PayloadAction<CreateTrainingRDO | null>) => {
      state.trainingItem = action.payload;
    },

    updateTrainingsListAction: (state, action: PayloadAction<CreateTrainingRDO>) => {
      const newTraining = action.payload;

      if(state.paginatedTrainings) {
        state.paginatedTrainings.entities = state.paginatedTrainings.entities
          .map((training: CreateTrainingRDO) => (training.id === newTraining.id)
            ? newTraining
            : training);
      }

      if(state.paginatedConvenientTrainings) {
        state.paginatedConvenientTrainings.entities = state.paginatedConvenientTrainings.entities
          .map((training: CreateTrainingRDO) => (training.id === newTraining.id)
            ? newTraining
            : training);
      }
    },

    deleteTrainingItemStateAction: (state, action: PayloadAction<string>) => {
      const deleteTrainingId =  action.payload;

      if(state.paginatedTrainings) {
        state.paginatedTrainings.entities = state.paginatedTrainings.entities
          .filter((training) => training.id !== deleteTrainingId);
      }

      if(state.paginatedConvenientTrainings) {
        state.paginatedConvenientTrainings.entities = state.paginatedConvenientTrainings.entities
          .filter((training) => training.id !== deleteTrainingId);
      }
    },
  },

  extraReducers(builder) {
    builder
      // Trainings list
      .addCase(fetchTrainingsAction.pending, (state) => {
        state.isTrainingsLoading = true;
      })
      .addCase(fetchTrainingsAction.fulfilled, (state) => {
        state.isTrainingsLoading = false;
      })
      .addCase(fetchTrainingsAction.rejected, (state) => {
        state.isTrainingsLoading = false;
      })
      // Convenient trainings list
      .addCase(fetchConvenientTrainingsAction.pending, (state) => {
        state.isConvenientTrainingsLoading = true;
      })
      .addCase(fetchConvenientTrainingsAction.fulfilled, (state) => {
        state.isConvenientTrainingsLoading = false;
      })
      .addCase(fetchConvenientTrainingsAction.rejected, (state) => {
        state.isConvenientTrainingsLoading = false;
      });
  },
});

export const {
  setTrainingsAction,
  setConvenientTrainingsAction,
  setTrainingItemAction,
  updateTrainingsListAction,
  deleteTrainingItemStateAction
} = trainingProcess.actions;
