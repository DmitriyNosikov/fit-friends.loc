import { Namespace } from '@client/src/const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BalancesWithPaginationRDO, CreateBalanceRDO } from '@shared/balance';

export type BalanceProcess = {
  paginatedBalance: BalancesWithPaginationRDO | null,
  currentTrainingBalance: CreateBalanceRDO | null,

  isBalanceLoading: boolean
}

const initialState: BalanceProcess = {
  currentTrainingBalance: null,
  paginatedBalance: null,

  isBalanceLoading: false
}

export const balanceProcess = createSlice({
  name: Namespace.BALANCE,
  initialState,
  reducers: {
    setBalanceAction: (state, action: PayloadAction<BalancesWithPaginationRDO | null>) => {
      state.paginatedBalance = action.payload;
    },

    setCurrentTrainingBalanceAction: (state, action: PayloadAction<CreateBalanceRDO | null>) => {
      state.currentTrainingBalance = action.payload;
    },

    updateBalanceAction: (state, action: PayloadAction<CreateBalanceRDO>) => {
      const updatedBalance = action.payload;

      if(!state.paginatedBalance || !state.paginatedBalance.entities) {
        return;
      }

      state.paginatedBalance.entities = state.paginatedBalance.entities
        .map((balance) => (balance.id === updatedBalance.id)
          ? updatedBalance
          : balance)
    }
  },

  extraReducers(builder) {}
});


export const {
  setBalanceAction,
  setCurrentTrainingBalanceAction,
  updateBalanceAction
} = balanceProcess.actions;
