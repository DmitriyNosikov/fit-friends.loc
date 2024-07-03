import { ReactElement } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../header/header';
import { AppRoute } from '@client/src/const';

export default function Layout(): ReactElement {
  const location = useLocation();
  const notShowHeaderRoutes = [AppRoute.REGISTRATION] as string[];

  return (
    <>
      <div className="wrapper">

        {
          (!notShowHeaderRoutes.includes(location.pathname)) && <Header />
        }

        <main className="page-content">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
