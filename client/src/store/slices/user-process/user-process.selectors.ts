import { Namespace } from '@client/src/const';
import { UserStateNamespace } from '@client/src/types/selector';
import { AdditionalInfoRDO, UserRDO, UsersWithPaginationRDO } from '@shared/user';

export function getUserAuthStatus(state: UserStateNamespace): string {
  return state[Namespace.USER].authorizationStatus;
}

export function getCurrentUserInfo(state: UserStateNamespace): UserRDO | null {
  return state[Namespace.USER].currentUserInfo;
}

export function getUserInfo(state: UserStateNamespace): UserRDO | null {
  return state[Namespace.USER].userInfo;
}

export function getAdditionalInfo(state: UserStateNamespace): AdditionalInfoRDO | null {
  return state[Namespace.USER].additionalInfo;
}

export function getUsersList(state: UserStateNamespace): UsersWithPaginationRDO | null {
  return state[Namespace.USER].paginatedUsers;
}

export function getUserFriendsList(state: UserStateNamespace): UsersWithPaginationRDO | null {
  return state[Namespace.USER].userFriends;
}


// Loading statuses
export function getUsersListLoadingStatus(state: UserStateNamespace): boolean {
  return state[Namespace.USER].isUsersLoading;
}

export function getUserFriendsLoadingStatus(state: UserStateNamespace): boolean {
  return state[Namespace.USER].isUserFriendsLoading;
}

export function getAdditionalInfoLoadingStatus(state: UserStateNamespace): boolean {
  return state[Namespace.USER].isAdditionalInfoLoading;
}
