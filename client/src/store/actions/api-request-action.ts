import { ApiRoute, Namespace } from '@client/src/const';
import { AsyncOptions } from '@client/src/types/async-options.type';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDataLoadingStatus } from '../slices/main-process/main-process';

import { CreateRequestDTO, CreateRequestRDO, RequestsWithPaginationRDO, UpdateRequestDTO } from '@shared/request';
import { toast } from 'react-toastify';
import { deleteUserRequestAction, setUserRequestsAction, updateUserRequestsAction } from '../slices/request-process/request-process';


const APIUserPrefix = `[${Namespace.REQUEST}-BACKEND]`;

const APIAction = {
  // REQUESTS BACKEND
  REQUEST_CREATE: `${APIUserPrefix}/create`,
  REQUEST_UPDATE: `${APIUserPrefix}/update`,
  REQUEST_DELETE: `${APIUserPrefix}/delete`,

  REQUEST_FETCH: `${APIUserPrefix}/fetch`,
} as const;

// ASYNC ACTIONS
// --- Auth
//---------------------------------------------Return Payload AsyncOptions
export const createRequestAction = createAsyncThunk<CreateRequestRDO, CreateRequestDTO, AsyncOptions>(
  APIAction.REQUEST_CREATE,
  async (
    requestData, // New Request data
    { dispatch, rejectWithValue, extra: api } // AsyncOptions
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.post<CreateRequestRDO>(ApiRoute.REQUEST_API, requestData);

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

type TargetUserIdPayload = {
  targetUserId: string
}

export const fetchUserRequests = createAsyncThunk<RequestsWithPaginationRDO, TargetUserIdPayload, AsyncOptions>(
  APIAction.REQUEST_FETCH,
  async (
    { targetUserId },
    { dispatch, rejectWithValue, extra: api }
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<RequestsWithPaginationRDO>(`${ApiRoute.REQUEST_API}/${targetUserId}`);

      dispatch(setUserRequestsAction(data))

      return data;
    } catch(error) {
      toast.error(`Can't find any user's ${targetUserId} requests. Error: ${error}`);

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(error);
    }
  }
);

