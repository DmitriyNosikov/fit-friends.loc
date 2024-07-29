import { ApiRoute, Namespace } from '@client/src/const';
import { AsyncOptions } from '@client/src/types/async-options.type';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { setDataLoadingStatus } from '../slices/main-process/main-process';
import { setBalanceAction, setCurrentTrainingBalanceAction, updateBalanceAction } from '../slices/balance-process/balance-process';
import { BalancesWithPaginationRDO, ChangeBalanceDTO, CreateBalanceRDO, UpdateBalanceDTO } from '@shared/balance';

const APIBalancePrefix = `[${Namespace.BALANCE}-BACKEND]`;
const APIAction = {
  BALANCE_FETCH_LIST: `${APIBalancePrefix}/list`,
  BALANCE_BY_TRAINING: `${APIBalancePrefix}/balance-by-training`,

  BALANCE_UPDATE: `${APIBalancePrefix}/update`,
  BALANCE_CHANGE: `${APIBalancePrefix}/change`
} as const;

type BalanceId = {
  balanceId: string
}

type TrainingId = {
  trainingId: string
}

type ChangeBalance = {
  increase?: boolean
} & TrainingId & ChangeBalanceDTO;

export const fetchBalanceAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.BALANCE_FETCH_LIST,
  async (_arg, { dispatch, rejectWithValue, extra: api }) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<BalancesWithPaginationRDO>(ApiRoute.BALANCE_API);

      dispatch(setBalanceAction(data));
      dispatch(setDataLoadingStatus(false));

    } catch(err) {
      toast.warn('Can`t load your training balance. Please, refresh page or try again later')

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);

export const fetchCurrentTrainingBalance = createAsyncThunk<CreateBalanceRDO, TrainingId, AsyncOptions>(
  APIAction.BALANCE_BY_TRAINING,
  async (
    trainingId,
    { dispatch, rejectWithValue, extra: api }
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<CreateBalanceRDO>(`${ApiRoute.BALANCE_API}/by-training/${trainingId}`);

      dispatch(setCurrentTrainingBalanceAction(data));
      dispatch(setDataLoadingStatus(false));

      return data;
    } catch(err) {
      toast.warn('Can`t load your training balance. Please, refresh page or try again later')

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);

export const updateBalance = createAsyncThunk<CreateBalanceRDO, UpdateBalanceDTO & BalanceId, AsyncOptions>(
  APIAction.BALANCE_UPDATE,
  async (
    updateBalanceData,
    { dispatch, rejectWithValue, extra: api } // AsyncOptions
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
    const balanceId = updateBalanceData.balanceId;
    const balanceData = {
      ...updateBalanceData,
      balanceId: undefined
    };
    const { data } = await api.patch<CreateBalanceRDO>(`${ApiRoute.BALANCE_API}/${balanceId}`, balanceData);

      dispatch(updateBalanceAction(data));
      dispatch(setDataLoadingStatus(false));

      toast.success('Balance has been successfully updated');

      return data;
    } catch(err) {
      toast.error(`Can't update balance: ${err}`);

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);

export const changeBalance = createAsyncThunk<CreateBalanceRDO, ChangeBalance, AsyncOptions>(
  APIAction.BALANCE_CHANGE,
  async (
    changeBalanceData,
    { dispatch, rejectWithValue, extra: api } // AsyncOptions
  ) => {
    dispatch(setDataLoadingStatus(true));

    const endpoint = changeBalanceData.increase ? 'increase' : 'decrease';
    const preparedData = {
      trainingId: changeBalanceData.trainingId,
      amount: changeBalanceData.amount
    }

    try {
    const { data } = await api.patch<CreateBalanceRDO>(`${ApiRoute.BALANCE_API}/${endpoint}`, preparedData);
      dispatch(setCurrentTrainingBalanceAction(data));
      dispatch(setDataLoadingStatus(false));

      toast.success(`Balance has been changed. Remaining trainings count: ${data.remainingTrainingsCount}`);

      return data;
    } catch(err) {
      toast.error(`Can't change balance: ${err}`);

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);
