import { ReactElement } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';

export default function SpecialOffers(): ReactElement {
  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>

          {/* <Swiper
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
                  };

                  return (
                    <SwiperSlide key={training.id}>
                      <SpecialForYouItem training={itemProps} />
                    </SwiperSlide>
                  )
                })
              }
            </ul>
          </Swiper> */}

          <ul className="special-offers__list">
            <li className="special-offers__item is-active">
              <aside className="promo-slider">
                <div className="promo-slider__overlay" />
                <div className="promo-slider__image">
                  <img
                    src="img/content/promo-1.png"
                    srcSet="img/content/promo-1@2x.png 2x"
                    width={1040}
                    height={469}
                    alt="promo-photo"
                  />
                </div>
                <div className="promo-slider__header">
                  <h3 className="promo-slider__title">Fitball</h3>
                  <div className="promo-slider__logo">
                    <svg width={74} height={74} aria-hidden="true">
                      <use xlinkHref="#logotype" />
                    </svg>
                  </div>
                </div>
                <span className="promo-slider__text">
                  Горячие предложения на тренировки на фитболе
                </span>
                <div className="promo-slider__bottom-container">
                  <div className="promo-slider__slider-dots">
                    <button
                      className="promo-slider__slider-dot--active promo-slider__slider-dot"
                      aria-label="первый слайд"
                    />
                    <button
                      className="promo-slider__slider-dot"
                      aria-label="второй слайд"
                    />
                    <button
                      className="promo-slider__slider-dot"
                      aria-label="третий слайд"
                    />
                  </div>
                  <div className="promo-slider__price-container">
                    <p className="promo-slider__price">1600 ₽</p>
                    <p className="promo-slider__sup">за занятие</p>
                    <p className="promo-slider__old-price">2000 ₽</p>
                  </div>
                </div>
              </aside>
            </li>
            <li className="special-offers__item">
              <aside className="promo-slider">
                <div className="promo-slider__overlay" />
                <div className="promo-slider__image">
                  <img
                    src="img/content/promo-2.png"
                    srcSet="img/content/promo-2@2x.png 2x"
                    width={1040}
                    height={469}
                    alt="promo-photo"
                  />
                </div>
                <div className="promo-slider__header">
                  <h3 className="promo-slider__title">Fleksbend</h3>
                  <div className="promo-slider__logo">
                    <svg width={74} height={74} aria-hidden="true">
                      <use xlinkHref="#logotype" />
                    </svg>
                  </div>
                </div>
                <span className="promo-slider__text">
                  Горячие предложения на&nbsp;Тренировки с&nbsp;резинкой для
                  фитнеса
                </span>
                <div className="promo-slider__bottom-container">
                  <div className="promo-slider__slider-dots">
                    <button
                      className="promo-slider__slider-dot"
                      aria-label="первый слайд"
                    />
                    <button
                      className="promo-slider__slider-dot--active promo-slider__slider-dot"
                      aria-label="второй слайд"
                    />
                    <button
                      className="promo-slider__slider-dot"
                      aria-label="третий слайд"
                    />
                  </div>
                  <div className="promo-slider__price-container">
                    <p className="promo-slider__price">2400 ₽</p>
                    <p className="promo-slider__sup">за занятие</p>
                    <p className="promo-slider__old-price">2800 ₽</p>
                  </div>
                </div>
              </aside>
            </li>
            <li className="special-offers__item">
              <aside className="promo-slider">
                <div className="promo-slider__overlay" />
                <div className="promo-slider__image">
                  <img
                    src="img/content/promo-3.png"
                    srcSet="img/content/promo-3@2x.png 2x"
                    width={1040}
                    height={469}
                    alt="promo-photo"
                  />
                </div>
                <div className="promo-slider__header">
                  <h3 className="promo-slider__title">Full Body Stretch</h3>
                  <div className="promo-slider__logo">
                    <svg width={74} height={74} aria-hidden="true">
                      <use xlinkHref="#logotype" />
                    </svg>
                  </div>
                </div>
                <span className="promo-slider__text">
                  Горячие предложения на&nbsp;Комплекс упражнений на&nbsp;растяжку
                  всего тела для новичков
                </span>
                <div className="promo-slider__bottom-container">
                  <div className="promo-slider__slider-dots">
                    <button
                      className="promo-slider__slider-dot"
                      aria-label="первый слайд"
                    />
                    <button
                      className="promo-slider__slider-dot"
                      aria-label="второй слайд"
                    />
                    <button
                      className="promo-slider__slider-dot--active promo-slider__slider-dot"
                      aria-label="третий слайд"
                    />
                  </div>
                  <div className="promo-slider__price-container">
                    <p className="promo-slider__price">1800 ₽</p>
                    <p className="promo-slider__sup">за занятие</p>
                    <p className="promo-slider__old-price">2200 ₽</p>
                  </div>
                </div>
              </aside>
            </li>
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
              <h3 className="thumbnail-spec-gym__title" style={{textAlign: 'center'}}>
                Скоро здесь появится что - то полезное
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
