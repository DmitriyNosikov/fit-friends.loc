import { ReactElement } from 'react';

export default function Page404(): ReactElement {
  return (
    <section className="inner-page">
      <div className="container">
        <section className="error" style={{ textAlign: 'center' }}>
          <h1 className="error__title">404</h1><span className="error__subtitle">Страница не найдена.</span>
          <p className="error__text"> Возможно, страница была удалена или<br />её вовсе не существовало.</p>
        </section>
      </div>
    </section>
  );
}
