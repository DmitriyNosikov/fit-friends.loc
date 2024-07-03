import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/header';

export default function Layout(): ReactElement {
  return (
    <>
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
