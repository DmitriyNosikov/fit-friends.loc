import { Link } from 'react-router-dom';
import { ReactElement } from 'react';
import { AppRoute } from '@client/src/const';

import { CreateTrainingRDO } from '@shared/training';

import { getTrainingThumbnailByType } from '@client/src/utils/adapters';

type TrainingsSliderItemProps = {
  item: CreateTrainingRDO,
  itemClass?: string
}

export default function TrainingsSliderItem({ item, itemClass }: TrainingsSliderItemProps): ReactElement {
  const {
    id,
    title,
    description,
    calories,
    rating,
    price,
    discount,
    trainingType
  } = item;

  const trainingThumbnail = getTrainingThumbnailByType(trainingType);
  const newPrice = discount ? price - discount : price;

  return (
    <li className={itemClass}>
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source type="image/webp" srcSet={`${trainingThumbnail}.webp, ${trainingThumbnail}@2x.webp 2x`} />
              <img src={`${trainingThumbnail}.jpg`} srcSet={`${trainingThumbnail}@2x.jpg 2x`} width="330" height="190" alt="" />
            </picture>
          </div>
          <p className="thumbnail-training__price">
            <span className="thumbnail-training__price-value">{newPrice}</span>
            <span>₽</span>
          </p>
          <h3 className="thumbnail-training__title">{title}</h3>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>#{trainingType}</span>
                </div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>#{calories}ккал</span>
                </div>
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
            <p className="thumbnail-training__text">
              {description}
            </p>
          </div>
          <div className="thumbnail-training__button-wrapper">
            <Link className="btn btn--small thumbnail-training__button-catalog" to={`${AppRoute.TRAININGS}/${id}`}>
              Подробнее
            </Link>
            <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to={`${AppRoute.TRAININGS}/${id}`}>
              Отзывы
            </Link>
          </div>
        </div>
      </div>
    </li>
  )
}
