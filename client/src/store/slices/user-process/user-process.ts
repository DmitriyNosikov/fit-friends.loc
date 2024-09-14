import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AdditionalInfoRDO, LoggedUserRDO, UserRDO, UsersWithPaginationRDO } from '@shared/user/';
import { checkUserAuthAction, loginUserAction, searchUsersAction } from '../../actions/api-user-action';

import { AuthorizationStatus, AuthorizationStatusList, Namespace } from '@client/src/const';
import { getToken } from '@client/src/services/token';

export type UserProcess = {
  authorizationStatus: keyof typeof AuthorizationStatus,
  currentUserInfo: LoggedUserRDO | null,
  userInfo: UserRDO | null,
  additionalInfo: AdditionalInfoRDO | null,

  paginatedUsers: UsersWithPaginationRDO | null,
  isUsersLoading: boolean
};


const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  currentUserInfo: null,
  userInfo: null,
  additionalInfo: null,
  paginatedUsers: null,

  isUsersLoading: false
};

export const userProcess = createSlice({
  name: Namespace.USER,
  initialState,
  reducers: {
    setCurrentUserInfo: (state, action: PayloadAction<LoggedUserRDO | null>) => {
      state.currentUserInfo = action.payload;
    },

    setUserInfo: (state, action: PayloadAction<UserRDO | null>) => {
      state.userInfo = action.payload;
    },

    setAdditionalInfo: (state, action: PayloadAction<AdditionalInfoRDO | null>) => {
      state.additionalInfo = action.payload;
    },

    setUserAuthStatus: (state, action: PayloadAction<AuthorizationStatusList>) => {
      state.authorizationStatus = action.payload;
    },

    // Список пользователей
    setUsersAction: (state, action: PayloadAction<UsersWithPaginationRDO | null>) => {
      state.paginatedUsers = action.payload;
    },

    // Добавление пользователей при нажатии а кнопку "Показать еще"
    appendUsersAction: (state, action: PayloadAction<UsersWithPaginationRDO | null>) => {
      const addingUsers = action.payload;

      if(!state.paginatedUsers || !addingUsers) {
        return;
      }

      addingUsers?.entities.forEach((user) => state.paginatedUsers?.entities.push(user));
      state.paginatedUsers.currentPage = addingUsers.currentPage; // Обновляем текущую страницу
    },
  },
  extraReducers(builder) {
    builder
      // CHECK AUTH ACTION STATUSES
      .addCase(checkUserAuthAction.fulfilled, (state) => {
        if(getToken() === '') {
          state.authorizationStatus = AuthorizationStatus.NO_AUTH;
          return;
        }

        state.authorizationStatus = AuthorizationStatus.AUTH;
      })
      .addCase(checkUserAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      })

      // LOGIN ACTION STATUSES
      .addCase(loginUserAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.AUTH;
      })
      .addCase(loginUserAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      })

      // SEARCH USERS
      .addCase(searchUsersAction.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(searchUsersAction.fulfilled, (state) => {
        state.isUsersLoading = false;
      })
      .addCase(searchUsersAction.rejected, (state) => {
        state.isUsersLoading = false;
      })
  },
});

export const {
  setCurrentUserInfo,
  setUserInfo,
  setAdditionalInfo,
  setUserAuthStatus,
  setUsersAction,
  appendUsersAction
} = userProcess.actions;
