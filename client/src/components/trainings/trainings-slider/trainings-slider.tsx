import { TrainingsWithPaginationRDO } from '@shared/training';
import { ReactElement } from 'react';

// Swiper slider
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';
import TrainingsSliderItem from '../trainings-slider-item/trainings-slider-item';

type TrainingsSliderProps = {
  trainingsList: TrainingsWithPaginationRDO,
  sliderClass?: string,
  prevBtnClass?: string,
  nextBtnClass?: string,
  sliderItemClass?: string,
}

export default function TrainingsSlider({
  trainingsList,
  sliderClass,
  prevBtnClass,
  nextBtnClass,
  sliderItemClass
}: TrainingsSliderProps): ReactElement {
  return (
    <Swiper
      className={sliderClass}
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={4}
      slidesPerGroup={4}
      allowTouchMove={false}
      watchSlidesProgress
      speed={1500}

      navigation={{
        enabled: true,
        prevEl: `.${prevBtnClass}`,
        nextEl: `.${nextBtnClass}`,
      }}
    >
      {
        trainingsList.entities && trainingsList.entities.map((training) => {

          return (
            <SwiperSlide key={training.id}>
              <TrainingsSliderItem item={training} itemClass={sliderItemClass} />
            </SwiperSlide>
          )
        })
      }
    </Swiper>
  )
}
