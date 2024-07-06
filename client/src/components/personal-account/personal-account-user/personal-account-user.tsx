import { ReactElement } from 'react';

import { useAppDispatch, useAppSelector } from '@client/src/hooks';
import { getAdditionalInfo, getUserInfo } from '@client/src/store/slices/user-process/user-process.selectors';
import useAdditionalInfo from '@client/src/hooks/useAdditionalInfo';
import { getAdaptedUserLevel } from '@client/src/utils/adapters';

import { upperCaseFirst } from '@client/src/utils/common';
import { BASE_URL } from '@client/src/services/api';

import Specialization from '../specialization/specialization';
import Spinner from '../../tools/spinner/spinner';
import Stub from '../../tools/stub/stub';

import { updateUserAction } from '@client/src/store/actions/api-user-action';

const CALORIES_CHANGE_TIMEOUT = 800;

export default function PersonalAccountUser(): ReactElement {
  useAdditionalInfo();

  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(getUserInfo);
  const additionalInfo = useAppSelector(getAdditionalInfo);

  if(!userInfo) {
    return <Spinner />;
  }

  const {
    name,
    avatar,
    description,
    trainingType,
    location,
    gender,
    dayCaloriesLimit,
    loseCaloriesLimit,
    isReadyToTraining,
    level
  } = userInfo;

  const userAvatarUrl = avatar ? `${BASE_URL}${avatar}` : '';

  let userLevel = getAdaptedUserLevel(level);
  let dayCaloriesChangeTimer: NodeJS.Timeout | null = null;
  let weekCaloriesChangeTimer: NodeJS.Timeout | null = null;

  function onDayCaloriesChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const newDayCalories = parseInt(target.value);

    if(dayCaloriesChangeTimer) {
      clearTimeout(dayCaloriesChangeTimer);
    }

    if(newDayCalories !== dayCaloriesLimit) {
      dayCaloriesChangeTimer = setTimeout(() => {
        dispatch(updateUserAction({ dayCaloriesLimit: newDayCalories }));
      }, CALORIES_CHANGE_TIMEOUT);
    }
  }

  function onWeekCaloriesChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const newWeekCalories = parseInt(target.value);

    if(weekCaloriesChangeTimer) {
      clearTimeout(weekCaloriesChangeTimer);
    }

    if(newWeekCalories !== loseCaloriesLimit) {
      weekCaloriesChangeTimer = setTimeout(() => {
        dispatch(updateUserAction({ loseCaloriesLimit: newWeekCalories }));
      }, CALORIES_CHANGE_TIMEOUT);
    }
  }

  return (
    <section className="inner-page">
      <div className="container">
        {
          userInfo &&
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Личный кабинет</h1>
            <section className="user-info">
              <div className="user-info__header">
                <div className="input-load-avatar">
                  <label>
                    <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg" />
                    <span className="input-load-avatar__avatar">
                      <img src={userAvatarUrl} srcSet="img/content/user-photo-1@2x.png 2x" width={98} height={98} alt="user photo" />
                    </span>
                  </label>
                </div>
              </div>

              <form className="user-info__form" action="#" method="post">
                <button className="btn-flat btn-flat--underlined user-info__edit-button" type="button" aria-label="Редактировать">
                  <svg width={12} height={12} aria-hidden="true">
                    <use xlinkHref="#icon-edit" />
                  </svg>
                  <span>Редактировать</span>
                </button>
                <div className="user-info__section">
                  <h2 className="user-info__title">Обо мне</h2>
                  <div className="custom-input custom-input--readonly user-info__input">
                    <label><span className="custom-input__label">Имя</span>
                      <span className="custom-input__wrapper">
                        <input type="text" name="name" defaultValue={name} disabled /></span>
                    </label>
                  </div>
                  <div className="custom-textarea custom-textarea--readonly user-info__textarea">
                    <label><span className="custom-textarea__label">Описание</span>
                      <textarea
                        name="description"
                        placeholder=" "
                        defaultValue={`${description}`}
                      />
                    </label>
                  </div>
                </div>
                <div className="user-info__section user-info__section--status">
                  <h2 className="user-info__title user-info__title--status">Статус</h2>
                  <div className="custom-toggle custom-toggle--switch user-info__toggle">
                    <label>
                      <input type="checkbox" name="ready-for-training" defaultChecked={isReadyToTraining} />
                      <span className="custom-toggle__icon">
                        <svg width={9} height={6} aria-hidden="true">
                          <use xlinkHref="#arrow-check" />
                        </svg>
                      </span>
                      <span className="custom-toggle__label">Готов тренировать</span>
                    </label>
                  </div>
                </div>

                {
                  // Типы тренировок (специализация пользователя)
                  additionalInfo?.trainingType &&
                  <Specialization trainingTypeList={additionalInfo.trainingType} usersTrainingType={trainingType} />
                }

                <div className="custom-select--readonly custom-select user-info__select">
                  <span className="custom-select__label">Локация</span>
                  <div className="custom-select__placeholder">ст. м. {upperCaseFirst(location)}</div>

                  <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled>
                    <span className="custom-select__text" />
                    <span className="custom-select__icon">
                      <svg width={15} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-down" />
                      </svg>
                    </span></button>
                  <ul className="custom-select__list" role="listbox"></ul>
                </div>

                <div className="custom-select--readonly custom-select user-info__select">
                  <span className="custom-select__label">Пол</span>
                  <div className="custom-select__placeholder">{upperCaseFirst(gender)}</div>
                  <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled>
                    <span className="custom-select__text" />
                    <span className="custom-select__icon">
                      <svg width={15} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-down" />
                      </svg>
                    </span>
                  </button>
                  <ul className="custom-select__list" role="listbox"></ul>
                </div>

                <div className="custom-select--readonly custom-select user-info__select"><span className="custom-select__label">Уровень</span>
                  <div className="custom-select__placeholder">{upperCaseFirst(userLevel)}</div>
                  <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled>
                    <span className="custom-select__text" />
                    <span className="custom-select__icon">
                      <svg width={15} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-down" />
                      </svg></span></button>
                  <ul className="custom-select__list" role="listbox"></ul>
                </div>
              </form>
            </section>

            <div className="inner-page__content">
              <div className="personal-account-user">

                <div className="personal-account-user__schedule">
                  <form action="#" method="get">
                    <div className="personal-account-user__form">
                      <div className="personal-account-user__input">
                        <label><span className="personal-account-user__label">План на день, ккал</span>
                          <input
                            type="text"
                            name="schedule-for-the-day"
                            defaultValue={`${dayCaloriesLimit}`}
                            onChange={onDayCaloriesChangeHandler}
                          />
                        </label>
                      </div>
                      <div className="personal-account-user__input">
                        <label><span className="personal-account-user__label">План на неделю, ккал</span>
                          <input
                            type="text"
                            name="schedule-for-the-week"
                            defaultValue={`${loseCaloriesLimit ?? ''}`}
                            onChange={onWeekCaloriesChangeHandler}
                          />
                        </label>
                      </div>

                    </div>
                  </form>
                </div>

                <div className="personal-account-user__additional-info">
                  {/* <a className="thumbnail-link thumbnail-link--theme-light" href="#">
                  <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                    <svg width={30} height={26} aria-hidden="true">
                      <use xlinkHref="#icon-friends" />
                    </svg>
                  </div>
                  <span className="thumbnail-link__text">Мои друзья</span>
                </a>

                <div className="thumbnail-spec-gym">
                  <div className="thumbnail-spec-gym__image">
                    <picture>
                      <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" />
                      <img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width={330} height={190} alt="" />
                    </picture>
                  </div>
                  <p class="thumbnail-spec-gym__type">Ближайший зал</p>
                  <div className="thumbnail-spec-gym__header" style={{ textAlign: 'center' }}>
                    <h3 className="thumbnail-spec-gym__title">Скоро тут появится что-то полезное</h3>
                  </div>
                </div> */}

                  <Stub />

                  <a className="thumbnail-link thumbnail-link--theme-light" href="#">
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width={30} height={26} aria-hidden="true">
                        <use xlinkHref="#icon-shopping-cart" />
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">Мои покупки</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </section >
  )
}
