import { ReactElement } from 'react';
import classNames from 'classnames';


import Spinner from '../../tools/spinner/spinner';

import { upperCaseFirst } from '@client/src/utils/common';

import { UserRDO } from '@shared/user';
import { UserRoleEnum } from '@shared/types/user-roles.enum';

import { useAppDispatch, useAppSelector } from '@client/src/hooks';
import { getCurrentUserInfo } from '@client/src/store/slices/user-process/user-process.selectors';
import { addUserToFriends, removeUserFromFriends } from '@client/src/store/actions/api-user-action';

type PersonalCardUserProps = {
  userInfo: UserRDO
}

export default function PersonalCardUser({ userInfo }: PersonalCardUserProps): ReactElement {
  const dispatch = useAppDispatch();

  const { id, name, location, isReadyToTraining, description, trainingType, level } = userInfo;
  const statusText = isReadyToTraining ? 'Готов к тренировке' : 'Не готов к тренировке';
  const currentLoggedUserInfo = useAppSelector(getCurrentUserInfo);

  const isCurrentUserTrainer = (currentLoggedUserInfo?.role === UserRoleEnum.TRAINER);
  const isUserInFriends = currentLoggedUserInfo?.friendsList.includes(id);
  const addToFriendsBtnText = isUserInFriends ? 'Удалить из друзей' : 'Добавить в друзья';

  function handleToggleFriendsBtnCLick() {
    const targetUser = { targetUserId: id };

    if (isUserInFriends) {
      dispatch(removeUserFromFriends(targetUser));
    } else {
      dispatch(addUserToFriends(targetUser));
    }
  }

  return (
    <section className="user-card">
      <h1 className="visually-hidden">Карточка пользователя</h1>

      {
        !userInfo && <Spinner />
      }

      {
        userInfo &&
        <div className="user-card__wrapper">
          <div className="user-card__content">
            <div className="user-card__head">
              <h2 className="user-card__title">{name}</h2>
            </div>
            <div className="user-card__label">
              <a href="">
                <svg className="user-card-coach__icon-location" width={12} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-location" />
                </svg>
                <span>{upperCaseFirst(location)}</span>
              </a>
            </div>
            <div className={classNames(
              'user-card__status',
              { 'user-card__status--disabled': !isReadyToTraining }
            )}
            >
              <span>{statusText}</span>
            </div>
            <div className="user-card__text">{description}</div>

            <ul className="user-card__hashtag-list">
              {
                trainingType && trainingType.map((type) => {
                  return (
                    <li className="user-card__hashtag-item" key={type}>
                      <div className="hashtag"><span>#{type}</span></div>
                    </li>
                  )
                })
              }

              {
                level &&
                <li className="user-card__hashtag-item">
                  <div className="hashtag"><span>#{level}</span></div>
                </li>
              }
            </ul>

            {
              !isCurrentUserTrainer &&
              <button
                className="btn user-card__btn"
                type="button"
                onClick={handleToggleFriendsBtnCLick}>
                {addToFriendsBtnText}
              </button>
            }
          </div>

          <div className="user-card__gallary">
            <ul className="user-card__gallary-list">
              <li className="user-card__gallary-item">
                <img src="/img/content/user-card-photo1.jpg" srcSet="/img/content/user-card-photo1@2x.jpg 2x" width={334} height={573} alt="photo1" />
              </li>
              <li className="user-card__gallary-item">
                <img src="/img/content/user-card-photo2.jpg" srcSet="/img/content/user-card-photo2@2x.jpg 2x" width={334} height={573} alt="photo2" />
              </li>
            </ul>
          </div>
        </div>
      }
    </section>
  )
}
