import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AdditionalInfoRDO, LoggedUserRDO, UserRDO } from '@shared/user/';
import { checkUserAuthAction, loginUserAction } from '../../actions/api-user-action';

import { AuthorizationStatus, AuthorizationStatusList, Namespace } from '@client/src/const';
import { getToken } from '@client/src/services/token';

export type UserProcess = {
  authorizationStatus: keyof typeof AuthorizationStatus,
  currentUserInfo: LoggedUserRDO | null,
  userInfo: UserRDO | null,
  additionalInfo: AdditionalInfoRDO | null
};


const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  currentUserInfo: null,
  userInfo: null,
  additionalInfo: null,
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
    }
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
  },
});

export const {
  setCurrentUserInfo,
  setUserInfo,
  setAdditionalInfo,
  setUserAuthStatus
} = userProcess.actions;
