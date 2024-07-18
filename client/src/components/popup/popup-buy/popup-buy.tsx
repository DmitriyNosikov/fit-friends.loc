import { ReactElement } from 'react'

type PopupBuyProps = {};

export default function PopupBuy({ }: PopupBuyProps): ReactElement {
  return (
    <div className="popup__content popup__content--purchases">
      <div className="popup__product">
        <div className="popup__product-image">
          <picture>
            <source type="image/webp" srcSet="/img/content/popup/popup-energy.webp, /img/content/popup/popup-energy@2x.webp 2x" />
            <img src="/img/content/popup/popup-energy.jpg" srcSet="/img/content/popup/popup-energy@2x.jpg 2x" width={98} height={80} />
          </picture>
        </div>
        <div className="popup__product-info">
          <h3 className="popup__product-title">energy</h3>
          <p className="popup__product-price">800 ₽</p>
        </div>
        <div className="popup__product-quantity">
          <p className="popup__quantity">Количество</p>
          <div className="input-quantity">
            <button className="btn-icon btn-icon--quantity" type="button" aria-label="minus" tabIndex={2}>
              <svg width={12} height={12} aria-hidden="true">
                <use xlinkHref="#icon-minus" />
              </svg>
            </button>
            <div className="input-quantity__input">
              <label>
                <input type="text" defaultValue={5} size={2} readOnly />
              </label>
            </div>
            <button className="btn-icon btn-icon--quantity" type="button" aria-label="plus" tabIndex={3}>
              <svg width={12} height={12} aria-hidden="true">
                <use xlinkHref="#icon-plus" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <section className="payment-method">
        <h4 className="payment-method__title">Выберите способ оплаты</h4>
        <ul className="payment-method__list">
          <li className="payment-method__item">
            <div className="btn-radio-image">
              <label tabIndex={4}>
                <input type="radio" name="payment-purchases" aria-label="Visa." defaultChecked /><span className="btn-radio-image__image">
                  <svg width={58} height={20} aria-hidden="true">
                    <use xlinkHref="#visa-logo" />
                  </svg></span>
              </label>
            </div>
          </li>
          <li className="payment-method__item">
            <div className="btn-radio-image">
              <label tabIndex={5}>
                <input type="radio" name="payment-purchases" aria-label="Мир." /><span className="btn-radio-image__image">
                  <svg width={66} height={20} aria-hidden="true">
                    <use xlinkHref="#mir-logo" />
                  </svg></span>
              </label>
            </div>
          </li>
          <li className="payment-method__item">
            <div className="btn-radio-image">
              <label tabIndex={6}>
                <input type="radio" name="payment-purchases" aria-label="Iomoney." /><span className="btn-radio-image__image">
                  <svg width={106} height={24} aria-hidden="true">
                    <use xlinkHref="#iomoney-logo" />
                  </svg></span>
              </label>
            </div>
          </li>
        </ul>
      </section>
      <div className="popup__total">
        <p className="popup__total-text">Итого</p>
        <svg className="popup__total-dash" width={310} height={2} aria-hidden="true">
          <use xlinkHref="#dash-line" />
        </svg>
        <p className="popup__total-price">4&nbsp;000&nbsp;₽</p>
      </div>
      <div className="popup__button">
        <button className="btn popup__button_send" type="button" tabIndex={7} autoFocus>Купить</button>
      </div>
    </div>
  )
}
