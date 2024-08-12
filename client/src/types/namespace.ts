import { Namespace } from '../const';

export type Namespace = keyof [keyof typeof Namespace];

export type MainNamespace = typeof Namespace.MAIN;
export type UserNamespace = typeof Namespace.USER;
export type TrainingNamespace = typeof Namespace.TRAINING;
export type TrainingReviewsNamespace = typeof Namespace.TRAINING_REVIEWS;
export type OrderNamespace = typeof Namespace.ORDER;
export type BalanceNamespace = typeof Namespace.BALANCE;
