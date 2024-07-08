import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { ApiRoute, AppRoute, Namespace } from '@client/src/const';
import { AsyncOptions } from '@client/src/types/async-options.type';


import { setDataLoadingStatus } from '../slices/main-process/main-process';
import { CreateTrainingReviewDTO, CreateTrainingReviewRDO, TrainingReviewsWithPaginationRDO } from '@shared/training-review';
import { setTrainingReviewsAction } from '../slices/training-reviews-process/training-reviews-process';

const APITrainingPrefix = `[${Namespace.TRAINING_REVIEWS}-BACKEND]`;
const APIAction = {
  // TRAINING_REVIEWS BACKEND
  TRAINING_REVIEW_FETCH_LIST: `${APITrainingPrefix}/list`,
  TRAINING_REVIEW_FETCH_ITEM: `${APITrainingPrefix}/item`,

  TRAINING_REVIEW_CREATE: `${APITrainingPrefix}/create`,
  TRAINING_EVIEW_UPDATE: `${APITrainingPrefix}/update`,
  TRAINING_REVIEW_DELETE: `${APITrainingPrefix}/delete`,
} as const;

// ASYNC ACTIONS
type TrainingId = string;

// Загрузка списка тренировок с пагинацией
export const fetchTrainingReviewsAction = createAsyncThunk<void, TrainingId, AsyncOptions>(
  APIAction.TRAINING_REVIEW_FETCH_LIST,
  async (
    trainingId,
    { dispatch, rejectWithValue, extra: api }
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<TrainingReviewsWithPaginationRDO>(`${ApiRoute.TRAINING_REVIEWS_API}/${trainingId}`);

      dispatch(setTrainingReviewsAction(data));
      dispatch(setDataLoadingStatus(false));

    } catch(err) {
      toast.warn('Can`t load training reviews. Please, refresh page or try again later')

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);

export const addTrainingReviewsAction = createAsyncThunk<void, CreateTrainingReviewDTO, AsyncOptions>(
  APIAction.TRAINING_REVIEW_FETCH_LIST,
  async (
    reviewData,
    { dispatch, rejectWithValue, extra: api }
  ) => {
    dispatch(setDataLoadingStatus(true));

    const trainingId = reviewData.trainingId;

    try {
      const { data } = await api.post<CreateTrainingReviewDTO>(`${ApiRoute.TRAINING_REVIEWS_API}/${trainingId}`, reviewData);

      dispatch(addTrainingReviewsAction(data));
      dispatch(setDataLoadingStatus(false));

    } catch(err) {
      toast.warn(`Can't add review for training ${trainingId}. Please, refresh page or try again later`)

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);
