import { AppRoute } from '@client/src/const';
import { CreateBalanceRDO } from '@shared/balance';
import { CreateTrainingRDO } from '@shared/training';
import { Link } from 'react-router-dom';

type PurchasesListItemProps = {
  purchase: CreateBalanceRDO
}

export default function PurchasesListItem({ purchase }: PurchasesListItemProps) {
  const {
    id,
    background,
    price,
    title,
    trainingType,
    calories,
    rating,
    description
  } = purchase.trainingInfo as CreateTrainingRDO;

  return (
    <li className="my-purchases__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <img src={background} width={330} height={190} alt={title} />
            </picture>
          </div>
          <p className="thumbnail-training__price">
            <span className="thumbnail-training__price-value">{price}</span><span>₽</span>
          </p>
          <h2 className="thumbnail-training__title">{title}</h2>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#{trainingType}</span></div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#{calories}ккал</span></div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width={16} height={16} aria-hidden="true">
                <use xlinkHref="#icon-star" />
              </svg>
              <span className="thumbnail-training__rate-value">{rating}</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{description}</p>
          </div>
          <div className="thumbnail-training__button-wrapper">
            <Link className="btn btn--small thumbnail-training__button-catalog" to={`${AppRoute.TRAININGS}/${id}`}>Подробнее</Link>
            <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to={`${AppRoute.TRAININGS}/${id}`}>Отзывы</Link>
          </div>
        </div>
      </div>
    </li>
  )
}
