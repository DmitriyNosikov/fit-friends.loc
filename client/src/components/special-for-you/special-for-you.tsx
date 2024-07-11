import { ReactElement, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';

import { useAppSelector } from '@client/src/hooks';

import {
  getConvenientTrainingsLoadingStatus,
} from '@client/src/store/slices/training-process/training-process.selectors';
import useConvenientTrainingsList from '@client/src/hooks/useConvenientTrainingsList';

import Spinner from '../tools/spinner/spinner';
import SpecialForYouItem from './special-for-you-item/special-for-you-item';
import Stub from '../tools/stub/stub';
import { SPECIAL_FOR_YOU_MAX_SLIDES_COUNT } from '@client/src/const';

export default function SpecialForYou(): ReactElement {
  const convenientTrainings = useConvenientTrainingsList();
  const isTrainingsLoading = useAppSelector(getConvenientTrainingsLoadingStatus);
  console.log('Render: SpecialForYou, ', isTrainingsLoading);

  // Слайдер может содержать не более SPECIAL_FOR_YOU_MAX_SLIDES_COUNT слайдов
  let slides = convenientTrainings?.entities;

  if (slides) {
    if (convenientTrainings && convenientTrainings.itemsPerPage > SPECIAL_FOR_YOU_MAX_SLIDES_COUNT) {
      slides = slides.slice(0, SPECIAL_FOR_YOU_MAX_SLIDES_COUNT)
    }
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
            isTrainingsLoading && <Spinner />
          }

          {
            !isTrainingsLoading && (!convenientTrainings?.entities || convenientTrainings?.entities.length <= 0) && <Stub />
          }

          {
            !isTrainingsLoading && <Swiper
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
              <ul className="special-for-you__list">
                {
                  slides && slides.map((training) => {
                    const itemProps = {
                      ...training,
                      id: training.id as string,
                    };

                    return (
                      <SwiperSlide key={training.id}>
                        <SpecialForYouItem training={itemProps} />
                      </SwiperSlide>
                    )
                  })
                }
              </ul>
            </Swiper>
          }
        </div>
      </div>
    </section >
  );
}
