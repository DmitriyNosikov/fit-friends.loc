
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { setDataLoadingStatus } from '../slices/main-process/main-process';
import { setUserInfoAction } from '../slices/user-process/user-process';

import { CreateUserDTO, LoggedUserRDO, LoginUserDTO } from '@shared/user';
import { redirectToRoute } from '../middlewares/redirect-action';


import { AsyncOptions } from '@client/src/types/async-options.type';


import { ApiRoute, AppRoute, Namespace } from '@client/src/const';
import { TokenPayload } from '@client/src/types/token-payload';
import { deleteToken, setToken } from '@client/src/services/token';



const APIUserPrefix = `[${Namespace.USER}-BACKEND]`;
const APIAction = {
  // USERS BACKEND
  USER_REGISTER: `${APIUserPrefix}/register`,
  USER_LOGIN: `${APIUserPrefix}/login`,
  USER_CHECK_AUTH: `${APIUserPrefix}/checkAuth`,
  USER_GET_DETAIL: `${APIUserPrefix}/getDetail`,
} as const;

// ASYNC ACTIONS
// --- Auth
//---------------------------------------------Return Payload AsyncOptions
export const checkAuthAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.USER_CHECK_AUTH,
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.post<TokenPayload>(ApiRoute.CHECK_JWT_TOKEN);

      dispatch(fetchUserDetailInfoAction(data))
    } catch(error) {
      deleteToken();

      dispatch(setUserInfoAction(null));
      dispatch(redirectToRoute(AppRoute.LOGIN));
    }

    dispatch(setDataLoadingStatus(false));
  }
);

export const registerAction = createAsyncThunk<LoggedUserRDO, CreateUserDTO, AsyncOptions>(
  APIAction.USER_REGISTER,
  async (
    newUserData, // New User Data
    { dispatch, rejectWithValue, extra: api } // AsyncOptions
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.post<LoggedUserRDO>(ApiRoute.REGISTER, newUserData);

      dispatch(setDataLoadingStatus(false));

      return data;
    } catch(err) {
      toast.warn(`Registration ended with error: ${err}`);

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);

export const loginAction = createAsyncThunk<void, LoginUserDTO, AsyncOptions>(
  APIAction.USER_LOGIN,
  async (
    { email, password }, // AuthData
    { dispatch, extra: api } // AsyncOptions
  ) => {
    dispatch(setDataLoadingStatus(true));

    const { data } = await api.post<LoggedUserRDO>(
      ApiRoute.LOGIN,
      { email, password }
    );
    const { accessToken } = data;

    if(accessToken) {
      setToken(accessToken);
    }

    dispatch(setUserInfoAction(data));
    dispatch(setDataLoadingStatus(false));
    dispatch(redirectToRoute(AppRoute.MAIN));
  }
);

export const fetchUserDetailInfoAction = createAsyncThunk<void, TokenPayload, AsyncOptions>(
  APIAction.USER_GET_DETAIL,
  async (
    { userId }, // AuthData
    { dispatch, extra: api } // AsyncOptions
  ) => {
    dispatch(setDataLoadingStatus(true));

    const { data } = await api.get<LoggedUserRDO>(`${ApiRoute.USER_API}/${userId}`);

    dispatch(setUserInfoAction(data));
    dispatch(setDataLoadingStatus(false));
  }
);
