import { UserInterface } from '@server/user/interfaces';

export type ToggleUserFriendsDTO = {
  userId?: UserInterface['id'],
  targetUserId: UserInterface['id'],
  otherCurrentUser?: UserInterface['id'] // Для возможности удалять друга у произвольного юзера
};