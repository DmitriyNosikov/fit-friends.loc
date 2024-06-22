import { MessagesType } from '@server/libs/types';

export const BalanceMessage: MessagesType = {
  ERROR: {
    NOT_FOUND: 'Balance not found',
    CANT_UPDATE: 'Can`t update order. Possible reason: Object with fields to update are empty',
    HAVENT_ACCESS: 'Sorry, balance is not exists or you haven`t permission to this'
  },
  SUCCESS: {
    FOUND: 'Balance found',
    CREATED: 'Balance has been successfully created',
    UPDATED: 'Balance has bees successfully updated',
    DELETED: 'Balance has been successfully deleted',
  },
} as const;