
import { ReactElement, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@client/src/hooks';
import { useParams } from 'react-router-dom';

import useFetchTrainingItem from '@client/src/hooks/useFetchTrainingItem';
import useFetchTrainingReviewsList from '@client/src/hooks/useFetchTrainingReviewsList';

import { getTrainingItemLoadingStatus } from '@client/src/store/slices/training-process/training-process.selectors';
import { setBodyScrollAvailable } from '@client/src/utils/common';

import Spinner from '@client/src/components/tools/spinner/spinner';
import BackBtn from '@client/src/components/back-btn/back-btn';
import TrainingsVideoPlayer from '@client/src/components/trainings/trainings-video-player/trainings-video-player';
import TrainingsReviews from '../../../components/trainings/trainings-reviews/trainings-reviews';
import Popup from '@client/src/components/popup/popup';
import PopupReview from '@client/src/components/popup/popup-review/popup-review';
import PopupBuy from '@client/src/components/popup/popup-buy/popup-buy';
import useFetchCurrentTrainingBalance from '@client/src/hooks/useFetchCurrentTrainingBalance';
import { changeBalance } from '@client/src/store/actions/api-balance-action';
import { CreateBalanceRDO } from '@shared/balance';


export default function TrainingsDetail(): ReactElement | undefined {
  const params = useParams();
  const trainingId = params.trainingId;
  const dispatch = useAppDispatch();

  if (!trainingId) {
    return;
  }

  const [isReviewModalOpened, setIsReviewModalOpened] = useState(false);
  const [isBuyModalOpened, setIsBuyModalOpened] = useState(false);

  const isTrainingLoading = useAppSelector(getTrainingItemLoadingStatus)
  const trainingItem = useFetchTrainingItem(trainingId);
  const trainingItemReviews = useFetchTrainingReviewsList(trainingId)

  const currentTrainingBalance = useFetchCurrentTrainingBalance(trainingId);

  const [isBeginBtnDisabled, setIsBeginBtnDisabled]  = useState(!currentTrainingBalance || currentTrainingBalance.remainingTrainingsCount <= 0);
  const [isUserCanLeaveReview, setIsUserCanLeaveReview]  = useState( currentTrainingBalance && currentTrainingBalance.hasTrainingStarted);


  function handleLeaveReviewBtnClick() {
    setIsReviewModalOpened(true);
    setBodyScrollAvailable(false);
  }

  function handleBuyBtnClick() {
    setIsBuyModalOpened(true);
    setBodyScrollAvailable(false);
  }

  function handleSuccessPurchase() {
    setIsBeginBtnDisabled(false);
  }

  function handleBeginBtnClick() {
    if(!trainingId) {
      return;
    }

    dispatch(changeBalance({ trainingId, increase: false }))
      .then((result) => {
        const payload = result.payload as CreateBalanceRDO;

        if(!payload) {
          return;
        }

        if(payload.remainingTrainingsCount <= 0) {
          setIsBeginBtnDisabled(true);
        }

        setIsUserCanLeaveReview(true);
      })
  }

  if (!trainingItem) {
    return;
  }

  const {
    trainersName,
    title,
    description,
    video,
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
        PopupContentComponentProps={{
          trainingId: trainingItem.id,
          trainingPrice: trainingItem.price,
        }}

        isOpened={isBuyModalOpened}
        onClose={() => setIsBuyModalOpened(false)}
        onSuccess={handleSuccessPurchase}
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

                {
                  isUserCanLeaveReview &&
                  <button className="btn btn--medium reviews-side-bar__button" type="button" onClick={handleLeaveReviewBtnClick}>Оставить отзыв</button>
                }
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
                            <li className="training-info__item">p
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
                            <label>
                              <span className="training-info__label">Стоимость</span>
                              <input type="text" name="price" defaultValue={`${trainingPrice} ₽`} disabled />
                            </label>
                            <div className="training-info__error">Введите число</div>
                          </div>
                          <button className="btn training-info__buy" type="button" onClick={handleBuyBtnClick} disabled={!isBeginBtnDisabled}>Купить</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <TrainingsVideoPlayer videoURL={video} isBeginBtnDisabled={isBeginBtnDisabled} onBeginClick={handleBeginBtnClick} />
              </div>
            </div>
          }
        </div>
      </section>
    </>
  )
}
