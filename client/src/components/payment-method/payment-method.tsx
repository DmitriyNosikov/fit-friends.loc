import { upperCaseFirst } from '@client/src/utils/common';
import { ReactElement } from 'react';

type PaymentMethod = {
  title: string,
  icon: string,
  checked?: boolean
}

type PaymentMethodProps = {
  methods?: PaymentMethod[],
  onChange?: Function
}

export default function PaymentMethod({ methods, onChange }: PaymentMethodProps): ReactElement {

  function handleChangePaymentType(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target;

    if(onChange && 'value' in target) {
      onChange(target.value);
    }
  }

  return (
    <section className="payment-method">
      <h4 className="payment-method__title">Выберите способ оплаты</h4>
      <ul className="payment-method__list">
        {
          methods && methods.map((method) => {
            const isChecked = method.checked ? method.checked : false;

            return (
              <li className="payment-method__item" key={method.title}>
                <div className="btn-radio-image">
                  <label tabIndex={4}>
                    <input
                      type="radio"
                      name="payment-purchases"
                      aria-label={`${upperCaseFirst(method.title)}.`}
                      value={method.title}
                      defaultChecked={isChecked}
                      onChange={handleChangePaymentType}
                    />
                    <span className="btn-radio-image__image">
                      <svg width={58} height={20} aria-hidden="true">
                        <use xlinkHref={method.icon} />
                      </svg>
                    </span>
                  </label>
                </div>
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}
