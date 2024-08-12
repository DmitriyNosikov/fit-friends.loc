import { ApiRoute, Namespace } from '@client/src/const';
import { AsyncOptions } from '@client/src/types/async-options.type';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDataLoadingStatus } from '../slices/main-process/main-process';
import { CreateOrderDTO, CreateOrderRDO, OrderSearchQuery, OrdersWithPaginationRDO } from '@shared/order';
import { appendOrdersAction, setOrdersAction, updateOrdersAction } from '../slices/order-process/order-process';
import { toast } from 'react-toastify';
import { adaptPaymentType, createSearchURL } from '@client/src/utils/adapters';
import { fetchCurrentTrainingBalance } from './api-balance-action';


const APIOrderPrefix = `[${Namespace.ORDER}-BACKEND]`;
const APIAction = {
  ORDERS_FETCH_LIST: `${APIOrderPrefix}/list`,

  ORDERS_CREATE: `${APIOrderPrefix}/create`,
  ORDERS_UPDATE: `${APIOrderPrefix}/update`,
  ORDERS_DELETE: `${APIOrderPrefix}/delete`,

  SEARCH: `${APIOrderPrefix}/search`,
  PAGINATION_GET_PAGE: `${APIOrderPrefix}/get-pagination-page`,
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

    const adaptedOrderData = {
      ...orderData,
      paymentType: adaptPaymentType(orderData.paymentType)
    };

    try {
      const { data } = await api.post<CreateOrderRDO>(ApiRoute.ORDERS_API, adaptedOrderData);

      dispatch(updateOrdersAction(data));
      dispatch(fetchCurrentTrainingBalance({ trainingId: data.trainingId as string }));
      dispatch(setDataLoadingStatus(false));

      return data;
    } catch(err) {
      toast.warn(`Can't create order and update balance: ${err}`);

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);

type SearchPayload = {
  searchQuery?: OrderSearchQuery,
  appendItems?: boolean
};

export const searchOrdersAction = createAsyncThunk<OrdersWithPaginationRDO, SearchPayload, AsyncOptions>(
  APIAction.SEARCH,
  async (
    { searchQuery, appendItems },
    {dispatch, rejectWithValue, extra: api}
  ) => {
    dispatch(setDataLoadingStatus(true));

    let url = createSearchURL(ApiRoute.ORDERS_API, searchQuery as Record<string, unknown>);

    // Запрашиваем данные с сервера
    try {
      const { data } = await api.get<OrdersWithPaginationRDO>(url);

      if(!data) {
        toast.info('No products found by passed filter');
      }

      if(!appendItems) {
        dispatch(setOrdersAction(data));

        dispatch(setDataLoadingStatus(false));
        return data;
      }

      dispatch(appendOrdersAction(data));

      dispatch(setDataLoadingStatus(false));

      return data;
    } catch(err) {
      toast.error(`Can't get orders. Error: ${err}`);

      dispatch(setDataLoadingStatus(false));
      return rejectWithValue(err);
    }
  }
);

// Пагинация
type PageNumber = number;

export const getPaginationPage = createAsyncThunk<void, PageNumber, AsyncOptions>(
  APIAction.PAGINATION_GET_PAGE,
  async (
    pageNumber,
    { dispatch, extra: api }
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<OrdersWithPaginationRDO>(`${ApiRoute.ORDERS_API}/?page=${pageNumber}`);

      dispatch(appendOrdersAction(data));
    } catch(err) {
      toast.error(`Cant't get pagination page ${pageNumber}. Error: ${err}`);
    }

    dispatch(setDataLoadingStatus(false));
  }
);
