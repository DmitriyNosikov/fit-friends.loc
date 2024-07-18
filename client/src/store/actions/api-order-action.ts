import { ApiRoute, Namespace } from '@client/src/const';
import { AsyncOptions } from '@client/src/types/async-options.type';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDataLoadingStatus } from '../slices/main-process/main-process';
import { CreateOrderDTO, CreateOrderRDO, OrdersWithPaginationRDO } from '@shared/order';
import { setOrdersAction, updateOrdersAction } from '../slices/order-process/order-process';
import { toast } from 'react-toastify';

const APIOrderPrefix = `[${Namespace.ORDER}-BACKEND]`;
const APIAction = {
  ORDERS_FETCH_LIST: `${APIOrderPrefix}/list`,

  ORDERS_CREATE: `${APIOrderPrefix}/create`,
  ORDERS_UPDATE: `${APIOrderPrefix}/update`,
  ORDERS_DELETE: `${APIOrderPrefix}/delete`,
} as const;

// Загрузка списка тренировок с пагинацией
export const fetchOrdersAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.ORDERS_FETCH_LIST,
  async (_arg, { dispatch, rejectWithValue, extra: api }) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<OrdersWithPaginationRDO>(ApiRoute.ORDERS_API);

      dispatch(setOrdersAction(data));
      dispatch(setDataLoadingStatus(false));

    } catch(err) {
      toast.warn('Can`t load your orders. Please, refresh page or try again later')

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);

export const createOrderAction = createAsyncThunk<CreateOrderRDO, CreateOrderDTO, AsyncOptions>(
  APIAction.ORDERS_CREATE,
  async (
    orderData,
    { dispatch, rejectWithValue, extra: api}
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.post<CreateOrderRDO>(ApiRoute.ORDERS_API, orderData);

      dispatch(updateOrdersAction(data));
      dispatch(setDataLoadingStatus(false));

      return data;
    } catch(err) {
      toast.warn(`Can't create order: ${err}`);

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);
