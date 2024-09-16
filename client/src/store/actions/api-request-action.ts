import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoute, Namespace } from '@client/src/const';
import { AsyncOptions } from '@client/src/types/async-options.type';
import { setDataLoadingStatus } from '../slices/main-process/main-process';

import { CreateRequestDTO, CreateRequestRDO, RequestsWithPaginationRDO, UpdateRequestDTO } from '@shared/request';
import { deleteUserRequestAction, setTargetRequestsAction, setUserRequestsAction, updateUserRequestsAction } from '../slices/request-process/request-process';
import { RequestType } from '@server/libs/types';


const APIUserPrefix = `[${Namespace.REQUEST}-BACKEND]`;

const APIAction = {
  // REQUESTS BACKEND
  REQUEST_CREATE: `${APIUserPrefix}/create`,
  REQUEST_UPDATE: `${APIUserPrefix}/update`,
  REQUEST_DELETE: `${APIUserPrefix}/delete`,

  REQUEST_FETCH: `${APIUserPrefix}/fetch`,
  REQUEST_FETCH_TARGET: `${APIUserPrefix}/fetch-target`,
} as const;

// ASYNC ACTIONS
// --- Auth
//---------------------------------------------Return Payload AsyncOptions
export const createRequestAction = createAsyncThunk<CreateRequestRDO | null, CreateRequestDTO, AsyncOptions>(
  APIAction.REQUEST_CREATE,
  async (
    requestData, // New Request data
    { dispatch, rejectWithValue, extra: api } // AsyncOptions
  ) => {
    dispatch(setDataLoadingStatus(true));

    console.log('Request data: ', requestData);

    try {
      const result = await api.post<CreateRequestRDO>(ApiRoute.REQUEST_API, requestData);

      if(!result) {
        return null;
      }

      const { data } = result;

      toast.success(`Request ${data.id} has been successfully created`);

      return data;
    } catch(error) {
      toast.error(`Can't create request. Error: ${error}`);

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(error);
    }
  }
);

type RequestIdPayload = {
  requestId: string
}

export const updateRequestAction = createAsyncThunk<CreateRequestRDO, UpdateRequestDTO & RequestIdPayload, AsyncOptions>(
  APIAction.REQUEST_UPDATE,
  async (
    { requestId, ...updateRequestData },
    { dispatch, rejectWithValue, extra: api }
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.patch<CreateRequestRDO>(`${ApiRoute.REQUEST_API}/${requestId}`, updateRequestData);

      toast.success(`Request ${requestId} has been successfully updated`);

      dispatch(updateUserRequestsAction(data));

      return data;
    } catch(error) {
      toast.error(`Can't update request ${requestId}. Error: ${error}`);

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(error);
    }
  }
);

export const deleteRequestAction = createAsyncThunk<void, RequestIdPayload, AsyncOptions>(
  APIAction.REQUEST_UPDATE,
  async (
    { requestId },
    { dispatch, extra: api }
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      await api.delete(`${ApiRoute.REQUEST_API}/${requestId}`);

      dispatch(deleteUserRequestAction(requestId));

      toast.success(`Request ${requestId} has been successfully deleted`);
    } catch(error) {
      toast.error(`Can't delete request ${requestId}. Error: ${error}`);

      dispatch(setDataLoadingStatus(false));
    }
  }
);

export type FetchAllUserRequestsPayload = {
  requestType: RequestType
}

export const fetchAllCurrentUserRequests = createAsyncThunk<CreateRequestRDO[], FetchAllUserRequestsPayload | void, AsyncOptions>(
  APIAction.REQUEST_FETCH,
  async (
    payload,
    { dispatch, rejectWithValue, extra: api } // AsyncOptions
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<CreateRequestRDO[]>(`${ApiRoute.REQUEST_API}/all-user-requests`, { params: payload });

      dispatch(setUserRequestsAction(data));
      dispatch(setDataLoadingStatus(false));

      return data;
    } catch(error) {
      toast.error(`Can't get user's requests. Error: ${error}`);

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(error);
    }
  }
);

type TargetUserIdPayload = {
  targetUserId: string
}

export const fetchTargetRequests = createAsyncThunk<RequestsWithPaginationRDO, TargetUserIdPayload, AsyncOptions>(
  APIAction.REQUEST_FETCH_TARGET,
  async (
    { targetUserId },
    { dispatch, rejectWithValue, extra: api }
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<RequestsWithPaginationRDO>(`${ApiRoute.REQUEST_API}/${targetUserId}`);

      dispatch(setTargetRequestsAction(data));
      dispatch(setDataLoadingStatus(false));

      return data;
    } catch(error) {
      toast.error(`Can't find any user's ${targetUserId} requests. Error: ${error}`);

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(error);
    }
  }
);

