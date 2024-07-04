
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { setDataLoadingStatus } from '../slices/main-process/main-process';
import { setAdditionalInfo, setUserInfoAction } from '../slices/user-process/user-process';

import { AdditionalInfoRDO, CreateUserDTO, LoggedUserRDO, LoginUserDTO } from '@shared/user';
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
  USER_GET_ADDITIONAL: `${APIUserPrefix}/getAdditional`,
  USER_UPLOAD_AVATAR: `${APIUserPrefix}/uploadAvatar`,
} as const;

// ASYNC ACTIONS
export const getAdditionalInfoAction = createAsyncThunk<AdditionalInfoRDO, void, AsyncOptions>(
  APIAction.USER_GET_ADDITIONAL,
  async (_arg, { dispatch, rejectWithValue, extra: api }) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<AdditionalInfoRDO>(ApiRoute.GET_ADDITIONAL_INFO);

      dispatch(setAdditionalInfo(data));

      return data;
    } catch(err) {
      toast.warn(`Can't get additional info: ${err}`);

      dispatch(setAdditionalInfo(null));
      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);

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

    // Аватар нужно загружать отдельно
    let avatarUrl = '';
    if(newUserData.avatar) {
      dispatch(uploadAvatarAction(newUserData.avatar as FormData))
      .then((result) => {
        avatarUrl = result.payload as string;
      });
    }

    const newUserDataWithAvatar = {
      ...newUserData,
      avatar: avatarUrl ?? newUserData.avatar
    };

    try {
      const { data } = await api.post<LoggedUserRDO>(ApiRoute.REGISTER, newUserDataWithAvatar);

      console.log('USER REGISTRATION DATA: ', data);

      dispatch(setDataLoadingStatus(false));

      return data;
    } catch(err) {
      toast.warn(`Registration ended with error: ${err}`);

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);


export const uploadAvatarAction = createAsyncThunk<string | unknown, FormData, AsyncOptions>(
  APIAction.USER_UPLOAD_AVATAR,
  async (
    avatarFormData, // Avatar Form Data
    { dispatch, rejectWithValue, extra: api } // AsyncOptions
  ) => {
    dispatch(setDataLoadingStatus(true));

    // Аватар нужно загружать отдельно
    if(avatarFormData) {
      try {
        const { data: avatarUrl } = await api.post<string>(ApiRoute.LOAD_FILES, avatarFormData);

        dispatch(setDataLoadingStatus(false));

        return avatarUrl;
      } catch(err) {
        toast.warn(`Can't load your avatar: ${err}`);

        dispatch(setDataLoadingStatus(false));

        return rejectWithValue(err);
      }
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
