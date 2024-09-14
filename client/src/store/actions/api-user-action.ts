
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { setDataLoadingStatus } from '../slices/main-process/main-process';
import { setAdditionalInfo, setUserAuthStatus, setCurrentUserInfo, setUserInfo, appendUsersAction, setUsersAction } from '../slices/user-process/user-process';

import { AdditionalInfoRDO, CreateUserDTO, LoggedUserRDO, LoginUserDTO, UpdateUserDTO, UserRDO, UsersWithPaginationRDO } from '@shared/user';
import { redirectToRoute } from '../middlewares/redirect-action';


import { AsyncOptions } from '@client/src/types/async-options.type';


import { ApiRoute, AppRoute, AuthorizationStatus, Namespace } from '@client/src/const';
import { TokenPayload } from '@client/src/types/token-payload';
import { deleteToken, REFRESH_TOKEN_KEY, setToken } from '@client/src/services/token';
import { UploadingFilePayload } from '@client/src/types/payloads';
import { BaseSearchQuery } from '@shared/types';
import { createSearchURL } from '@client/src/utils/adapters';



const APIUserPrefix = `[${Namespace.USER}-BACKEND]`;
const APIAction = {
  // USERS BACKEND
  USER_REGISTER: `${APIUserPrefix}/register`,
  USER_LOGIN: `${APIUserPrefix}/login`,
  USER_UPDATE: `${APIUserPrefix}/update`,

  USER_CHECK_AUTH: `${APIUserPrefix}/check-auth`,
  USER_GET_DETAIL: `${APIUserPrefix}/get-detail`,
  USER_GET_BY_ID: `${APIUserPrefix}/get-by-id`,
  USER_GET_ADDITIONAL: `${APIUserPrefix}/get-additional`,
  USER_UPLOAD_AVATAR: `${APIUserPrefix}/upload-avatar`,
  USER_UPLOAD_CERTIFICATES: `${APIUserPrefix}/upload-certificates`,

  PAGINATION_GET_PAGE: `${APIUserPrefix}/get-pagination-page`,
  SEARCH: `${APIUserPrefix}/search`,
} as const;

// ASYNC ACTIONS
// --- Auth
//---------------------------------------------Return Payload AsyncOptions
export const checkUserAuthAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.USER_CHECK_AUTH,
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const result = await api.post<TokenPayload>(ApiRoute.CHECK_JWT_TOKEN);

      if(!result) {
        return;
      }

      dispatch(fetchUserDetailInfoAction())
    } catch(error) {
      deleteToken();

      dispatch(setUserAuthStatus(AuthorizationStatus.NO_AUTH));
      dispatch(redirectToRoute(AppRoute.INTRO));
    }

    dispatch(setDataLoadingStatus(false));
  }
);

export const fetchUserDetailInfoAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.USER_GET_DETAIL,
  async (
    _, // Data
    { dispatch, rejectWithValue, extra: api } // AsyncOptions
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<LoggedUserRDO>(`${ApiRoute.USER_API}`);

      dispatch(setCurrentUserInfo(data));
      dispatch(setDataLoadingStatus(false));
    } catch(err) {
      toast.warn(`Can't get user's detail info: ${err}. Please, try to login again`);

      dispatch(setDataLoadingStatus(false));
      deleteToken();
      dispatch(setUserAuthStatus(AuthorizationStatus.NO_AUTH));
      dispatch(redirectToRoute(AppRoute.INTRO));

      return rejectWithValue(err);
    }
  }
);

type UserIdPayload = {
  userId: string
}

