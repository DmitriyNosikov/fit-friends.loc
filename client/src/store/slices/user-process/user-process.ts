import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AdditionalInfoRDO, LoggedUserRDO } from '@shared/user/';
import { checkAuthAction, loginAction } from '../../actions/api-user-action';

import { AuthorizationStatus, Namespace } from '@client/src/const';
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
    }
  },
  extraReducers(builder) {
    builder
      // CHECK AUTH ACTION STATUSES
      .addCase(checkAuthAction.fulfilled, (state) => {
        if(getToken() === '') {
          state.authorizationStatus = AuthorizationStatus.NO_AUTH;
          return;
        }

        state.authorizationStatus = AuthorizationStatus.AUTH;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      })

      // LOGIN ACTION STATUSES
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.AUTH;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      })
  },
});

export const { setUserInfoAction, setAdditionalInfo } = userProcess.actions;
