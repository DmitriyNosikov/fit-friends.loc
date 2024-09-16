import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

// Swiper slider
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';

import Spinner from '../tools/spinner/spinner';
import Stub from '../tools/stub/stub';
import LookForCompanyItem from '../look-for-company-item/look-for-company-item';

import { useAppSelector } from '@client/src/hooks';
import { getCurrentUserInfo, getUsersListLoadingStatus } from '@client/src/store/slices/user-process/user-process.selectors';

import { AppRoute } from '@client/src/const';
import { UserRoleEnum } from '@shared/types/user-roles.enum';
import { UserSearchQuery } from '@shared/user';
import useSearchUsers from '@client/src/hooks/useSearchUsers';


const START_PAGE = 1;
const ITEMS_PER_PAGE = 8;

export default function LookForCompany(): ReactElement {
  const navigate = useNavigate();
  const userInfo = useAppSelector(getCurrentUserInfo);

  const isTrainer = userInfo?.role === UserRoleEnum.TRAINER;

  let searchQuery: UserSearchQuery = {
    page: START_PAGE,
    limit: ITEMS_PER_PAGE,
    isReadyToTraining: true
  };

  const usersList = useSearchUsers(searchQuery);
  const isUsersLoading = useAppSelector(getUsersListLoadingStatus);

  function handleSeeAllBtnClick() {
    const destinationURL = isTrainer ? AppRoute.ACCOUNT : AppRoute.USERS;

    navigate(destinationURL);
  }

  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">
              Ищут компанию для тренировки
            </h2>

            <button className="btn-flat btn-flat--light look-for-company__button" type="button" onClick={handleSeeAllBtnClick}>
              <span>Смотреть все</span>
              <svg width={14} height={10} aria-hidden="true">
                <use xlinkHref="#arrow-right" />
              </svg>
            </button>
            <div className="look-for-company__controls">
              <button
                className="btn-icon btn-icon--outlined look-for-company__control look-for-company__control--prev"
                type="button"
                aria-label="previous"
              >
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#arrow-left" />
                </svg>
              </button>
              <button
                className="btn-icon btn-icon--outlined look-for-company__control look-for-company__control--next"
                type="button"
                aria-label="next"
              >
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#arrow-right" />
                </svg>
              </button>
            </div>
          </div>

          {
            isUsersLoading &&
            <Spinner />
          }

          {
            (!usersList || usersList.entities.length <= 0) &&
            <Stub />
          }

          {
            usersList && usersList.entities.length > 0 &&
            <Swiper
              className="look-for-company__list"
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={4}
              slidesPerGroup={4}
              allowTouchMove={false}
              watchSlidesProgress
              speed={1500}

              navigation={{
                enabled: true,
                prevEl: `.look-for-company__control--prev`,
                nextEl: `.look-for-company__control--next`,
              }}
            >
              {
                usersList.entities.map((user) => {
                  return (
                    <SwiperSlide key={ user.id }>
                      <LookForCompanyItem user={ user }/>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          }
        </div>
      </div>
    </section>
  );
}
