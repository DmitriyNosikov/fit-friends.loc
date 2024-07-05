import { combineReducers } from '@reduxjs/toolkit';
import { Namespace } from '../const';

// Reducers
import { userProcess } from './slices/user-process/user-process';
import { mainProcess } from './slices/main-process/main-process';
import { trainingProcess } from './slices/training-process/training-process';

export const rootReducer = combineReducers({
  [Namespace.MAIN]: mainProcess.reducer,
  [Namespace.USER]: userProcess.reducer,
  [Namespace.TRAINING]: trainingProcess.reducer,
});
