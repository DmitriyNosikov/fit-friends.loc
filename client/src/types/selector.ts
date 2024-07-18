import {
  BalanceNamespace,
  MainNamespace,
  OrderNamespace,
  TrainingNamespace,
  TrainingReviewsNamespace,
  UserNamespace
} from './namespace';
import { State } from './state';

export type MainStateNamespace = Pick<State, MainNamespace>;
export type UserStateNamespace = Pick<State, UserNamespace>;
export type TrainingStateNamespace = Pick<State, TrainingNamespace>;
export type TrainingReviewsStateNamespace = Pick<State, TrainingReviewsNamespace>;
export type OrderStateNamespace = Pick<State, OrderNamespace>;
export type BalanceStateNamespace = Pick<State, BalanceNamespace>;
