import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { getUserAuthStatus } from '@client/src/store/slices/user-process/user-process.selectors';
import { useAppSelector } from '@client/src/hooks';

type PrivateRouteProps = {
  redirectTo?: typeof AppRoute[keyof typeof AppRoute],
  children: ReactElement
};

export default function PrivateRoute({ redirectTo = AppRoute.PAGE_404, children }: PrivateRouteProps): ReactElement {
  const authStatus = useAppSelector(getUserAuthStatus);
  const isUserAuthorized = (authStatus === AuthorizationStatus.AUTH);

  return (
    (isUserAuthorized)
      ? children
      : <Navigate to={redirectTo} />
  );
}
