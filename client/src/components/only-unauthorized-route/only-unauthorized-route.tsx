import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '@client/src/hooks';
import { getUserAuthStatus } from '@client/src/store/slices/user-process/user-process.selectors';

type UnauthorizedRouteProps = {
  redirectTo?: typeof AppRoute[keyof typeof AppRoute],
  children: ReactElement
};

// Достпу к роуту только для неавторизованных пользователей
export default function OnlyUnauthorizedRoute({ redirectTo = AppRoute.MAIN, children }: UnauthorizedRouteProps): ReactElement {
  const authStatus = useAppSelector(getUserAuthStatus);
  const isUserAuthorized = (authStatus === AuthorizationStatus.AUTH);

  return (
    (isUserAuthorized)
      ? <Navigate to={redirectTo} />
      : children
  );
}
