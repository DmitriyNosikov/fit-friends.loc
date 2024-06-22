import { MessagesType } from '@server/libs/types';

export const OrderValidation = {
  TRAININGS_COUNT: {
    MIN: 1,
    MAX: 50,
  },
} as const;

export const OrderMessage: MessagesType = {
  ERROR: {
    NOT_FOUND: 'Orders not found',
    CANT_UPDATE: 'Can`t update order. Possible reason: Object with fields to update are empty',
  },
  SUCCESS: {
    FOUND: 'Order found',
    CREATED: 'Order has been successfully created',
    UPDATED: 'Order has bees successfully updated',
    DELETED: 'Order has been successfully deleted',
  },
} as const;