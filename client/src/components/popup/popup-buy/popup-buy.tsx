import { ReactElement, useState } from 'react'
import PaymentMethod from '../../payment-method/payment-method';
import Counter from '../../counter/counter';

type PopupBuyProps = {
  trainingId: string,
  trainingPrice: number
};

export default function PopupBuy({ trainingId, trainingPrice }: PopupBuyProps): ReactElement {
  const [totalPrice, setTotalPrice] = useState(trainingPrice);
  const [paymentType, setPaymentType] = useState('visa');

  function handleCountChange(count: number) {
    setTotalPrice(trainingPrice * count);
  }

  function handleChangePaymentType(type: string) {
    setPaymentType(type);
  }

  function handleSendBtnClick() {
    console.log('Id: ', trainingId, ' total price: ', totalPrice, ' payment type: ', paymentType);
  }

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
          <p className="popup__product-price">{trainingPrice} ₽</p>
        </div>

        <Counter onChange={handleCountChange} />
      </div>

      <PaymentMethod
        methods={[
          {
            title: 'visa',
            icon: '#visa-logo',
            checked: true
          },
          {
            title: 'мир',
            icon: '#mir-logo',
          },
          {
            title: 'iomoney',
            icon: '#iomoney-logo',
          },
        ]}

        onChange={handleChangePaymentType}
      />

      <div className="popup__total">
        <p className="popup__total-text">Итого</p>
        <svg className="popup__total-dash" width={310} height={2} aria-hidden="true">
          <use xlinkHref="#dash-line" />
        </svg>
        <p className="popup__total-price">{totalPrice}&nbsp;₽</p>
      </div>
      <div className="popup__button">
        <button className="btn popup__button_send" type="button" tabIndex={7} autoFocus onClick={handleSendBtnClick}>Купить</button>
      </div>
    </div>
  )
}
