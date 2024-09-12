import { MessagesType } from '@server/libs/types';

export const TrainingRequestMessage: MessagesType = {
  ERROR: {
    NOT_FOUND: 'Training request not found',
    CANT_UPDATE: 'Can`t update training request. Possible reason: Object with fields to update are empty',
    HAVENT_ACCESS: 'Sorry, training request is not exists or you haven`t permission to this',
    ALREADY_EXISTS: 'Request for training from this user to this trainer already exists',
  },
  SUCCESS: {
    FOUND: 'Training request found',
    CREATED: 'Training request has been successfully created',
    UPDATED: 'Training request has bees successfully updated',
    DELETED: 'Training request has been successfully deleted',
  },
} as const;