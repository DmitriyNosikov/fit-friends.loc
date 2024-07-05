import { MainNamespace, TrainingNamespace, UserNamespace } from './namespace';
import { State } from './state';

export type MainStateNamespace = Pick<State, MainNamespace>;
export type UserStateNamespace = Pick<State, UserNamespace>;
export type TrainingStateNamespace = Pick<State, TrainingNamespace>;
