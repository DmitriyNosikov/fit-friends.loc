import { Namespace } from '@client/src/const';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type MainProcess = {
  isDataLoading: boolean
};

const initialState: MainProcess = {
  isDataLoading: false
};


export const mainProcess = createSlice({
  name: Namespace.MAIN,
  initialState,
  reducers: {
    setDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isDataLoading = action.payload;
    }
  }
});

export const { setDataLoadingStatus } = mainProcess.actions;
