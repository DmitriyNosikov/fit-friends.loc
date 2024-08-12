import { ReactElement } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';

import { useAppSelector } from '@client/src/hooks';
import { getWithDiscountTrainingsLoadingStatus } from '@client/src/store/slices/training-process/training-process.selectors';
import useWithDiscountTrainingsList from '@client/src/hooks/useWithDiscountTrainingsList';

import Spinner from '../tools/spinner/spinner';
import { SPECIAL_OFFERS_MAX_SLIDES_COUNT } from '@client/src/const';
import SpecialOffersItem from './special-offers-item/special-offers-item';
import Stub from '../tools/stub/stub';

export default function SpecialOffers(): ReactElement {
  const trainings = useWithDiscountTrainingsList();
  const isTrainingsLoading = useAppSelector(getWithDiscountTrainingsLoadingStatus);

  // Слайдер может содержать не более SPECIAL_FOR_YOU_MAX_SLIDES_COUNT слайдов
  let slides = trainings?.entities;

  if (slides) {
    // Сортировка тренировок по величине скидки
    slides = [...slides].sort(function (trainingA, trainingB) {
      if (!trainingA.discount || !trainingB.discount) {
        return 0;
      }

      const trainingAPrice = trainingA.price - trainingA.discount;
      const trainingBPrice = trainingB.price - trainingB.discount;

      return trainingAPrice - trainingBPrice;
    });

    if (trainings && trainings.itemsPerPage > SPECIAL_OFFERS_MAX_SLIDES_COUNT) {
      slides = slides.slice(0, SPECIAL_OFFERS_MAX_SLIDES_COUNT)
    }
  }

  return (
    <section className="special-offers">
      <div className="container">
        {
          isTrainingsLoading && <Spinner />
        }

        {
          !isTrainingsLoading &&
          <div className="special-offers__wrapper">
            <h2 className="visually-hidden">Специальные предложения</h2>

            {
              !trainings && <Stub />
            }

            <Swiper
              className='special-offers__list special-offers__slider'
              modules={[Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              slidesPerGroup={1}
              allowTouchMove={false}
              watchSlidesProgress
              speed={1500}

              pagination={{
                enabled: true,
                clickable: true
              }}

            >
              {
                slides && slides.map((training) => {
                  const itemProps = {
                    ...training,
                    id: training.id as string,
                    discount: training.discount as number,
                  };

                  return (
                    <SwiperSlide key={training.id}>
                      <SpecialOffersItem training={itemProps} />
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>

            <Stub />
          </div>
        }
      </div>
    </section>
  );
}
