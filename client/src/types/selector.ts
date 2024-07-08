import {
  MainNamespace,
  TrainingNamespace,
  TrainingReviewsNamespace,
  UserNamespace
} from './namespace';
import { State } from './state';

export type MainStateNamespace = Pick<State, MainNamespace>;
export type UserStateNamespace = Pick<State, UserNamespace>;
export type TrainingStateNamespace = Pick<State, TrainingNamespace>;
export type TrainingReviewsStateNamespace = Pick<State, TrainingReviewsNamespace>;
