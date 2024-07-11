import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';

import { AppRoute, POPULAR_MAX_SLIDES_COUNT } from '@client/src/const';
import { useAppSelector } from '@client/src/hooks';
import {  getWithRatingTrainingsLoadingStatus } from '@client/src/store/slices/training-process/training-process.selectors';
import useWithRatingTrainingsList from '@client/src/hooks/useWithRatingTrainingsList';

import Spinner from '../tools/spinner/spinner';
import PopularTrainingsItem from './popular-trainings-item/popular-trainings-item';
import Stub from '../tools/stub/stub';

export default function PopularTrainings(): ReactElement {
  const navigate = useNavigate();
  const trainings = useWithRatingTrainingsList();
  const isTrainingsLoading = useAppSelector(getWithRatingTrainingsLoadingStatus);

  function handleSeeAllBtnClick() {
    navigate(AppRoute.TRAININGS);
  }

  // Слайдер может содержать не более SPECIAL_FOR_YOU_MAX_SLIDES_COUNT слайдов
  let slides = trainings?.entities;

  if(slides) {
    // Сортировка тренировок по величине скидки
    slides = [...slides].sort((trainingA, trainingB) => {
      if (!trainingA.rating || !trainingB.rating) {
        return 0;
      }

      return trainingB.rating - trainingA.rating;
    });

    if (trainings && trainings.itemsPerPage > POPULAR_MAX_SLIDES_COUNT) {
      slides = slides.slice(0, POPULAR_MAX_SLIDES_COUNT)
    }
  }

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button className="btn-flat popular-trainings__button" type="button" onClick={handleSeeAllBtnClick}>
              <span>Смотреть все</span>
              <svg width={14} height={10} aria-hidden="true">
                <use xlinkHref="#arrow-right" />
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <button
                className="btn-icon popular-trainings__control popular-trainings__control--prev"
                type="button"
                aria-label="previous"
              >
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#arrow-left" />
                </svg>
              </button>
              <button
                className="btn-icon popular-trainings__control popular-trainings__control--next"
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
            !trainings && <Stub />
          }

          {
            trainings &&
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={4}
              slidesPerGroup={4}
              allowTouchMove={false}
              speed={1500}

              navigation={{
                enabled: true,
                prevEl: '.popular-trainings__control--prev',
                nextEl: '.popular-trainings__control--next',
              }}
            >
              <ul className="popular-trainings__list">
                {
                  slides && slides.map((training) => {
                    const itemProps = {
                      ...training,
                      id: training.id as string,
                      rating: training.rating as number,
                      discount: training.discount as number,
                    };

                    return (
                      <SwiperSlide key={training.id}>
                        <PopularTrainingsItem training={itemProps} />
                      </SwiperSlide>
                    )
                  })
                }
              </ul>
            </Swiper>
          }
        </div>
      </div>
    </section>
  );
}
