
import { ReactElement, useState } from 'react';

import { useAppSelector } from '@client/src/hooks';
import { useParams } from 'react-router-dom';
import useTrainingItem from '@client/src/hooks/useTrainingItem';
import useTrainingReviewsList from '@client/src/hooks/useTrainingReviewsList';

import { getTrainingItem, getTrainingItemLoadingStatus } from '@client/src/store/slices/training-process/training-process.selectors';
import { getTrainingReviewsList } from '@client/src/store/slices/training-reviews-process/training-process.selectors';
import { setBodyScrollAvailable } from '@client/src/utils/common';

import Spinner from '@client/src/components/tools/spinner/spinner';
import BackBtn from '@client/src/components/back-btn/back-btn';
import TrainingsVideoPlayer from '@client/src/components/trainings/trainings-video-player/trainings-video-player';
import TrainingsReviews from '../../../components/trainings/trainings-reviews/trainings-reviews';
import Popup from '@client/src/components/popup/popup';
import PopupReview from '@client/src/components/popup/popup-review/popup-review';
import PopupBuy from '@client/src/components/popup/popup-buy/popup-buy';

export default function TrainingsDetail(): ReactElement {
  const params = useParams();
  const trainingId = params.trainingId;
  const [isReviewModalOpened, setIsReviewModalOpened] = useState(false);
  const [isBuyModalOpened, setIsBuyModalOpened] = useState(false);

  if (trainingId) {
    useTrainingItem(trainingId);
    useTrainingReviewsList(trainingId)
  }

  const isTrainingLoading = useAppSelector(getTrainingItemLoadingStatus)
  const trainingItem = useAppSelector(getTrainingItem);
  const trainingItemReviews = useAppSelector(getTrainingReviewsList);

  function handleLeaveReviewBtnClick() {
    setIsReviewModalOpened(true);
    setBodyScrollAvailable(false);
  }

  function handleBuyBtnClick() {
    setIsBuyModalOpened(true);
    setBodyScrollAvailable(false);
  }

  if (!trainingItem) {
    return <></>;
  }

  const {
    trainersName,
    title,
    description,
    rating,
    trainingType,
    trainingDuration,
    calories,
    price,
    discount
  } = trainingItem;

  const trainingPrice = discount ? price - discount : price;

  return (
    <>
      <Popup
        title='Оставить отзыв'
        PopupContentComponent={PopupReview}

        isOpened={isReviewModalOpened}
        onClose={() => setIsReviewModalOpened(false)}
      />

      <Popup
        title='Купить тренировку'
        PopupContentComponent={PopupBuy}

        isOpened={isBuyModalOpened}
        onClose={() => setIsBuyModalOpened(false)}
      />

      <section className="inner-page">
        <div className="container">
          {
            isTrainingLoading && <Spinner />
          }

          {
            !isTrainingLoading &&
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <aside className="reviews-side-bar">

                <BackBtn />

                <h2 className="reviews-side-bar__title">Отзывы</h2>

                {
                  trainingItemReviews && <TrainingsReviews reviewsList={trainingItemReviews.entities} />
                }

                <button className="btn btn--medium reviews-side-bar__button" type="button" onClick={handleLeaveReviewBtnClick}>Оставить отзыв</button>
              </aside>
              <div className="training-card">
                <div className="training-info">
                  <h2 className="visually-hidden">Информация о тренировке</h2>
                  <div className="training-info__header">
                    <div className="training-info__coach">
                      <div className="training-info__photo">
                        <picture>
                          <img src="/img/content/avatars/coaches/photo-1.png" srcSet="img/content/avatars/coaches/photo-1@2x.png 2x" width={64} height={64} alt="Изображение тренера" />
                        </picture>
                      </div>
                      <div className="training-info__coach-info">
                        <span className="training-info__label">Тренер</span>
                        <span className="training-info__name">{trainersName}</span>
                      </div>
                    </div>
                  </div>
                  <div className="training-info__main-content">
                    <form action="#" method="get">
                      <div className="training-info__form-wrapper">
                        <div className="training-info__info-wrapper">
                          <div className="training-info__input training-info__input--training">
                            <label><span className="training-info__label">Название тренировки</span>
                              <input type="text" name="training" defaultValue={title} disabled />
                            </label>
                            <div className="training-info__error">Обязательное поле</div>
                          </div>
                          <div className="training-info__textarea">
                            <label><span className="training-info__label">Описание тренировки</span>
                              <textarea name="description" disabled defaultValue={description} />
                            </label>
                          </div>
                        </div>
                        <div className="training-info__rating-wrapper">
                          <div className="training-info__input training-info__input--rating">
                            <label>
                              <span className="training-info__label">Рейтинг</span>
                              <span className="training-info__rating-icon">
                                <svg width={18} height={18} aria-hidden="true">
                                  <use xlinkHref="#icon-star" />
                                </svg></span>
                              <input type="number" name="rating" defaultValue={rating} disabled />
                            </label>
                          </div>
                          <ul className="training-info__list">
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{trainingType}</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#для_всех</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{calories}ккал</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{trainingDuration}минут</span></div>
                            </li>
                          </ul>
                        </div>

                        <div className="training-info__price-wrapper">
                          <div className="training-info__input training-info__input--price">
                            <label><span className="training-info__label">Стоимость</span>
                              <input type="text" name="price" defaultValue={`${trainingPrice} ₽`} disabled />
                            </label>
                            <div className="training-info__error">Введите число</div>
                          </div>
                          <button className="btn training-info__buy" type="button" onClick={handleBuyBtnClick}>Купить</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <TrainingsVideoPlayer videoURL='' />
              </div>
            </div>
          }
        </div>
      </section>
    </>
  )
}
