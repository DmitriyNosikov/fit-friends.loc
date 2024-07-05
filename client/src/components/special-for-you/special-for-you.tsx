import { ReactElement } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';

import { useAppSelector } from '@client/src/hooks';
import useConvenientTrainingsList from '@client/src/hooks/useConvenientTrainingsList';

import {
  getConvenientTrainingsLoadingStatus,
  getTrainings,
  getUserConvenientTrainings
} from '@client/src/store/slices/training-process/training-process.selectors';

import Spinner from '../tools/spinner/spinner';
import SpecialForYouItem from './special-for-you-item/special-for-you-item';
import Stub from '../tools/stub/stub';
import useTrainingsList from '@client/src/hooks/useTrainingsList';

export default function SpecialForYou(): ReactElement {
  // useConvenientTrainingsList();

  // const convenientTrainings = useAppSelector(getUserConvenientTrainings);

  useTrainingsList()
  const convenientTrainings = useAppSelector(getTrainings);
  const loadingStatus = useAppSelector(getConvenientTrainingsLoadingStatus);

  if (loadingStatus) {
    return <Spinner />
  }


  return (

    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">
              Специально подобрано для вас
            </h2>
            <div className="special-for-you__controls">
              <button
                className="btn-icon special-for-you__control special-for-you__control--prev"
                type="button"
                aria-label="previous"
              >
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#arrow-left" />
                </svg>
              </button>
              <button
                className="btn-icon special-for-you__control special-for-you__control--next"
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
            (!convenientTrainings?.entities || convenientTrainings?.entities.length <= 0) && <Stub />
          }

          <ul className="special-for-you__list">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={3}
              slidesPerGroup={3}
              allowTouchMove={false}
              watchSlidesProgress
              speed={1500}

              navigation={{
                enabled: true,
                prevEl: '.special-for-you__control--prev',
                nextEl: '.special-for-you__control--next',
              }}
            >
              {
                convenientTrainings?.entities && convenientTrainings.entities.map((training) => {
                  const itemProps = {
                    id: training.id as string,
                    background: training.background,
                    title: training.title
                  };

                  return (
                    <SwiperSlide key={training.id}>
                      <SpecialForYouItem training={itemProps} />
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          </ul>

          {/* <ul className="special-for-you__list">
            {
              convenientTrainings?.entities && convenientTrainings.entities.map((training) => {
                const itemProps = {
                  id: training.id as string,
                  background: training.background,
                  title: training.title
                };

                return (
                  <li className="special-for-you__item" key={training.id}>
                    <SpecialForYouItem training={itemProps}/>
                  </li>
                )
              })
            }
          </ul> */}
        </div>
      </div>
    </section >
  );
}
