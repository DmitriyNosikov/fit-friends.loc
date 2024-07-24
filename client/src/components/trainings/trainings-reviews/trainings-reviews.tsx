import { DEFAULT_AVATAR_URL } from '@client/src/const';
import { CreateTrainingReviewRDO } from '@shared/training-review';
import { ReactElement } from 'react';

type TrainingsReviewsProps = {
  reviewsList: CreateTrainingReviewRDO[],
}

export default function TrainingsReviews({ reviewsList }: TrainingsReviewsProps): ReactElement {
  return (
    <ul className="reviews-side-bar__list">
      {
        reviewsList && reviewsList.map((review) => {
          const { userInfo, rating, text } = review;

          // const userAvatar = userInfo?.avatar ?? userInfo?.avatar ? `${BASE_URL}${userInfo?.avatar}` : DEFAULT_AVATAR_URL; // Заготовка под загрузку аватарки с сервера
          const userAvatar = userInfo?.avatar ? userInfo?.avatar : DEFAULT_AVATAR_URL;

          return (
            <li className="reviews-side-bar__item" key={review.id}>
              <div className="review">
                <div className="review__user-info">
                  <div className="review__user-photo">
                    <picture>
                      <img src={userAvatar} srcSet={userAvatar} width={64} height={64} alt="Изображение пользователя" />
                    </picture>
                  </div><span className="review__user-name">{userInfo?.name}</span>
                  <div className="review__rating">
                    <svg width={16} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-star" />
                    </svg>
                    <span>{rating}</span>
                  </div>
                </div>
                <p className="review__comment">{text}</p>
              </div>
            </li>
          )
        })
      }
    </ul>
  )
}
