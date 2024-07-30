import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { ApiRoute, AppRoute, Namespace } from '@client/src/const';
import { AsyncOptions } from '@client/src/types/async-options.type';

import { CreateTrainingRDO, TrainingFilterParamsRDO, TrainingSearchQuery, TrainingsWithPaginationRDO } from '@shared/training';

import { setDataLoadingStatus } from '../slices/main-process/main-process';
import { appendTrainingsAction, deleteTrainingItemStateAction, setConvenientTrainingsAction, setTrainingFilterParamsAction, setTrainingItemAction, setTrainingsAction, setWithDiscountTrainingsAction, setWithRatingTrainingsAction, updateTrainingsListAction,  } from '../slices/training-process/training-process';
import { redirectToRoute } from '../middlewares/redirect-action';
import { adaptQueryParams } from '@client/src/utils/adapters';

const APITrainingPrefix = `[${Namespace.TRAINING}-BACKEND]`;
const APIAction = {
  // TRAINING BACKEND
  TRAININGS_FETCH_LIST: `${APITrainingPrefix}/list`,
  TRAININGS_FETCH_CONVENIENT: `${APITrainingPrefix}/convenient-list`,
  TRAININGS_FETCH_WITH_DISCOUNT: `${APITrainingPrefix}/discount-list`,
  TRAININGS_FETCH_WITH_RATING: `${APITrainingPrefix}/rating-list`,
  TRAININGS_FETCH_ITEM: `${APITrainingPrefix}/item`,

  TRAININGS_CREATE: `${APITrainingPrefix}/create`,
  TRAININGS_UPDATE: `${APITrainingPrefix}/update`,
  TRAININGS_DELETE: `${APITrainingPrefix}/delete`,

  PAGINATION_GET_PAGE: `${APITrainingPrefix}/get-pagination-page`,
  SEARCH: `${APITrainingPrefix}/search`,
  FILTER_GET_PARAMS: `${APITrainingPrefix}/get-filter-params`,
} as const;

// ASYNC ACTIONS
type TrainingId = string;

// Загрузка списка тренировок с пагинацией
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

// Загрузка тренировок, подходящих по параметрам для пользователя
export const fetchConvenientTrainingsAction = createAsyncThunk<TrainingsWithPaginationRDO, void, AsyncOptions>(
  APIAction.TRAININGS_FETCH_CONVENIENT,
  async (_arg, { dispatch, rejectWithValue, extra: api }) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<TrainingsWithPaginationRDO>(ApiRoute.CONVENIENT_TRAININGS_API);

      dispatch(setConvenientTrainingsAction(data));
      dispatch(setDataLoadingStatus(false));

      return data;

    } catch(err) {
      toast.warn('Can`t load your convenient trainings. Please, refresh page or try again later')

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);

// Загрузка тренировок со скидками
export const fetchWithDiscountTrainingsAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.TRAININGS_FETCH_WITH_DISCOUNT,
  async (_arg, { dispatch, rejectWithValue, extra: api }) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<TrainingsWithPaginationRDO>(ApiRoute.WITH_DISCOUNT_TRAININGS_API);

      dispatch(setWithDiscountTrainingsAction(data));
      dispatch(setDataLoadingStatus(false));

    } catch(err) {
      toast.warn('Can`t load trainings with discount. Please, refresh page or try again later')

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);

// Загрузка тренироок с рейтингом больше 0
export const fetchWithRatingTrainingsAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.TRAININGS_FETCH_WITH_RATING,
  async (_arg, { dispatch, rejectWithValue, extra: api }) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<TrainingsWithPaginationRDO>(ApiRoute.WITH_RATING_TRAININGS_API);

      dispatch(setWithRatingTrainingsAction(data));
      dispatch(setDataLoadingStatus(false));

    } catch(err) {
      toast.warn('Can`t load trainings with rating. Please, refresh page or try again later')

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);

// Загрузка детальной информации о тренировке
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

// Обновление тренировки
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

// Удаление тренировки
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

// Пагинация
type PageNumber = number;

export const getPaginationPage = createAsyncThunk<void, PageNumber, AsyncOptions>(
  APIAction.PAGINATION_GET_PAGE,
  async (
    pageNumber,
    {dispatch, extra: api}
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<TrainingsWithPaginationRDO>(`${ApiRoute.TRAININGS_API}/?page=${pageNumber}`);

      dispatch(appendTrainingsAction(data));
    } catch(err) {
      toast.error(`Cant't get pagination page ${pageNumber}. Error: ${err}`);
    }

    dispatch(setDataLoadingStatus(false));
  }
);

type SearchPayload = {
  searchQuery: TrainingSearchQuery,
  appendItems?: boolean
};

export const searchTrainingsAction = createAsyncThunk<TrainingsWithPaginationRDO, SearchPayload, AsyncOptions>(
  APIAction.SEARCH,
  async (
    { searchQuery, appendItems },
    {dispatch, rejectWithValue, extra: api}
  ) => {
    dispatch(setDataLoadingStatus(true));

    let url = `${ApiRoute.TRAININGS_API}`;

    if(searchQuery && Object.keys(searchQuery).length > 0) {
      const queryString = adaptQueryParams(searchQuery as Record<string, unknown>);

      url += `?${queryString}`;
    }

    // Запрашиваем данные с сервера
    try {
      const { data } = await api.get<TrainingsWithPaginationRDO>(url);

      if(!data) {
        toast.warn('No products found by passed filter');
      }

      if(!appendItems) {
        dispatch(setTrainingsAction(data));

        dispatch(setDataLoadingStatus(false));
        return data;
      }

      // Если передан параметр appendItems, это значит
      // что результат запроса нужно добавить к текущему
      // состоянию, а не заменить им все состояние, т.е.
      // в данном случае, к текущему списку тренировок добавить
      // полученные от сервера (для возможности дозагрузить
      // тренить тренировки по кнопке "Показать еще")
      dispatch(appendTrainingsAction(data));

      dispatch(setDataLoadingStatus(false));
      return data;
    } catch(err) {
      toast.error(`Can't get trainings. Error: ${err}`);

      dispatch(setDataLoadingStatus(false));
      return rejectWithValue(err);
    }
  }
);

// Получение базовых параметров фильтра исходя из имеющихся тренировок
export const fetchTrainingFilterParams = createAsyncThunk<TrainingFilterParamsRDO, void, AsyncOptions>(
  APIAction.FILTER_GET_PARAMS,
  async (_arg, { dispatch, rejectWithValue, extra: api }) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<TrainingFilterParamsRDO>(`${ApiRoute.FILTER_PARAMS}`);

      dispatch(setTrainingFilterParamsAction(data));

      return data;
    } catch(err) {
      toast.error(`Cant't get params for training filter. Error: ${err}`);

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);
