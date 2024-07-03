import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';

import Page404 from '../../pages/page404/page404';
import Login from '@client/src/pages/login/login';
import Registration from '@client/src/pages/registration/registration';
import Main from '@client/src/pages/main/main';

import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';
import OnlyUnauthorizedRoute from '../only-unauthorized-route/only-unauthorized-route';

// TODO: Нужен Helmet для смены заголовков

export default function App(): ReactElement {
  return (
    <Routes>
      <Route path={AppRoute.MAIN} element={<Layout />} >
        <Route index element={
          <PrivateRoute redirectTo={AppRoute.LOGIN}>
            <Main />
          </PrivateRoute>
        } />

        <Route path={AppRoute.LOGIN} element={
          <OnlyUnauthorizedRoute children={
            <Login />
          }/>
        }/>

        <Route path={AppRoute.REGISTRATION} element={
          <OnlyUnauthorizedRoute children={
            <Registration />
          }/>
        }/>

        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}
