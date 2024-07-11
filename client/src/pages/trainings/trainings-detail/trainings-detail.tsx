import BackBtn from '@client/src/components/back-btn/back-btn';
import { ReactElement, useState } from 'react';
import TrainingsReviews from '../../../components/trainings/trainings-reviews/trainings-reviews';
import { useAppSelector } from '@client/src/hooks';
import { useParams } from 'react-router-dom';
import { getTrainingItem, getTrainingItemLoadingStatus } from '@client/src/store/slices/training-process/training-process.selectors';
import Spinner from '@client/src/components/tools/spinner/spinner';
import useTrainingItem from '@client/src/hooks/useTrainingItem';
import useTrainingReviewsList from '@client/src/hooks/useTrainingReviewsList';
import { getTrainingReviewsList } from '@client/src/store/slices/training-reviews-process/training-process.selectors';

import { setBodyScrollAvailable } from '@client/src/utils/common';
import PopupReview from '@client/src/components/popup-review/popup-review';
import Popup from '@client/src/components/popup/popup';

export default function TrainingsDetail(): ReactElement {
  const params = useParams();
  const trainingId = params.trainingId;
  const [isModalOpened, setIsModalOpened] = useState(false);

  if (trainingId) {
    useTrainingItem(trainingId);
    useTrainingReviewsList(trainingId)
  }

  const isTrainingLoading = useAppSelector(getTrainingItemLoadingStatus)
  const trainingItem = useAppSelector(getTrainingItem);
  const trainingItemReviews = useAppSelector(getTrainingReviewsList);

  function handleLeaveReviewBtnClick() {
    setIsModalOpened(true);
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
      <Popup isOpened={isModalOpened}>
        <PopupReview onClose={() => setIsModalOpened(false)} />
      </Popup>

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
                          <button className="btn training-info__buy" type="button">Купить</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="training-video">
                  <h2 className="training-video__title">Видео</h2>
                  <div className="training-video__video">
                    <div className="training-video__thumbnail">
                      <picture>
                        <source type="image/webp" srcSet="/img/content/training-video/video-thumbnail.webp, /img/content/training-video/video-thumbnail@2x.webp 2x" />
                        <img src="/img/content/training-video/video-thumbnail.png" srcSet="/img/content/training-video/video-thumbnail@2x.png 2x" width="922" height="566" alt="Обложка видео" />
                      </picture>
                    </div>
                    <button className="training-video__play-button btn-reset">
                      <svg width={18} height={30} aria-hidden="true">
                        <use xlinkHref="#icon-arrow" />
                      </svg>
                    </button>
                  </div>
                  <div className="training-video__buttons-wrapper">
                    <button className="btn training-video__button training-video__button--start" type="button" disabled>Приступить</button>
                    <button className="btn training-video__button training-video__button--stop" type="button">Закончить</button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </section>
    </>
  )
}
