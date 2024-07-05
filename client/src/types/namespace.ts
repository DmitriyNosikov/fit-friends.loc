import { Namespace } from '../const';

export type Namespace = keyof [keyof typeof Namespace];

export type MainNamespace = typeof Namespace.MAIN;
export type UserNamespace = typeof Namespace.USER;
export type TrainingNamespace = typeof Namespace.TRAINING;
