import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AdditionalInfoRDO, LoggedUserRDO } from '@shared/user/';
import { checkUserAuthAction, loginUserAction } from '../../actions/api-user-action';

import { AuthorizationStatus, AuthorizationStatusList, Namespace } from '@client/src/const';
import { getToken } from '@client/src/services/token';

export type UserProcess = {
  authorizationStatus: keyof typeof AuthorizationStatus,
  userInfo: LoggedUserRDO | null,
  additionalInfo: AdditionalInfoRDO | null
};


const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  userInfo: null,
  additionalInfo: null,
};

export const userProcess = createSlice({
  name: Namespace.USER,
  initialState,
  reducers: {
    setUserInfoAction: (state, action: PayloadAction<LoggedUserRDO | null>) => {
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

export const { setUserInfoAction, setAdditionalInfo, setUserAuthStatus } = userProcess.actions;
