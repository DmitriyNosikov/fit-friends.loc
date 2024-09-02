import { ReactElement, useRef, useState } from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '@client/src/hooks';
import { getAdditionalInfo } from '@client/src/store/slices/user-process/user-process.selectors';

import { LoggedUserRDO, UpdateUserDTO } from '@shared/user';
import { BASE_URL } from '@client/src/services/api';

import { getAdaptedUserLevel } from '@client/src/utils/adapters';
import { areArraysEqual, getImgPreviewLink, upperCaseFirst } from '@client/src/utils/common';

import Specialization from '../specialization/specialization';
import CustomSelectBtn from '../../custom-select-btn/custom-select-btn';
import { updateUserAction, uploadAvatarAction } from '@client/src/store/actions/api-user-action';


import { clearErrors, validateFields } from '@client/src/validation/validation-tools';
import { personalAccountValidationSchema } from '@client/src/validation/personal-account-validation';
import { AppRoute, DEFAULT_AVATAR_URL } from '@client/src/const';
import { UserRoleEnum } from '@shared/types/user-roles.enum';
import { Link } from 'react-router-dom';

type PersonalAccountFormProps = {
  userInfo: LoggedUserRDO
}

export default function PersonalAccountForm({ userInfo }: PersonalAccountFormProps): ReactElement {
  const dispatch = useAppDispatch();
  const additionalInfo = useAppSelector(getAdditionalInfo);

  const [formEditable, setFormEditable] = useState(false);
  const editFormBtnText = formEditable ? 'Сохранить' : 'Редактировать';
  const avatarContainer = document.querySelector('.input-load-avatar__avatar > img');

  const {
    name,
    avatar,
    description,
    trainingType,
    location,
    gender,
    isReadyToTraining,
    level,
    role
  } = userInfo;

  const userAvatarUrl = avatar ? `${BASE_URL}${avatar}` : DEFAULT_AVATAR_URL;
  let adaptedUserLevel = getAdaptedUserLevel(level);

  const isReadyToTrainingFlagText = (role === UserRoleEnum.TRAINER) ? 'Готов тренировать' : 'Готов к тренировке';

  const userName = useRef<HTMLInputElement>(null);
  const userDescription = useRef<HTMLTextAreaElement>(null);
  const userIsReadyToTraining = useRef<HTMLInputElement>(null);
  const [userLocation, setUserLocation] = useState(location);
  const [userGender, setUserGender] = useState(gender);
  const [userLevel, setUserLevel] = useState(adaptedUserLevel);

  let newUserAvatar: FormData | null = null;

  function editBtnClickHandler() {
    const formState = !formEditable;

    if (formEditable) {
      const isFormValid = onSaveBtnClick();

      if (!isFormValid) {
        return;
      }
    }

    setFormEditable(formState);
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    if (!target?.files) {
      return;
    }

    const avatar = target?.files[0];

    getImgPreviewLink(avatar, (link: string | ArrayBuffer | null) => {
      if (link) {
        avatarContainer?.setAttribute('src', link as string);
      }
    })

    const formData = new FormData();
    formData.append('file', avatar);

    newUserAvatar = formData;
  }

  function handleChangeAvatarClick() {
    if (!newUserAvatar) {
      toast.info('Choose avatar by click on left avatar preview before change it');
      return;
    }

    dispatch(uploadAvatarAction(newUserAvatar))
      .then((uploadAvatarResult) => {
        if ('error' in uploadAvatarResult) {
          return;
        }

        dispatch(updateUserAction({ avatar: uploadAvatarResult.payload as string }))
          .then((updateUserResult) => {
            if ('error' in updateUserResult) {
              return;
            };

            toast.success('Avatar has been successfully changed');
          })
      });
  }

  function handleDeleteAvatarClick() {
    if (!avatar) {
      return;
    }

    dispatch(updateUserAction({ avatar: '' }))
      .then((result) => {
        if ('error' in result) {
          return;
        };

        toast.success('Avatar has been successfully deleted');
      })
  }

  function onSaveBtnClick() {
    clearErrors();

    const updateUserData: Record<string, any> = {};
    const userSpecialization = document.querySelectorAll('.user-info__specialization .btn-checkbox input[type="checkbox"]:checked');

    (userName.current
      && userName.current?.value !== name) ? updateUserData['name'] = userName.current.value : '';

    (userDescription.current
      && userDescription.current?.value !== description)
      ? updateUserData['description'] = userDescription.current.value
      : '';

    (userIsReadyToTraining.current
      && userIsReadyToTraining.current?.checked !== isReadyToTraining)
      ? updateUserData['isReadyToTraining'] = userIsReadyToTraining.current.checked
      : '';

    if (userSpecialization.length > 0) {
      const newSpecializations: string[] = [];

      userSpecialization.forEach((item) => {
        if ('value' in item) {
          newSpecializations.push(item.value as string);
        }
      });

      if (!areArraysEqual(newSpecializations, trainingType)) {
        updateUserData['trainingType'] = newSpecializations;
      }
    } else {
      updateUserData['trainingType'] = [];
    }

    (userLocation && userLocation !== location) ? updateUserData['location'] = userLocation : '';
    (userGender && userGender !== gender) ? updateUserData['gender'] = userGender : '';
    (userLevel && userLevel !== level) ? updateUserData['level'] = userLevel : '';

    if (Object.keys(updateUserData).length <= 0) {
      return true;
    }

    const [isFormHasErrors] = validateFields<UpdateUserDTO>(updateUserData, personalAccountValidationSchema);

    if (isFormHasErrors) {
      return false;
    }

    dispatch(updateUserAction(updateUserData));

    return true;
  }

  return (
    <section className={classNames({
      'user-info': !formEditable,
      'user-info-edit': formEditable,
    })}>
      <div className={classNames({
        'user-info__header': !formEditable,
        'user-info-edit__header': formEditable,
      })}>
        <div className="input-load-avatar">
          <label>
            <input
              className="visually-hidden"
              type="file"
              name="user-photo-1"
              accept="image/png, image/jpeg"
              onChange={handleAvatarChange}
              disabled={!formEditable}
            />
            <Link to={`${AppRoute.PERSONAL_CARD}/${userInfo.id}`}>
              <span className="input-load-avatar__avatar">
                <img src={userAvatarUrl} width={98} height={98} alt="user photo" />
              </span>
            </Link>
          </label>
        </div>
        <div className={
          classNames(
            'user-info-edit__controls',
            { 'visually-hidden': !formEditable }
          )
        }>
          <button className="user-info-edit__control-btn" aria-label="обновить" onClick={handleChangeAvatarClick}>
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-change" />
            </svg>
          </button>
          <button className="user-info-edit__control-btn" aria-label="удалить" onClick={handleDeleteAvatarClick}>
            <svg width={14} height={16} aria-hidden="true">
              <use xlinkHref="#icon-trash" />
            </svg>
          </button>
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
          <div className="custom-input custom-input--readonly user-info__input" id="name">
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input
                  type="text"
                  name="name"
                  defaultValue={name}
                  ref={userName}
                  disabled={!formEditable}
                />
              </span>
              <span className="custom-input__error"></span>
            </label>
          </div>
          <div className="custom-textarea custom-textarea--readonly user-info__textarea" id="description">
            <label>
              <span className="custom-textarea__label">Описание</span>
              <textarea
                name="description"
                placeholder=" "
                defaultValue={`${description}`}
                ref={userDescription}
                disabled={!formEditable}
              />
              <span className="custom-input__error"></span>
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
                ref={userIsReadyToTraining}
                disabled={!formEditable}
              />
              <span className="custom-toggle__icon">
                <svg width={9} height={6} aria-hidden="true">
                  <use xlinkHref="#arrow-check" />
                </svg>
              </span>
              <span className="custom-toggle__label">{isReadyToTrainingFlagText}</span>
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
          <div className="custom-select__placeholder">ст. м. {upperCaseFirst(userLocation)}</div>

          {
            additionalInfo?.location &&
            <CustomSelectBtn
              itemsList={additionalInfo.location}
              uniqCSSId='personal-account-location'
              onItemSelect={setUserLocation}
              disabled={!formEditable}
            />
          }
        </div>

        <div className="custom-select--readonly custom-select user-info__select">
          <span className="custom-select__label">Пол</span>
          <div className="custom-select__placeholder">{upperCaseFirst(userGender)}</div>

          {
            additionalInfo?.gender &&
            <CustomSelectBtn
              itemsList={additionalInfo.gender}
              uniqCSSId='personal-account-gender'
              onItemSelect={setUserGender}
              disabled={!formEditable}
            />
          }
        </div>

        <div className="custom-select--readonly custom-select user-info__select">
          <span className="custom-select__label">Уровень</span>
          <div className="custom-select__placeholder">{upperCaseFirst(userLevel)}</div>

          {
            additionalInfo?.levels &&
            <CustomSelectBtn
              itemsList={additionalInfo.levels}
              uniqCSSId='personal-account-level'
              onItemSelect={setUserLevel}
              disabled={!formEditable}
            />
          }
        </div>
      </form>
    </section>
  )
}
