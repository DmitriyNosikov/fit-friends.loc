import { ReactElement } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';

import useWithDiscountTrainingsList from '@client/src/hooks/useWithDiscountTrainingsList';
import { useAppSelector } from '@client/src/hooks';
import { getTrainingsWithDiscount, getWithDiscountTrainingsLoadingStatus } from '@client/src/store/slices/training-process/training-process.selectors';
import Spinner from '../tools/spinner/spinner';
import { SPECIAL_OFFERS_MAX_SLIDES_COUNT } from '@client/src/const';
import SpecialOffersItem from './special-offers-item/special-offers-item';

export default function SpecialOffers(): ReactElement {
  useWithDiscountTrainingsList();

  const trainigns = useAppSelector(getTrainingsWithDiscount);
  const isTrainingsLoading = useAppSelector(getWithDiscountTrainingsLoadingStatus);

  if (isTrainingsLoading) {
    return <Spinner />
  }

  if (!trainigns) {
    return <></>;
  }

  // Слайдер может содержать не более SPECIAL_FOR_YOU_MAX_SLIDES_COUNT слайдов
  let slides = trainigns.entities;

  // Сортировка тренировок по величине скидки
  slides = [...slides].sort(function(trainingA, trainingB){
    if(!trainingA.discount || !trainingB.discount) {
      return 0;
    }

    const trainingAPrice = trainingA.price - trainingA.discount;
    const trainingBPrice = trainingB.price - trainingB.discount;

    return trainingAPrice - trainingBPrice;
  });

  if(trainigns.itemsPerPage > SPECIAL_OFFERS_MAX_SLIDES_COUNT) {
    slides = slides.slice(0, SPECIAL_OFFERS_MAX_SLIDES_COUNT)
  }


  console.log('TRAININGS WITH DISCOUNT: ', slides);

  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>

          <ul className="special-offers__list">
            <Swiper
              className='special-offers__slider'
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
              <ul className="special-for-you__list">
                {
                  slides.map((training) => {
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
              </ul>
            </Swiper>
          </ul>

          <div className="thumbnail-spec-gym">
            <div className="thumbnail-spec-gym__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"
                />
                <img
                  src="img/content/thumbnails/nearest-gym-01.jpg"
                  srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
                  width={330}
                  height={190}
                  alt=""
                />
              </picture>
            </div>
            <div className="thumbnail-spec-gym__header">
              <h3 className="thumbnail-spec-gym__title" style={{ textAlign: 'center' }}>
                Скоро здесь появится что - то полезное
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
