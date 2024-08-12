import { ReactElement } from 'react';

import { Link } from 'react-router-dom';
import { AppRoute } from '@client/src/const';

import Stub from '../../tools/stub/stub';
import PersonalAccountUserCalories from '../personal-account-user-calories/personal-account-user-calories';
import { LoggedUserRDO } from '@shared/user';

type PersonalAccountUserProps = {
  userInfo: LoggedUserRDO
}

export default function PersonalAccountUser({ userInfo }: PersonalAccountUserProps): ReactElement {
  return (
    <div className="personal-account-user">

      <PersonalAccountUserCalories userInfo={userInfo} />

      <div className="personal-account-user__additional-info">
        {/*
          <a className="thumbnail-link thumbnail-link--theme-light" href="#">
            <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
              <svg width={30} height={26} aria-hidden="true">
                <use xlinkHref="#icon-friends" />
              </svg>
            </div>
            <span className="thumbnail-link__text">Мои друзья</span>
          </a>
        */}

        <Stub />

        <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.PURCHASES}>
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width={30} height={26} aria-hidden="true">
              <use xlinkHref="#icon-shopping-cart" />
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои покупки</span>
        </Link>
      </div>
    </div>
  )
}
