import { ReactElement, useState } from 'react';

import { getAdaptedUserLevel } from '@client/src/utils/adapters';
import { useAppSelector } from '@client/src/hooks';
import { BASE_URL } from '@client/src/services/api';
import { getAdditionalInfo } from '@client/src/store/slices/user-process/user-process.selectors';
import { LoggedUserRDO } from '@shared/user';
import Specialization from '../specialization/specialization';
import { upperCaseFirst } from '@client/src/utils/common';

type PersonalAccountUserFormProps = {
  userInfo: LoggedUserRDO
}

export default function PersonalAccountUserForm({ userInfo }: PersonalAccountUserFormProps): ReactElement {
  const additionalInfo = useAppSelector(getAdditionalInfo);

  const [formEditable, setFormEditable] = useState(false);
  const editFormBtnText = formEditable ? 'Сохранить' : 'Редактировать';

  const {
    name,
    avatar,
    description,
    trainingType,
    location,
    gender,
    isReadyToTraining,
    level
  } = userInfo;

  const userAvatarUrl = avatar ? `${BASE_URL}${avatar}` : '';
  let userLevel = getAdaptedUserLevel(level);

  function editBtnClickHandler() {
    setFormEditable(!formEditable);
  }

  return (
    <>
      <div className="user-info__header">
        <div className="input-load-avatar">
          <label>
            <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg" disabled={!formEditable} />
            <span className="input-load-avatar__avatar">
              <img src={userAvatarUrl} srcSet="img/content/user-photo-1@2x.png 2x" width={98} height={98} alt="user photo" />
            </span>
          </label>
        </div>
      </div>

      <form className="user-info__form" action="#" method="post">
        <button
          className="btn-flat btn-flat--underlined user-info__edit-button"
          type="button" aria-label={editFormBtnText}
          onClick={editBtnClickHandler}
        >
          <svg width={12} height={12} aria-hidden="true">
            <use xlinkHref="#icon-edit" />
          </svg>
          <span>{editFormBtnText}</span>
        </button>
        <div className="user-info__section">
          <h2 className="user-info__title">Обо мне</h2>
          <div className="custom-input custom-input--readonly user-info__input">
            <label><span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input type="text" name="name" defaultValue={name} disabled={!formEditable} />
              </span>
            </label>
          </div>
          <div className="custom-textarea custom-textarea--readonly user-info__textarea">
            <label><span className="custom-textarea__label">Описание</span>
              <textarea
                name="description"
                placeholder=" "
                defaultValue={`${description}`}
                disabled={!formEditable}
              />
            </label>
          </div>
        </div>
        <div className="user-info__section user-info__section--status">
          <h2 className="user-info__title user-info__title--status">Статус</h2>
          <div className="custom-toggle custom-toggle--switch user-info__toggle">
            <label>
              <input
                type="checkbox"
                name="ready-for-training"
                defaultChecked={isReadyToTraining}
                disabled={!formEditable}
              />
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
          <Specialization
            trainingTypeList={additionalInfo.trainingType}
            usersTrainingType={trainingType}
            formEditable={formEditable}
          />
        }

        <div className="custom-select--readonly custom-select user-info__select">
          <span className="custom-select__label">Локация</span>
          <div className="custom-select__placeholder">ст. м. {upperCaseFirst(location)}</div>

          <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled={!formEditable}>
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
          <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled={!formEditable}>
            <span className="custom-select__text" />
            <span className="custom-select__icon">
              <svg width={15} height={6} aria-hidden="true">
                <use xlinkHref="#arrow-down" />
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox"></ul>
        </div>

        <div className="custom-select--readonly custom-select user-info__select">
          <span className="custom-select__label">Уровень</span>
          <div className="custom-select__placeholder">{upperCaseFirst(userLevel)}</div>
          <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled={!formEditable}>
            <span className="custom-select__text" />
            <span className="custom-select__icon">
              <svg width={15} height={6} aria-hidden="true">
                <use xlinkHref="#arrow-down" />
              </svg></span></button>
          <ul className="custom-select__list" role="listbox"></ul>
        </div>
      </form>
    </>
  )
}
