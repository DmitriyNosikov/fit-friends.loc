import { AppRoute } from '@client/src/const';
import classNames from 'classnames';
import { ReactElement } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

export default function HeaderNav(): ReactElement {
  const location = useLocation();
  const params = useParams();

  const mainPages: string[] = [
    AppRoute.MAIN,
    AppRoute.TRAININGS,
    `${AppRoute.TRAININGS}/${params.trainingId}`
  ];

  const personalAccountPages: string[] = [
    AppRoute.ACCOUNT,
    AppRoute.ORDERS,
    AppRoute.PURCHASES,
    AppRoute.TRAININGS_CREATE,
    `${AppRoute.PERSONAL_CARD}/${params.userId}`
  ];

  const mainClassName = classNames(
    'main-nav__link',
    { 'is-active': mainPages.includes(location.pathname) }
  )

  const accountClassName = classNames(
    'main-nav__link',
    { 'is-active': personalAccountPages.includes(location.pathname) }
  );

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item">
          <Link className={mainClassName} to={AppRoute.MAIN} aria-label="На главную">
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="#icon-home"></use>
            </svg>
          </Link>
        </li>
        <li className="main-nav__item">
          <Link className={accountClassName} to={AppRoute.ACCOUNT} aria-label="Личный кабинет">
            <svg width="16" height="18" aria-hidden="true">
              <use xlinkHref="#icon-user"></use>
            </svg>
          </Link>
        </li>
        {/* <li className="main-nav__item">
        <Link className="main-nav__link" to="#" aria-label="Друзья">
          <svg width="22" height="16" aria-hidden="true">
            <use xlinkHref="#icon-friends"></use>
          </svg>
        </Link>
      </li> */}

        {/* Уведомления */}
        {/* <Notifications /> */}
      </ul>
    </nav>
  )
}
