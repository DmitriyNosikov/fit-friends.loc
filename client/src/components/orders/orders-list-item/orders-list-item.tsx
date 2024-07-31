import { AppRoute } from '@client/src/const';
import { CreateOrderRDO } from '@shared/order'
import { CreateTrainingRDO } from '@shared/training';
import { Link } from 'react-router-dom';

type OrdersListItemProps = {
  order: CreateOrderRDO
}

export default function OrdersListItem({ order }: OrdersListItemProps) {
  const {
    id,
    background,
    price,
    title,
    trainingType,
    calories,
    rating,
    description
  } = order.trainingInfo as CreateTrainingRDO;
  const { trainingsCount, totalPrice } = order;

  return (
    <li className="my-orders__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <img src={background} width={330} height={190} alt="" />
            </picture>
          </div>
          <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">{ price }</span><span>₽</span>
          </p>
          <h2 className="thumbnail-training__title">{ title }</h2>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>#{ trainingType }</span>
                </div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#{ calories }ккал</span></div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width={16} height={16} aria-hidden="true">
                <use xlinkHref="#icon-star" />
              </svg>
              <span className="thumbnail-training__rate-value">{ rating }</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{ description }</p>
          </div>
          <Link className="btn-flat btn-flat--underlined thumbnail-training__button-orders" to={ `${AppRoute.TRAININGS}/${id}` }>
            <svg width={18} height={18} aria-hidden="true">
              <use xlinkHref="#icon-info" />
            </svg>
            <span>Подробнее</span>
          </Link>
        </div>
        <div className="thumbnail-training__total-info">
          <div className="thumbnail-training__total-info-card">
            <svg width={32} height={32} aria-hidden="true">
              <use xlinkHref="#icon-chart" />
            </svg>
            <p className="thumbnail-training__total-info-value">{ trainingsCount }</p>
            <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
          </div>
          <div className="thumbnail-training__total-info-card">
            <svg width={31} height={28} aria-hidden="true">
              <use xlinkHref="#icon-wallet" />
            </svg>
            <p className="thumbnail-training__total-info-value">{ totalPrice }<span>₽</span></p>
            <p className="thumbnail-training__total-info-text">Общая сумма</p>
          </div>
        </div>
      </div>
    </li>
  )
}
