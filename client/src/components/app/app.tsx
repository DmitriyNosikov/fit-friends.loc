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
import Intro from '@client/src/pages/intro/intro';
import PersonalAccount from '../../pages/personal-account/personal-account';
import TrainingsDetail from '../../pages/trainings/trainings-detail/trainings-detail';
import Trainings from '@client/src/pages/trainings/trainings';
import Orders from '@client/src/pages/orders/orders';
import Purchases from '@client/src/pages/purchases/purchases';
import TrainingsCreate from '@client/src/pages/trainings/trainings-create/trainings-create';
import PersonalCard from '@client/src/pages/personal-card/personal-card';
import Users from '@client/src/pages/ users/users';
import Friends from '@client/src/pages/friends/friends';

// TODO: Нужен Helmet для смены заголовков

export default function App(): ReactElement {
  return (
    <Routes>
      <Route path={AppRoute.MAIN} element={<Layout />} >
        <Route index element={
          <PrivateRoute redirectTo={AppRoute.INTRO}>
            <Main />
          </PrivateRoute>
        } />

        <Route path={AppRoute.INTRO} element={
          <OnlyUnauthorizedRoute children={
            <Intro />
          } />
        } />

        <Route path={AppRoute.LOGIN} element={
          <OnlyUnauthorizedRoute children={
            <Login />
          } />
        } />

        <Route path={AppRoute.REGISTRATION} element={
          <OnlyUnauthorizedRoute children={
            <Registration />
          } />
        } />

        <Route path={AppRoute.ACCOUNT} element={
          <PrivateRoute redirectTo={AppRoute.INTRO}>
            <PersonalAccount />
          </PrivateRoute>
        } />

        <Route path={`${AppRoute.PERSONAL_CARD}/:userId`} element={
          <PrivateRoute redirectTo={AppRoute.INTRO}>
            <PersonalCard />
          </PrivateRoute>
        } />

        <Route path={AppRoute.USERS} element={
          <PrivateRoute redirectTo={AppRoute.INTRO}>
            <Users />
          </PrivateRoute>
        } />

        <Route path={AppRoute.FRIENDS} element={
          <PrivateRoute redirectTo={AppRoute.INTRO}>
            <Friends />
          </PrivateRoute>
        } />

        <Route path={`${AppRoute.TRAININGS}`} element={
          <PrivateRoute redirectTo={AppRoute.INTRO}>
            <Trainings />
          </PrivateRoute>
        } />

        <Route path={`${AppRoute.TRAININGS_CREATE}`} element={
          <PrivateRoute redirectTo={AppRoute.INTRO}>
            <TrainingsCreate />
          </PrivateRoute>
        } />

        <Route path={`${AppRoute.TRAININGS}/:trainingId`} element={
          <PrivateRoute redirectTo={AppRoute.INTRO}>
            <TrainingsDetail />
          </PrivateRoute>
        } />

        <Route path={`${AppRoute.PURCHASES}`} element={
          <PrivateRoute redirectTo={AppRoute.INTRO}>
            <Purchases />
          </PrivateRoute>
        } />

        <Route path={`${AppRoute.ORDERS}`} element={
          <PrivateRoute redirectTo={AppRoute.INTRO}>
            <Orders />
          </PrivateRoute>
        } />

        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}
