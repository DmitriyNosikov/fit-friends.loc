import classNames from 'classnames';
import { ReactElement } from 'react';
import { toast } from 'react-toastify';

import { useAppSelector } from '@client/src/hooks';
import useSearchTrainings from '@client/src/hooks/useSearchTrainings';
import { getTrainingsListLoadingStatus } from '@client/src/store/slices/training-process/training-process.selectors';

import { AppRoute, ITEMS_PER_PAGE } from '@client/src/const';
import { DEFAULT_TRAININGS_SORT_TYPE } from '../../trainings/trainings-list/trainings-list';

import { UserRDO } from '@shared/user';
import { TrainingSearchQuery } from '@shared/training';

import { upperCaseFirst } from '@client/src/utils/common';
import Spinner from '../../tools/spinner/spinner';
import Stub from '../../tools/stub/stub';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';
import { Link } from 'react-router-dom';
import TrainingsSlider from '../../trainings/trainings-slider/trainings-slider';

const START_PAGE = 1;

type PersonalCardTrainerProps = {
  userInfo: UserRDO
}

export default function PersonalCardTrainer({ userInfo }: PersonalCardTrainerProps): ReactElement {
  const { name, location, isReadyToTraining, description, trainingType, level } = userInfo;
  const statusText = userInfo?.isReadyToTraining ? 'Готов тренировать' : 'Не готов тренировать';

  let searchQuery: TrainingSearchQuery = {
    page: START_PAGE,
    limit: ITEMS_PER_PAGE,
    userId: userInfo.id,
    sortType: DEFAULT_TRAININGS_SORT_TYPE,
  };


  const trainingsList = useSearchTrainings(searchQuery);
  const isTrainingsLoadings = useAppSelector(getTrainingsListLoadingStatus);

  function handleShowCertificatesClick() {
    toast.info('Viewing certificates is not implemented yet')
  }

  function handleAddToFriendsBtnCLick() {
    toast.info('Adding to friends is not implemented yet.');
  }

  return (
    <section className="user-card-coach">
      <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
      <div className="user-card-coach__wrapper">
        <div className="user-card-coach__card">
          <div className="user-card-coach__content">
            <div className="user-card-coach__head">
              <h2 className="user-card-coach__title">{name}</h2>
            </div>
            <div className="user-card-coach__label">
              <a href="popup-user-map.html">
                <svg className="user-card-coach__icon-location" width={12} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-location" />
                </svg>
                <span>{upperCaseFirst(location)}</span>
              </a>
            </div>
            <div className="user-card-coach__status-container">
              <div className="user-card-coach__status user-card-coach__status--tag">
                <svg className="user-card-coach__icon-cup" width={12} height={13} aria-hidden="true">
                  <use xlinkHref="#icon-cup" />
                </svg><span>Тренер</span>
              </div>
              <div className={classNames(
                'user-card-coach__status user-card-coach__status--check',
                { 'user-card__status--disabled': !isReadyToTraining }
              )
              }>
                <span>{statusText}</span>
              </div>
            </div>
            <div className="user-card-coach__text">{description}</div>

            {/* TODO: Реализовать просмотр сертификатов */}
            <button className="btn-flat user-card-coach__sertificate" type="button" onClick={handleShowCertificatesClick}>
              <svg width={12} height={13} aria-hidden="true">
                <use xlinkHref="#icon-teacher" />
              </svg><span>Посмотреть сертификаты</span>
            </button>

            {/* Хэштеги */}
            <ul className="user-card-coach__hashtag-list">
              {
                trainingType && trainingType.map((type, index) => {
                  return (
                    <li className="user-card-coach__hashtag-item" key={`${type}.${index}`}>
                      <div className="hashtag"><span>#{type}</span></div>
                    </li>
                  )
                })
              }
            </ul>
            <button className="btn user-card-coach__btn" type="button" disabled onClick={handleAddToFriendsBtnCLick}>Добавить в друзья</button>
          </div>

          <div className="user-card-coach__gallary">
            <ul className="user-card-coach__gallary-list">
              <li className="user-card-coach__gallary-item">
                <img src="/img/content/user-coach-photo1.jpg" srcSet="img/content/user-coach-photo1@2x.jpg 2x" width={334} height={573} alt="photo1" />
              </li>
              <li className="user-card-coach__gallary-item">
                <img src="/img/content/user-coach-photo2.jpg" srcSet="img/content/user-coach-photo2@2x.jpg 2x" width={334} height={573} alt="photo2" />
              </li>
            </ul>
          </div>
        </div>

        <div className="user-card-coach__training">
          <div className="user-card-coach__training-head">
            <h2 className="user-card-coach__training-title">Тренировки</h2>
            <div className="user-card-coach__training-bts">
              <button className="btn-icon user-card-coach__training-btn user-card-coach__training-btn--prev" type="button" aria-label="back">
                <svg width={14} height={10} aria-hidden="true">
                  <use xlinkHref="#arrow-left" />
                </svg>
              </button>
              <button className="btn-icon user-card-coach__training-btn user-card-coach__training-btn--next" type="button" aria-label="next">
                <svg width={14} height={10} aria-hidden="true">
                  <use xlinkHref="#arrow-right" />
                </svg>
              </button>
            </div>
          </div>

          {
            isTrainingsLoadings && <Spinner />
          }

          {
            !isTrainingsLoadings && !trainingsList && <Stub />
          }

          {
            !isTrainingsLoadings && trainingsList &&
              <TrainingsSlider
                trainingsList={trainingsList}
                sliderClass='user-card-coach__training-list'
                prevBtnClass='user-card-coach__training-btn--prev'
                nextBtnClass='user-card-coach__training-btn--next'
                sliderItemClass='user-card-coach__training-item'
              />
          }

          {/*
            TODO: Реализовать запрос на тренировку
            TODO: Реализовать рассылку уведомлений на почту
          */}
          <form className="user-card-coach__training-form">
            <button className="btn user-card-coach__btn-training" type="button">Хочу персональную тренировку</button>
            <div className="user-card-coach__training-check">
              <div className="custom-toggle custom-toggle--checkbox">
                <label>
                  <input type="checkbox" defaultValue="user-agreement-1" name="user-agreement" defaultChecked /><span className="custom-toggle__icon">
                    <svg width={9} height={6} aria-hidden="true">
                      <use xlinkHref="#arrow-check" />
                    </svg></span><span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
