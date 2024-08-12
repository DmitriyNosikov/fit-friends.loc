import { ReactElement, useState } from 'react';
import BackBtn from '@client/src/components/back-btn/back-btn';
import PurchasesList from '@client/src/components/purchases/purchases/purchases-list';

export default function Purchases(): ReactElement {
  const [showOnlyActive, setShowOnlyActive] = useState(false);

  function handleShowOnlyActiveToggle(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    setShowOnlyActive(target.checked);
  }

  return (
    <section className="my-purchases">
      <div className="container">
        <div className="my-purchases__wrapper">

          <BackBtn />

          <div className="my-purchases__title-wrapper">
            <h1 className="my-purchases__title">Мои покупки</h1>

            <div className="my-purchases__controls">
              <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch" data-validate-type="checkbox">
                <label>
                  <input type="checkbox" value="user-agreement-1" name="user-agreement" onChange={handleShowOnlyActiveToggle} />
                  <span className="custom-toggle__icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-check"></use>
                    </svg>
                  </span>
                  <span className="custom-toggle__label">Только активные</span>
                </label>
              </div>
            </div>
          </div>

          <PurchasesList showOnlyActive={showOnlyActive} />
        </div>
      </div>
    </section>

  )
}
