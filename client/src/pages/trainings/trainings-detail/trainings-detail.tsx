
import { ReactElement, useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@client/src/hooks';
import { useParams } from 'react-router-dom';

import useFetchTrainingItem from '@client/src/hooks/useFetchTrainingItem';

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
import { getUserInfo } from '@client/src/store/slices/user-process/user-process.selectors';
import { UserRoleEnum } from '@shared/types/user-roles.enum';
import classNames from 'classnames';
import { validateFields } from '@client/src/validation/validation-tools';
import { UpdateTrainingDTO } from '@shared/training';
import { updateTrainingValidationSchema } from '@client/src/validation/update-training-validation';
import { updateTrainingAction } from '@client/src/store/actions/api-training-action';
import { toast } from 'react-toastify';


export default function TrainingsDetail(): ReactElement | undefined {
  const params = useParams();
  const trainingId = params.trainingId;
  const dispatch = useAppDispatch();

  if (!trainingId) {
    return;
  }

  const userInfo = useAppSelector(getUserInfo);

  const isTrainer = userInfo?.role === UserRoleEnum.TRAINER;

  const trainingItem = useFetchTrainingItem(trainingId);
  const balance = useFetchCurrentTrainingBalance(trainingId);

  const isTrainingLoading = useAppSelector(getTrainingItemLoadingStatus)

  const [isReviewModalOpened, setIsReviewModalOpened] = useState(false);
  const [isBuyModalOpened, setIsBuyModalOpened] = useState(false);
  const [isBeginBtnDisabled, setIsBeginBtnDisabled] = useState(false);
  const [isUserCanLeaveReview, setIsUserCanLeaveReview] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const titleInput = useRef<HTMLInputElement>(null)
  const descriptionInput = useRef<HTMLTextAreaElement>(null)
  const priceInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsBeginBtnDisabled(!balance || balance.remainingTrainingsCount <= 0);

    setIsUserCanLeaveReview(
      !isTrainer
      && balance !== null
      && balance.hasTrainingStarted
    );

  }, [balance])

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


  function handleEditBtnCLick() {
    setIsEditable(true);
  }

  function handleSaveBtnClick() {
    const updateTrainingData: Record<string, unknown> = {}

    const newTitleValue = titleInput.current?.value;
    const newDescriptionValue = descriptionInput.current?.value;
    const newPriceValue = priceInput.current?.value ? parseInt(priceInput.current.value) : '';

    if (newTitleValue !== title) {
      updateTrainingData['title'] = newTitleValue;
    }

    if (newDescriptionValue !== description) {
      updateTrainingData['description'] = newDescriptionValue;
    }

    if (newPriceValue !== price) {
      updateTrainingData['price'] = newPriceValue;
    }

    const [isFormHasErrors] = validateFields<Partial<UpdateTrainingDTO>>(updateTrainingData, updateTrainingValidationSchema);

    if (isFormHasErrors) {
      return;
    }

    updateTrainingData['trainingId'] = trainingId;

    dispatch(updateTrainingAction(updateTrainingData))
      .then((result) => {
        if ('error' in result) {
          return;
        }

        toast.success('Training has been successfully updated');

        setIsEditable(false);
      })
  }

  function handleBeginBtnClick() {
    if (!trainingId) {
      return;
    }

    dispatch(changeBalance({ trainingId, increase: false }))
      .then((result) => {
        const payload = result.payload as CreateBalanceRDO;

        if (!payload) {
          return;
        }

        if (payload.remainingTrainingsCount <= 0) {
          setIsBeginBtnDisabled(true);
        }

        if (payload.hasTrainingStarted) {
          setIsUserCanLeaveReview(true);
        }
      })
  }

  return (
    <>
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

                <TrainingsReviews trainingId={trainingId} />

                <button
                  className="btn btn--medium reviews-side-bar__button"
                  type="button"
                  disabled={!isUserCanLeaveReview}
                  onClick={handleLeaveReviewBtnClick}
                >Оставить отзыв</button>
              </aside>

              {/* TODO: Вынести в отдельный компонент */}
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

                    {
                      isTrainer &&
                      <>
                        {
                          !isEditable &&
                          <button
                            className="btn-flat btn-flat--light training-info__edit training-info__edit--edit"
                            type="button"
                            onClick={handleEditBtnCLick}
                          >
                            <svg width={12} height={12} aria-hidden="true">
                              <use xlinkHref="#icon-edit" />
                            </svg>
                            <span>Редактировать</span>
                          </button>
                        }

                        {
                          isEditable &&
                          <button
                            className={classNames(
                              'btn-flat btn-flat--light btn-flat--underlined training-info__edit',
                              { 'training-info__edit--save': !isEditable }
                            )}
                            type="button"
                            onClick={handleSaveBtnClick}
                          >
                            <svg width={12} height={12} aria-hidden="true">
                              <use xlinkHref="#icon-edit" />
                            </svg>
                            <span>Сохранить</span>
                          </button>
                        }
                      </>
                    }
                  </div>
                  <div className="training-info__main-content">
                    <form action="#" method="get">
                      <div className="training-info__form-wrapper">
                        <div className="training-info__info-wrapper">
                          <div className="training-info__input training-info__input--training" id="title">
                            <label>
                              <span className="training-info__label">Название тренировки</span>
                              <input type="text" name="training" ref={titleInput} defaultValue={title} disabled={!isEditable} />
                            </label>
                            <div className="training-info__error custom-input__error">Обязательное поле</div>
                          </div>
                          <div className="training-info__textarea" id="description">
                            <label>
                              <span className="training-info__label">Описание тренировки</span>
                              <textarea name="description" ref={descriptionInput} defaultValue={description} disabled={!isEditable} />
                            </label>
                            <div className="training-info__error custom-input__error"></div>
                          </div>
                        </div>
                        <div className="training-info__rating-wrapper">
                          <div className="training-info__input training-info__input--rating">
                            <label>
                              <span className="training-info__label">Рейтинг</span>
                              <span className="training-info__rating-icon">
                                <svg width={18} height={18} aria-hidden="true">
                                  <use xlinkHref="#icon-star" />
                                </svg>
                              </span>
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
                          <div className="training-info__input training-info__input--price" id="price">
                            <label>
                              <span className="training-info__label">Стоимость</span>
                              <input type="text" name="price" ref={priceInput} defaultValue={`${trainingPrice} ₽`} disabled={!isEditable} />
                            </label>
                            <div className="training-info__error custom-input__error">Введите число</div>
                          </div>
                          {
                            !isTrainer &&
                            <button
                              className="btn training-info__buy"
                              type="button"
                              onClick={handleBuyBtnClick}
                              disabled={!isBeginBtnDisabled}
                            >Купить</button>
                          }

                          {
                            isTrainer &&
                            <button className="btn-flat btn-flat--light btn-flat--underlined training-info__discount" type="button">
                              <svg width={14} height={14} aria-hidden="true">
                                <use xlinkHref="#icon-discount" />
                              </svg><span>Сделать скидку 10%</span>
                            </button>
                          }
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <TrainingsVideoPlayer
                  videoURL={video}
                  isBeginBtnDisabled={isBeginBtnDisabled}
                  onBeginClick={handleBeginBtnClick}
                  isEditable={isEditable}
                />
              </div>
            </div>
          }
        </div>
      </section>

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
    </>
  )
}
