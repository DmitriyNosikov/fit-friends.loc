import { ReactElement } from 'react';

import { UserRDO } from '@shared/user';
import { getAvatarByUrl, upperCaseFirst } from '@client/src/utils/common';
import classNames from 'classnames';

type FriendsListItemProps = {
  user: UserRDO
}

export default function FriendsListItem({ user }: FriendsListItemProps): ReactElement {
  const { name, avatar, location, trainingType, isReadyToTraining } = user;
  const userAvatar = getAvatarByUrl(avatar);
  const readyToTrainingStatusText = isReadyToTraining ? 'Готов к тренировке' : 'Не готов к тренировке';

  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <picture>
                <img src={userAvatar} srcSet={`${userAvatar}@2x.jpg 2x`} width={78} height={78} />
              </picture>
              {/*<div class="thumbnail-friend__online-status thumbnail-friend__online-status--is-online"></div>*/}
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{name}</h2>
            <div className="thumbnail-friend__location">
              <svg width={14} height={16} aria-hidden="true">
                <use xlinkHref="#icon-location" />
              </svg>
              <address className="thumbnail-friend__location-address">{upperCaseFirst(location)}</address>
            </div>
          </div>

          {
            trainingType.length > 0 &&
            <ul className="thumbnail-friend__training-types-list">
              {
                trainingType.map((type) => (
                  <li key={type}>
                    <div className="hashtag thumbnail-friend__hashtag">
                      <span>#{type}</span>
                    </div>
                  </li>
                ))
              }
            </ul>
          }

          <div className="thumbnail-friend__activity-bar">
            <div className={classNames(
              'thumbnail-friend__ready-status',
              { 'thumbnail-friend__ready-status--is-ready': isReadyToTraining }
            )}>
              <span>{readyToTrainingStatusText}</span>
            </div>

            <button className="thumbnail-friend__invite-button" type="button">
              <svg width={43} height={46} aria-hidden="true" focusable="false">
                <use xlinkHref="#icon-invite" />
              </svg><span className="visually-hidden">Пригласить друга на совместную тренировку</span>
            </button>
          </div>
        </div>

        {/* <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
          <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку</p>
          <div className="thumbnail-friend__button-wrapper">
            <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
            <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
          </div>

          <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку отклонён</p>

          <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку принят</p>
        </div> */}
      </div>
    </li>
  )
}
