import { ApiRoute, Namespace } from '@client/src/const';
import { AsyncOptions } from '@client/src/types/async-options.type';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { setDataLoadingStatus } from '../slices/main-process/main-process';
import { setBalanceAction, updateBalanceAction } from '../slices/balance-process/balance-process';
import { BalancesWithPaginationRDO, CreateBalanceRDO, UpdateBalanceDTO } from '@shared/balance';

const APIBalancePrefix = `[${Namespace.BALANCE}-BACKEND]`;
const APIAction = {
  BALANCE_FETCH_LIST: `${APIBalancePrefix}/list`,

  BALANCE_UPDATE: `${APIBalancePrefix}/update`,
} as const;

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

type BalanceId = {
  balanceId: string
}

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
