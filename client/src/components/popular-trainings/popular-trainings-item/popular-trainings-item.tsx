import { AppRoute } from '@client/src/const';
import { TrainingType } from '@shared/types/training-type.enum';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

type PopularTrainingsItemProps = {
  training: {
    id: string;
    title: string;
    description: string;
    background: string;
    calories: number;
    rating: number;
    price: number;
    discount: number;
    trainingType: TrainingType;
  }
}

export default function PopularTrainingsItem({ training }: PopularTrainingsItemProps): ReactElement {
  const {
    id,
    title,
    description,
    background,
    calories,
    rating,
    price,
    discount,
    trainingType
  } = training;

  const newPrice = discount ? price - discount : price;

  return (
    <li className="popular-trainings__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <img
                src={background}
                width={330}
                height={190}
                alt=""
              />
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
            <Link
              className="btn btn--small thumbnail-training__button-catalog"
              to={`${AppRoute.TRAININGS}/${id}`}
            >
              Подробнее
            </Link>
            <Link
              className="btn btn--small btn--outlined thumbnail-training__button-catalog"
              to={`${AppRoute.TRAININGS}/${id}`}
            >
              Отзывы
            </Link>
          </div>
        </div>
      </div>
    </li>
  )
}
