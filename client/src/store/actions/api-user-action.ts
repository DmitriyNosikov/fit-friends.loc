
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { setDataLoadingStatus } from '../slices/main-process/main-process';
import { setAdditionalInfo, setUserInfoAction } from '../slices/user-process/user-process';

import { AdditionalInfoRDO, CreateUserDTO, LoggedUserRDO, LoginUserDTO, UpdateUserDTO } from '@shared/user';
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
  USER_UPDATE: `${APIUserPrefix}/update`,
  USER_CHECK_AUTH: `${APIUserPrefix}/checkAuth`,
  USER_GET_DETAIL: `${APIUserPrefix}/getDetail`,
  USER_GET_ADDITIONAL: `${APIUserPrefix}/getAdditional`,
  USER_UPLOAD_AVATAR: `${APIUserPrefix}/uploadAvatar`,
} as const;

// ASYNC ACTIONS
export const fetchAdditionalInfoAction = createAsyncThunk<AdditionalInfoRDO, void, AsyncOptions>(
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
export const checkUserAuthAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.USER_CHECK_AUTH,
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setDataLoadingStatus(true));

    try {
      await api.post<TokenPayload>(ApiRoute.CHECK_JWT_TOKEN);

      dispatch(fetchUserDetailInfoAction)
    } catch(error) {
      deleteToken();

      dispatch(setUserInfoAction(null));
      dispatch(redirectToRoute(AppRoute.LOGIN));
    }

    dispatch(setDataLoadingStatus(false));
  }
);

export const registerUserAction = createAsyncThunk<LoggedUserRDO, CreateUserDTO, AsyncOptions>(
  APIAction.USER_REGISTER,
  async (
    newUserData, // New User Data
    { dispatch, rejectWithValue, extra: api } // AsyncOptions
  ) => {
    dispatch(setDataLoadingStatus(true));

    // Аватар нужно загружать отдельно
    let uploadedAvatarUrl = '';
    if(newUserData.avatar) {
      try {
        const { data: avatarUrl } = await api.post<string>(ApiRoute.LOAD_FILES, newUserData.avatar);

        uploadedAvatarUrl = avatarUrl;

      } catch(err) {
        toast.warn(`Can't load your avatar: ${err}`);

        dispatch(setDataLoadingStatus(false));

        return rejectWithValue(err);
      }
    }

    // Регистрация пользователя
    const newUserDataWithAvatar = {
      ...newUserData,
      avatar: uploadedAvatarUrl ?? newUserData.avatar
    };

    try {
      const { data } = await api.post<LoggedUserRDO>(ApiRoute.REGISTER, newUserDataWithAvatar);

      dispatch(setDataLoadingStatus(false));

      return data;
    } catch(err) {
      toast.error(`Registration ended with error: ${err}`);

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);

export const loginUserAction = createAsyncThunk<void, LoginUserDTO, AsyncOptions>(
  APIAction.USER_LOGIN,
  async (
    { email, password }, // AuthData
    { dispatch, rejectWithValue, extra: api } // AsyncOptions
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.post<LoggedUserRDO>(
        ApiRoute.LOGIN,
        { email, password }
      );
      const { accessToken } = data;

      if(!accessToken) {
        throw new Error('Didn`t get access token from server. Please, try again later.');
      }

      setToken(accessToken);

      dispatch(setUserInfoAction(data));
      dispatch(setDataLoadingStatus(false));
    } catch(err) {
      toast.error(`Can't authorize you: ${err}`);

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);

export const updateUserAction = createAsyncThunk<LoggedUserRDO, UpdateUserDTO, AsyncOptions>(
  APIAction.USER_UPDATE,
  async (
    updateUserData, // New User Data
    { dispatch, rejectWithValue, extra: api } // AsyncOptions
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.patch<LoggedUserRDO>(ApiRoute.USER_API, updateUserData);

      dispatch(setUserInfoAction(data));
      dispatch(setDataLoadingStatus(false));

      return data;
    } catch(err) {
      toast.error(`User updating ended with error: ${err}`);

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

export const fetchUserDetailInfoAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.USER_GET_DETAIL,
  async (
    _, // AuthData
    { dispatch, rejectWithValue, extra: api } // AsyncOptions
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<LoggedUserRDO>(`${ApiRoute.USER_API}`);

      console.log('USER DATA: ', data);

      dispatch(setUserInfoAction(data));
      dispatch(setDataLoadingStatus(false));
    } catch(err) {
      toast.warn(`Can't get user's detail info: ${err}`);

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);
