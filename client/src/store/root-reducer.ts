import { combineReducers } from '@reduxjs/toolkit';
import { Namespace } from '../const';
import { userProcess } from './slices/user-process/user-process';
import { mainProcess } from './slices/main-process/main-process';

export const rootReducer = combineReducers({
  [Namespace.MAIN]: mainProcess.reducer,
  [Namespace.USER]: userProcess.reducer,
});
