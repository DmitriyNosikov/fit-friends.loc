import { ReactElement } from 'react';

import { AppRoute, DEFAULT_AVATAR_URL } from '@client/src/const';
import { BASE_URL } from '@client/src/services/api';

import useFetchTrainingReviewsList from '@client/src/hooks/useFetchTrainingReviewsList';
import Spinner from '../../tools/spinner/spinner';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useAppSelector } from '@client/src/hooks';
import { getTrainingsReviewsLoadingStatus } from '@client/src/store/slices/training-reviews-process/training-process.selectors';
import { Link } from 'react-router-dom';

const REVIEWS_CONTAINER_MAX_HEIGHT = 976;

type TrainingsReviewsProps = {
  trainingId: string;
}

export default function TrainingsReviews({ trainingId }: TrainingsReviewsProps): ReactElement {
  const trainingItemReviews = useFetchTrainingReviewsList(trainingId);
  const isReviewsLoading = useAppSelector(getTrainingsReviewsLoadingStatus);

  if (isReviewsLoading) {
    return <Spinner />
  }

  if (!trainingItemReviews?.entities) {
    return <div>У тренировки пока нет ни одного отзыва</div>
  }

  const reviewsList = [...trainingItemReviews.entities].sort((a, b) => {
    if (!a.createdAt || !b.createdAt) {
      return 0;
    }

    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB.getTime() - dateA.getTime();
  });

  return (
    <ul className="reviews-side-bar__list">
      <SimpleBar style={{ maxHeight: REVIEWS_CONTAINER_MAX_HEIGHT }}>
        {
          reviewsList && reviewsList.map((review) => {
            const { userInfo, rating, text } = review;

            const avatarImg = userInfo?.avatar;

            const userAvatar = avatarImg
              ? avatarImg.startsWith('/static') // Путь к загруженным на сервер аватаркам начинается с /static
                ? `${BASE_URL}${avatarImg}` // Для аватарок, загруженных на сервер юзерами
                : avatarImg // Для моковых изображений, которыя "захардкожены" в сидировании
              : DEFAULT_AVATAR_URL; // Если аватарки нет

            return (
              <li className="reviews-side-bar__item" key={review.id}>
                <div className="review">
                  <div className="review__user-info">
                    <div className="review__user-photo">
                      <Link to={AppRoute.PERSONAL_CARD}>
                        <picture>
                          <img src={userAvatar} srcSet={userAvatar} width={64} height={64} alt="Изображение пользователя" />
                        </picture>
                      </Link>
                    </div>
                    <span className="review__user-name">{userInfo?.name}</span>
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
      </SimpleBar>
    </ul>
  )
}
