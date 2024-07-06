import { Namespace } from '@client/src/const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateTrainingRDO, TrainingsWithPaginationRDO } from '@shared/training';

import { fetchConvenientTrainingsAction, fetchTrainingsAction, fetchWithDiscountTrainingsAction, fetchWithRatingTrainingsAction } from '../../actions/api-training-action';

export type TrainingProcess = {
  paginatedTrainings: TrainingsWithPaginationRDO | null,
  paginatedConvenientTrainings: TrainingsWithPaginationRDO | null,
  paginatedWithDiscountTrainings: TrainingsWithPaginationRDO | null,
  paginatedWithRatingTrainings: TrainingsWithPaginationRDO | null,
  trainingItem: CreateTrainingRDO | null,

  isTrainingsLoading: boolean,
  isConvenientTrainingsLoading: boolean,
  isWithDiscountTrainingsLoading: boolean,
  isWithRatingTrainingsLoading: boolean,
};

const initialState: TrainingProcess = {
  paginatedTrainings: null,
  paginatedConvenientTrainings: null,
  paginatedWithDiscountTrainings: null,
  paginatedWithRatingTrainings: null,
  trainingItem: null,

  isTrainingsLoading: false,
  isConvenientTrainingsLoading: false,
  isWithDiscountTrainingsLoading: false,
  isWithRatingTrainingsLoading: false,
};

export const trainingProcess = createSlice({
  name: Namespace.TRAINING,
  initialState,
  reducers: {
    setTrainingsAction: (state, action: PayloadAction<TrainingsWithPaginationRDO | null>) => {
      state.paginatedTrainings = action.payload;
    },

    // Добавление тренировок при нажатии а кнопку "Показать еще"
    appendTrainingsAction: (state, action: PayloadAction<TrainingsWithPaginationRDO | null>) => {
      const addingTrainings = action.payload;

      if(!state.paginatedTrainings || !addingTrainings) {
        return;
      }

      addingTrainings?.entities.forEach((trainingItem) => state.paginatedTrainings?.entities.push(trainingItem));
      state.paginatedTrainings.currentPage = addingTrainings.currentPage; // Обновляем текущую страницу
    },

    // Подходящие по параметрам для пользователя тренировки
    setConvenientTrainingsAction: (state, action: PayloadAction<TrainingsWithPaginationRDO | null>) => {
      state.paginatedConvenientTrainings = action.payload;
    },

    // Тренировки со скидкой
    setWithDiscountTrainingsAction: (state, action: PayloadAction<TrainingsWithPaginationRDO | null>) => {
      state.paginatedWithDiscountTrainings = action.payload;
    },

    // Тренировки с рейтингом больше 0
    setWithRatingTrainingsAction: (state, action: PayloadAction<TrainingsWithPaginationRDO | null>) => {
      state.paginatedWithRatingTrainings = action.payload;
    },

    setTrainingItemAction: (state, action: PayloadAction<CreateTrainingRDO | null>) => {
      state.trainingItem = action.payload;
    },

    // При обновлении какой либо тренировки. ее нужно обновить во всех списках
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

      if(state.paginatedWithDiscountTrainings) {
        state.paginatedWithDiscountTrainings.entities = state.paginatedWithDiscountTrainings.entities
          .map((training: CreateTrainingRDO) => (training.id === newTraining.id)
            ? newTraining
            : training);
      }

      if(state.paginatedWithRatingTrainings) {
        state.paginatedWithRatingTrainings.entities = state.paginatedWithRatingTrainings.entities
          .map((training: CreateTrainingRDO) => (training.id === newTraining.id)
            ? newTraining
            : training);
      }
    },

    // При удалении тренировки, ее нужно удалить во всех списках
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

      if(state.paginatedWithDiscountTrainings) {
        state.paginatedWithDiscountTrainings.entities = state.paginatedWithDiscountTrainings.entities
          .filter((training) => training.id !== deleteTrainingId);
      }

      if(state.paginatedWithRatingTrainings) {
        state.paginatedWithRatingTrainings.entities = state.paginatedWithRatingTrainings.entities
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
      })

      // With discount trainings list
      .addCase(fetchWithDiscountTrainingsAction.pending, (state) => {
        state.isWithDiscountTrainingsLoading = true;
      })
      .addCase(fetchWithDiscountTrainingsAction.fulfilled, (state) => {
        state.isWithDiscountTrainingsLoading = false;
      })
      .addCase(fetchWithDiscountTrainingsAction.rejected, (state) => {
        state.isWithDiscountTrainingsLoading = false;
      })

      // With rating trainings list
      .addCase(fetchWithRatingTrainingsAction.pending, (state) => {
        state.isWithRatingTrainingsLoading = true;
      })
      .addCase(fetchWithRatingTrainingsAction.fulfilled, (state) => {
        state.isWithRatingTrainingsLoading = false;
      })
      .addCase(fetchWithRatingTrainingsAction.rejected, (state) => {
        state.isWithRatingTrainingsLoading = false;
      });
  },
});

export const {
  setTrainingsAction,
  appendTrainingsAction,
  setConvenientTrainingsAction,
  setWithDiscountTrainingsAction,
  setWithRatingTrainingsAction,
  setTrainingItemAction,
  updateTrainingsListAction,
  deleteTrainingItemStateAction
} = trainingProcess.actions;
