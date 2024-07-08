import { AxiosInstance } from 'axios';
import { AppDispatch, State } from './state';

export type AsyncOptions = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};
