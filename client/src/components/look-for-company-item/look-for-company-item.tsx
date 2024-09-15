import { AppRoute } from '@client/src/const';
import { getAvatarByUrl } from '@client/src/utils/common';
import { UserRDO } from '@shared/user';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

type LookForCompanyItemProps = {
  user: UserRDO
}

export default function LookForCompanyItem({ user }: LookForCompanyItemProps): ReactElement {
  console.log('User: ', user);
  const { avatar, name, location, trainingType } = user;
  const userAvatar = getAvatarByUrl(avatar);

  return (
    <li className="look-for-company__item">
      <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
        <div className="thumbnail-user__image">
          <picture>
            <img
              src={userAvatar}
              srcSet={`${userAvatar}@2x.jpg 2x`}
              width={82}
              height={82}
              alt=""
            />
          </picture>
        </div>
        <div className="thumbnail-user__header">
          <h3 className="thumbnail-user__name">{name}</h3>
          <div className="thumbnail-user__location">
            <svg width={14} height={16} aria-hidden="true">
              <use xlinkHref="#icon-location" />
            </svg>
            <address className="thumbnail-user__location-address">{location}</address>
          </div>
        </div>
        {
          trainingType &&
          <ul className="thumbnail-user__hashtags-list">
            {
              trainingType.slice(0, 3).map((type) => (
                <li className="thumbnail-user__hashtags-item">
                  <div className="hashtag thumbnail-user__hashtag">
                    <span>#{type}</span>
                  </div>
                </li>
              ))
            }
          </ul>
        }
        <Link
          className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
          to={AppRoute.MAIN}
        >
          Подробнее
        </Link>
      </div>
    </li>
  );
}