export const fetchUserByIdAction = createAsyncThunk<UserRDO, UserIdPayload, AsyncOptions>(
  APIAction.USER_GET_BY_ID,
  async (
    { userId },
    { dispatch, rejectWithValue, extra: api } // AsyncOptions
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<UserRDO>(`${ApiRoute.USER_API}/${userId}`);

      dispatch(setUserInfo(data));
      dispatch(setDataLoadingStatus(false));

      return data;
    } catch(err) {
      toast.warn(`Can't get user's detail info: ${err}. Please, try to login again`);

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);

type RegisterUserPayload = CreateUserDTO & UploadingFilePayload;

export const registerUserAction = createAsyncThunk<LoggedUserRDO, RegisterUserPayload, AsyncOptions>(
  APIAction.USER_REGISTER,
  async (
    newUserData, // New User Data
    { dispatch, rejectWithValue, extra: api } // AsyncOptions
  ) => {
    dispatch(setDataLoadingStatus(true));

    // Аватар нужно загружать отдельно
    let uploadedAvatarUrl = '';
    if(newUserData.uploadingFile) {
      try {
        const { data: avatarUrl } = await api.post<string>(ApiRoute.LOAD_FILES, newUserData.uploadingFile);

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
      const { accessToken, refreshToken } = data;

      if(!accessToken) {
        throw new Error('Didn`t get access token from server. Please, try again later.');
      }

      setToken(accessToken);
      setToken(refreshToken, REFRESH_TOKEN_KEY);

      dispatch(setCurrentUserInfo(data));
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

      dispatch(setCurrentUserInfo(data));
      dispatch(setDataLoadingStatus(false));

      toast.success('User has been successfully updated');

      return data;
    } catch(err) {
      toast.error(`Can't update user info: ${err}`);

      dispatch(setDataLoadingStatus(false));

      return rejectWithValue(err);
    }
  }
);

export const uploadAvatarAction = createAsyncThunk<string | unknown, FormData, AsyncOptions>(
  APIAction.USER_UPLOAD_AVATAR,
  async (
    fileFormData, // Avatar Form Data
    { dispatch, rejectWithValue, extra: api } // AsyncOptions
  ) => {
    dispatch(setDataLoadingStatus(true));

    if(fileFormData) {
      try {
        const { data: avatarUrl } = await api.post<string>(ApiRoute.LOAD_FILES, fileFormData);

        dispatch(setDataLoadingStatus(false));

        return avatarUrl;
      } catch(err) {
        toast.warn(`Can't load file: ${err}`);

        dispatch(setDataLoadingStatus(false));

        return rejectWithValue(err);
      }
    }
  }
);

export const uploadCertificateAction = createAsyncThunk<string | unknown, FormData, AsyncOptions>(
  APIAction.USER_UPLOAD_CERTIFICATES,
  async (
    fileFormData, // Files
    { dispatch, rejectWithValue, extra: api } // AsyncOptions
  ) => {
    dispatch(setDataLoadingStatus(true));

    console.log('Files: ', fileFormData);

    if(fileFormData) {
      try {
        const { data } = await api.post<string>(ApiRoute.LOAD_MULTIPLE_FILES, fileFormData);

        dispatch(setDataLoadingStatus(false));

        return data;
      } catch(err) {
        toast.warn(`Can't load file: ${err}`);

        dispatch(setDataLoadingStatus(false));

        return rejectWithValue(err);
      }
    }
  }
);

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
      const { data } = await api.get<UsersWithPaginationRDO>(`${ApiRoute.USER_API}/search/?page=${pageNumber}`);

      dispatch(appendUsersAction(data));
    } catch (err) {
      toast.error(`Cant't get pagination page ${pageNumber}. Error: ${err}`);
    }

    dispatch(setDataLoadingStatus(false));
  }
);

type SearchPayload = {
  searchQuery: BaseSearchQuery,
  appendItems?: boolean
};

export const searchUsersAction = createAsyncThunk<UsersWithPaginationRDO, SearchPayload, AsyncOptions>(
  APIAction.SEARCH,
  async (
    { searchQuery, appendItems },
    { dispatch, rejectWithValue, extra: api }
  ) => {
    dispatch(setDataLoadingStatus(true));

    let url = createSearchURL(`${ApiRoute.USER_API}/search`, searchQuery as Record<string, unknown>);

    // Запрашиваем данные с сервера
    try {
      const { data } = await api.get<UsersWithPaginationRDO>(url);

      if (!data) {
        toast.info('No users found by passed filter');
      }

      if (!appendItems) {
        dispatch(setUsersAction(data));

        dispatch(setDataLoadingStatus(false));
        return data;
      }

      // Если передан параметр appendItems, это значит
      // что результат запроса нужно добавить к текущему
      // состоянию, а не заменить им все состояние, т.е.
      // в данном случае, к текущему списку пользователей добавить
      // полученные от сервера
      dispatch(appendUsersAction(data));

      dispatch(setDataLoadingStatus(false));
      return data;
    } catch (err) {
      toast.error(`Can't get users. Error: ${err}`);

      dispatch(setDataLoadingStatus(false));
      return rejectWithValue(err);
    }
  }
);
