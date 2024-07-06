import { ReactElement } from 'react';

type SpecialOffersItemProps = {
  training: {
    title: string;
    background: string;
    description: string;
    price: number;
    discount: number;
  }
};

export default function SpecialOffersItem({ training }: SpecialOffersItemProps): ReactElement {
  console.log('TRAINING WITH DISCOUNT: ', training);
  const { title, background, description, price, discount } = training;

  const newPrice: number = price - discount;

  return (
    <li className="special-offers__item is-active">
      <aside className="promo-slider">
        <div className="promo-slider__overlay" />
        <div className="promo-slider__image">
          <img
            src={background}
            width={1040}
            height={469}
            alt="promo-photo"
          />
        </div>
        <div className="promo-slider__header">
          <h3 className="promo-slider__title">{title.toUpperCase()}</h3>
          <div className="promo-slider__logo">
            <svg width={74} height={74} aria-hidden="true">
              <use xlinkHref="#logotype" />
            </svg>
          </div>
        </div>
        <span className="promo-slider__text">
          {description}
        </span>

        <div className="promo-slider__bottom-container">
          <div className="promo-slider__price-container">
            <p className="promo-slider__price">{newPrice} ₽</p>
            <p className="promo-slider__sup">за занятие</p>
            <p className="promo-slider__old-price">{price} ₽</p>
          </div>
        </div>
      </aside>
    </li>
  )
}
