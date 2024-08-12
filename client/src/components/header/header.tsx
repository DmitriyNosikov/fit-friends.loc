import { ReactElement } from 'react';
import HeaderNav from './header-nav/header-nav';
import HeaderSearch from './header-search/header-search';
import { Link } from 'react-router-dom';
import { AppRoute } from '@client/src/const';

export default function Header(): ReactElement {
  return (
    <header className="header">
      <div className="container">
        <span className="header__logo">
          <Link to={AppRoute.MAIN}>
            <svg width="187" height="70" aria-hidden="true">
              <use xlinkHref="#logo"></use>
            </svg>
          </Link>
        </span>

        <HeaderNav />

        <HeaderSearch />
      </div>
    </header>
  );
}
