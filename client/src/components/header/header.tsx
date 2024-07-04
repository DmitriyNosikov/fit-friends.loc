import { ReactElement } from 'react';
import HeaderNav from './header-nav/header-nav';
import HeaderSearch from './header-search/header-search';

export default function Header(): ReactElement {
  return (
    <header className="header">
      <div className="container"><span className="header__logo">
        <svg width="187" height="70" aria-hidden="true">
          <use xlinkHref="#logo"></use>
        </svg></span>

        <HeaderNav />

        <HeaderSearch />
      </div>
    </header>
  );
}
