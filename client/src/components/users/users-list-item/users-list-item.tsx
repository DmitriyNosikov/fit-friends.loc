import { AppRoute, DEFAULT_AVATAR_URL } from '@client/src/const';
import { BASE_URL } from '@client/src/services/api';
import { getAvatarByUrl } from '@client/src/utils/common';
import { TrainingType } from '@shared/training/types/training-type.enum';
import { Location } from '@shared/types';
import { UserRole, UserRoleEnum } from '@shared/types/user-roles.enum';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

type UsersListItemProps = {
  user: {
    id: string,
    name: string,
    avatar: string,
    location: Location,
    trainingType: TrainingType[],
    role: UserRole
  }
}

export default function UsersListItem({ user }: UsersListItemProps): ReactElement {
  const { id, avatar, name, location, role, trainingType } = user;
  const userRole = (role === UserRoleEnum.CLIENT) ? 'user' : 'coach';
  const userAvatar = getAvatarByUrl(avatar);

  return (
    <li className="users-catalog__item">
      <div className={`thumbnail-user thumbnail-user--role-${userRole}`}>
        <div className="thumbnail-user__image">
          <picture>
            <img src={userAvatar} srcSet={`${userAvatar}@2x.jpg 2x`} width={82} height={82} />
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
              trainingType.map((type) => (
                <li className="thumbnail-user__hashtags-item" key={type}>
                  <div className="hashtag thumbnail-user__hashtag"><span>#{type}</span></div>
                </li>
              ))
            }
          </ul>
        }
        <Link className="btn btn--medium thumbnail-user__button" to={`${AppRoute.PERSONAL_CARD}/${id}`}>Подробнее</Link>
      </div>
    </li>
  )
}
