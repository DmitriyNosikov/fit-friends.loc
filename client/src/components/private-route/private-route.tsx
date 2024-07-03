import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type PrivateRouteProps = {
  redirectTo?: typeof AppRoute[keyof typeof AppRoute],
  children: ReactElement
};

export default function PrivateRoute({ redirectTo = AppRoute.PAGE_404, children }: PrivateRouteProps): ReactElement {
  // const authStatus = useAppSelector(getUserAuthStatus);
  // const isUserAuthorized = (authStatus === AuthorizationStatus.AUTH);
  const isUserAuthorized = true;

  return (
    (isUserAuthorized)
      ? children
      : <Navigate to={redirectTo} />
  );
}
