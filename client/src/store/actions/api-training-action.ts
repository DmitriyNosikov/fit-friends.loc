import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { ApiRoute, AppRoute, Namespace } from '@client/src/const';
import { AsyncOptions } from '@client/src/types/async-options.type';

import { CreateTrainingRDO, TrainingsWithPaginationRDO } from '@shared/training';

import { setDataLoadingStatus } from '../slices/main-process/main-process';
import { deleteTrainingItemStateAction, setConvenientTrainingsAction, setTrainingItemAction, setTrainingsAction, updateTrainingsListAction,  } from '../slices/training-process/training-process';
import { redirectToRoute } from '../middlewares/redirect-action';

const APITrainingPrefix = `[${Namespace.TRAINING}-BACKEND]`;
const APIAction = {
  // TRAINING BACKEND
  TRAININGS_FETCH_LIST: `${APITrainingPrefix}/list`,
  TRAININGS_FETCH_CONVENIENT: `${APITrainingPrefix}/convenient-list`,
  TRAININGS_FETCH_ITEM: `${APITrainingPrefix}/item`,

  TRAININGS_CREATE: `${APITrainingPrefix}/create`,
  TRAININGS_UPDATE: `${APITrainingPrefix}/update`,
  TRAININGS_DELETE: `${APITrainingPrefix}/delete`,

  PAGINATION_GET_PAGE: `${APITrainingPrefix}/get-pagination-page`,
} as const;

// ASYNC ACTIONS
type TrainingId = string;

// --- Trainings
export const fetchTrainingsAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.TRAININGS_FETCH_LIST,
  async (_arg, { dispatch, rejectWithValue, extra: api }) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<TrainingsWithPaginationRDO>(ApiRoute.TRAININGS_API);

      dispatch(setTrainingsAction(data));
      dispatch(setDataLoadingStatus(false));

    } catch(err) {
      toast.warn('Can`t load trainings list. Please, refresh page or try again later')

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);

export const fetchConvenientTrainingsAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.TRAININGS_FETCH_CONVENIENT,
  async (_arg, { dispatch, rejectWithValue, extra: api }) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<TrainingsWithPaginationRDO>(ApiRoute.CONVENIENT_TRAININGS_API);

      dispatch(setConvenientTrainingsAction(data));
      dispatch(setDataLoadingStatus(false));

    } catch(err) {
      toast.warn('Can`t load your convenient trainings. Please, refresh page or try again later')

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);

export const fetchTrainingItemAction = createAsyncThunk<void, TrainingId, AsyncOptions>(
  APIAction.TRAININGS_FETCH_ITEM,
  async (
    trainingId,
    {dispatch, extra: api}
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      dispatch(setTrainingItemAction(null));

      const { data } = await api.get<CreateTrainingRDO>(`${ApiRoute.TRAININGS_API}/${trainingId}`);

      dispatch(setTrainingItemAction(data));
    } catch(err) {
      toast.warn(`Can't find training with id: ${trainingId}`);
      dispatch(redirectToRoute(AppRoute.PAGE_404));
    }

    dispatch(setDataLoadingStatus(false));
  }
);

// Update product item
export const updateTrainingItemAction = createAsyncThunk<void, Partial<CreateTrainingRDO>, AsyncOptions>(
  APIAction.TRAININGS_UPDATE,
  async (
    updateData,
    {dispatch, extra: api}
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.patch<CreateTrainingRDO>(`${ApiRoute.TRAININGS_API}/${updateData.id}`, updateData);

      dispatch(updateTrainingsListAction(data)); // Обноавляем итем в списке
      dispatch(setTrainingItemAction(data)); // Обноавляем итем о котором загружена детальная инфо

      toast.success(`Training ${updateData.id} was successfully updated`);
    } catch(err) {
      toast.warn(`Can't update training with ${updateData.id}. Error: ${err}`)
    }

    dispatch(setDataLoadingStatus(false));
  }
);

// Delete product item
export const deleteTrainingItemAction = createAsyncThunk<void, TrainingId, AsyncOptions>(
  APIAction.TRAININGS_DELETE,
  async (
    trainingId,
    {dispatch, extra: api}
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      await api.delete<void>(`${ApiRoute.TRAININGS_API}/${trainingId}`);

      dispatch(deleteTrainingItemStateAction(trainingId));
    } catch(err) {
      toast.error(`Cant't delete training with id ${trainingId}. Error: ${err}`);
    }

    dispatch(setDataLoadingStatus(false));
  }
);
