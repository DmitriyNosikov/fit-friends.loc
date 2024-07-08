import { ReactElement } from 'react';

import { useAppSelector } from '@client/src/hooks';
import useAdditionalInfo from '@client/src/hooks/useAdditionalInfo';
import Stub from '../../tools/stub/stub';

import { getUserInfo } from '@client/src/store/slices/user-process/user-process.selectors';
import Spinner from '../../tools/spinner/spinner';
import PersonalAccountUserForm from '../personal-account-user-form/personal-account-user-form';
import PersonalAccountUserCalories from '../personal-account-user-calories/personal-account-user-calories';
import { Link } from 'react-router-dom';
import { AppRoute } from '@client/src/const';

export default function PersonalAccountUser(): ReactElement {
  useAdditionalInfo();

  const userInfo = useAppSelector(getUserInfo);

  if (!userInfo) {
    return <Spinner />;
  }

  return (
    <section className="inner-page">
      <div className="container">
        {
          userInfo &&
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Личный кабинет</h1>
            <section className="user-info">
              <PersonalAccountUserForm userInfo={userInfo} />
            </section>

            <div className="inner-page__content">
              <div className="personal-account-user">

                <PersonalAccountUserCalories userInfo={userInfo} />

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

                  <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.ORDERS}>
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width={30} height={26} aria-hidden="true">
                        <use xlinkHref="#icon-shopping-cart" />
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">Мои покупки</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </section >
  )
}
