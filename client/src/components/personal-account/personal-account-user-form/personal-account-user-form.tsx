import { ReactElement, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@client/src/hooks';
import { getAdditionalInfo } from '@client/src/store/slices/user-process/user-process.selectors';

import { LoggedUserRDO } from '@shared/user';
import { BASE_URL } from '@client/src/services/api';

import { getAdaptedUserLevel } from '@client/src/utils/adapters';
import { areArraysEqual, getImgPreviewLink, upperCaseFirst } from '@client/src/utils/common';

import Specialization from '../specialization/specialization';
import CustomSelectBtn from '../../custom-select-btn/custom-select-btn';
import { updateUserAction, uploadFileAction } from '@client/src/store/actions/api-user-action';
import classNames from 'classnames';
import { toast } from 'react-toastify';

const DEFAULT_AVATAR_URL = 'img/content/no-user-photo.png';

type PersonalAccountUserFormProps = {
  userInfo: LoggedUserRDO
}

export default function PersonalAccountUserForm({ userInfo }: PersonalAccountUserFormProps): ReactElement {
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
    level
  } = userInfo;

  const userAvatarUrl = avatar ? `${BASE_URL}${avatar}` : DEFAULT_AVATAR_URL;
  let adaptedUserLevel = getAdaptedUserLevel(level);

  const userName = useRef<HTMLInputElement>(null);
  const userDescription = useRef<HTMLTextAreaElement>(null);
  const userIsReadyToTraining = useRef<HTMLInputElement>(null);
  const [userLocation, setUserLocation] = useState(location);
  const [userGender, setUserGender] = useState(gender);
  const [userLevel, setUserLevel] = useState(adaptedUserLevel);

  let newUserAvatar: FormData | null = null;

  function editBtnClickHandler() {
    setFormEditable(!formEditable);

    if (formEditable) {
      onSaveBtnClick();
    }
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
    if(!newUserAvatar) {
      toast.info('Choose avatar by click on left avatar preview before change it');
      return;
    }

    dispatch(uploadFileAction(newUserAvatar))
      .then((uploadAvatarResult) => {
        if('error' in uploadAvatarResult) {
          return;
        }

        dispatch(updateUserAction({ avatar: uploadAvatarResult.payload as string }))
          .then((updateUserResult) => {
            if('error' in updateUserResult) {
              return;
            };

            toast.success('Avatar has been successfully changed');
          })
      });
  }

  function handleDeleteAvatarClick() {
    if(!avatar) {
      return;
    }

    dispatch(updateUserAction({ avatar: '' }))
      .then((result) => {
        if('error' in result) {
          return;
        };

        toast.success('Avatar has been successfully deleted');
      })
  }

  function onSaveBtnClick() {
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
    }

    (userLocation && userLocation !== location) ? updateUserData['location'] = userLocation : '';
    (userGender && userGender !== gender) ? updateUserData['gender'] = userGender : '';
    (userLevel && userLevel !== level) ? updateUserData['level'] = userLevel : '';

    if (updateUserData.length <= 0) {
      return;
    }

    dispatch(updateUserAction(updateUserData));
  }


  return (
    <>
      <div className="user-info__header">
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
            <span className="input-load-avatar__avatar">
              <img src={userAvatarUrl} width={98} height={98} alt="user photo" />
            </span>
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
          <div className="custom-input custom-input--readonly user-info__input">
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
            </label>
          </div>
          <div className="custom-textarea custom-textarea--readonly user-info__textarea">
            <label>
              <span className="custom-textarea__label">Описание</span>
              <textarea
                name="description"
                placeholder=" "
                defaultValue={`${description}`}
                ref={userDescription}
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
                ref={userIsReadyToTraining}
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
    </>
  )
}
