import { AppRoute } from '@client/src/const';
import { TrainingType } from '@shared/types/training-type.enum';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

type TrainingsItemProps = {
  item: {
    id: string;
    background: string;
    title: string;
    trainingType: TrainingType,
    calories: number;
    description: string;
    price: number;
    rating: number;
  }
}

// FIXME: Картинка background должна браться из моков по типу тренировки

export default function TrainingsListItem({ item }: TrainingsItemProps): ReactElement {
  const { id, background, title, trainingType, calories, description, price, rating } = item;

  return (
    <>
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <img src={ background } width={330} height={190} alt="" />
            </picture>
          </div>
          <p className="thumbnail-training__price">{ (price >= 0) ? price : 'Бесплатно' }</p>
          <h3 className="thumbnail-training__title">{ title.toUpperCase() }</h3>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#{ trainingType }</span></div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#{ calories }ккал</span></div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width={16} height={16} aria-hidden="true">
                <use xlinkHref="#icon-star" />
              </svg><span className="thumbnail-training__rate-value">{ rating }</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{ description }</p>
          </div>
          <div className="thumbnail-training__button-wrapper">
            <Link className="btn btn--small thumbnail-training__button-catalog" to={`${AppRoute.TRAININGS}/${id}`}>Подробнее</Link>
            <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to={`${AppRoute.TRAININGS}/${id}`}>Отзывы</Link>
          </div>
        </div>
      </div>
    </>
  )
}
