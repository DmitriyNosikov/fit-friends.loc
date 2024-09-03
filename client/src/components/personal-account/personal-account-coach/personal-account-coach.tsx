import { ReactElement } from 'react';
import Stub from '../../tools/stub/stub';
import { Link } from 'react-router-dom';
import { AppRoute } from '@client/src/const';
import Certificates from '../../certificates/certificates';

export default function PersonalAccountCoach(): ReactElement {
  return (
    <div className="personal-account-coach">
      <div className="personal-account-coach__navigation">
        <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.TRAININGS}>
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width={30} height={26} aria-hidden="true">
              <use xlinkHref="#icon-flash" />
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои тренировки</span>
        </Link>

        <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.TRAININGS_CREATE}>
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width={30} height={26} aria-hidden="true">
              <use xlinkHref="#icon-add" />
            </svg>
          </div>
          <span className="thumbnail-link__text">Создать тренировку</span>
        </Link>

        <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.ACCOUNT}>
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width={30} height={26} aria-hidden="true">
              <use xlinkHref="#icon-friends" />
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои друзья</span>
        </Link>

        <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.ORDERS}>
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width={30} height={26} aria-hidden="true">
              <use xlinkHref="#icon-bag" />
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои заказы</span>
        </Link>

        <div className="personal-account-coach__calendar">
          <Stub text='Скоро тут будет интересно' />
        </div>
      </div>

      {/* TODO: Реализовать загрузку и изменение сертификатов */}
      <Certificates />
    </div>
  )
}
