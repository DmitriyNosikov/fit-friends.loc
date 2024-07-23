import { ApiRoute, Namespace } from '@client/src/const';
import { AsyncOptions } from '@client/src/types/async-options.type';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { setDataLoadingStatus } from '../slices/main-process/main-process';
import { setBalanceAction } from '../slices/balance-process/balance-process';
import { BalancesWithPaginationRDO } from '@shared/balance';

const APIBalancePrefix = `[${Namespace.BALANCE}-BACKEND]`;
const APIAction = {
  BALANCE_FETCH_LIST: `${APIBalancePrefix}/list`,
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
