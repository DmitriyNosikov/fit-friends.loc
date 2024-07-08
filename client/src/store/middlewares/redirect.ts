import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import browserHistory from '../../browser-history';
import { rootReducer } from '../root-reducer';
import { Action } from './redirect-action';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if(action.type === Action.REDIRECT) {
          console.log('Попали в редирект: ', action.type);
          browserHistory.push(action.payload);
        }

        return next(action);
      };
