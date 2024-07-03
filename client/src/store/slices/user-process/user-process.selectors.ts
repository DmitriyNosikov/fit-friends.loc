import { Namespace } from '@client/src/const';
import { UserStateNamespace } from '@client/src/types/selector';
import { LoggedUserRDO } from '@shared/user';

export function getUserAuthStatus(state: UserStateNamespace): string {
  return state[Namespace.USER].authorizationStatus;
}

export function getUserInfo(state: UserStateNamespace): LoggedUserRDO | null {
  return state[Namespace.USER].userInfo;
}

