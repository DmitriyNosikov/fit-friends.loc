import { ReactElement } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../header/header';
import { AppRoute } from '@client/src/const';
import PopupReview from '../popup-review/popup-review';
import { useAppSelector } from '@client/src/hooks';
import { getReviewPopupState } from '@client/src/store/slices/main-process/main-process.selectors';

export default function Layout(): ReactElement {
  const location = useLocation();
  const notShowHeaderRoutes = [AppRoute.REGISTRATION, AppRoute.LOGIN] as string[];

  const isReviewPopupShowed = useAppSelector(getReviewPopupState);

  return (
    <>
      {
        isReviewPopupShowed && <PopupReview />
      }

      <div className="wrapper">

        {
          (!notShowHeaderRoutes.includes(location.pathname)) && <Header />
        }

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
