import { combineReducers } from '@reduxjs/toolkit';
import { Namespace } from '../const';

// Reducers
import { userProcess } from './slices/user-process/user-process';
import { mainProcess } from './slices/main-process/main-process';
import { trainingProcess } from './slices/training-process/training-process';
import { trainingReviewsProcess } from './slices/training-reviews-process/training-reviews-process';
import { orderProcess } from './slices/order-process/order-process';
import { balanceProcess } from './slices/balance-process/balance-process';
import { requestProcess } from './slices/request-process/request-process';

export const rootReducer = combineReducers({
  [Namespace.MAIN]: mainProcess.reducer,
  [Namespace.USER]: userProcess.reducer,
  [Namespace.TRAINING]: trainingProcess.reducer,
  [Namespace.TRAINING_REVIEWS]: trainingReviewsProcess.reducer,
  [Namespace.ORDER]: orderProcess.reducer,
  [Namespace.BALANCE]: balanceProcess.reducer,
  [Namespace.REQUEST]: requestProcess.reducer,
});
