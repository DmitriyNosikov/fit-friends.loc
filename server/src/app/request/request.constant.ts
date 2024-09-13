import { MessagesType } from '@server/libs/types';

export const RequestMessage: MessagesType = {
  ERROR: {
    NOT_FOUND: 'Request not found',
    CANT_UPDATE: 'Can`t update request. Possible reason: Object with fields to update are empty',
    HAVENT_ACCESS: 'Sorry, request is not exists or you haven`t permission to this',
    ALREADY_EXISTS: 'Request for target user from this user already exists',
  },
  SUCCESS: {
    FOUND: 'Training request found',
    CREATED: 'Request has been successfully created',
    UPDATED: 'Request has bees successfully updated',
    DELETED: 'Request has been successfully deleted',
  },
} as const;