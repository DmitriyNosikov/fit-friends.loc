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

    // Добавление балансов при нажатии а кнопку "Показать еще"
    appendBalanceAction: (state, action: PayloadAction<BalancesWithPaginationRDO | null>) => {
      const addingBalance = action.payload;

      if(!state.paginatedBalance || !addingBalance) {
        return;
      }

      addingBalance?.entities.forEach((item) => state.paginatedBalance?.entities.push(item));
      state.paginatedBalance.currentPage = addingBalance.currentPage; // Обновляем текущую страницу
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
  appendBalanceAction,
  updateBalanceAction
} = balanceProcess.actions;
