import { ReactElement } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';

import Stub from '../../tools/stub/stub';
import CertificatesSliderItem from '../certificates-slider-item/certificates-slider-item';

type CertificatesSliderProps = {
  slides: string[],

  sliderClass?: string,
  sliderItemClass?: string,

  slidesPreviewCount?: number,
  prevElBtn?: string,
  nextElBtn?: string,

  editable?: boolean,
  defaultControls?: boolean,
  onItemUpdate?: Function,
  onItemDelete?: Function,
}

export default function CertificatesSlider({
  slides,

  sliderClass,
  sliderItemClass,

  slidesPreviewCount = 3,

  prevElBtn,
  nextElBtn,

  editable = false,
  defaultControls = false,
  onItemUpdate,
  onItemDelete
}: CertificatesSliderProps): ReactElement {
  const prevBtnElem = defaultControls ? 'certificates__default-control--prev' : prevElBtn;
  const nextBtnElem = defaultControls ? 'certificates__default-control--next' : nextElBtn;

  return (
    <>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={slidesPreviewCount}
        slidesPerGroup={slidesPreviewCount}
        allowTouchMove={false}
        speed={1500}

        navigation={{
          enabled: true,
          prevEl: `.${prevBtnElem}`,
          nextEl: `.${nextBtnElem}`,
        }}

        className={sliderClass}
      >
        {
          defaultControls &&
          <div className="certificates__default-controls">
            <button className="btn-icon certificates__default-control certificates__default-control--prev" type="button" aria-label="previous">
              <svg width={16} height={14} aria-hidden="true">
                <use xlinkHref="#arrow-left" />
              </svg>
            </button>
            <button className="btn-icon certificates__default-control certificates__default-control--next" type="button" aria-label="next">
              <svg width={16} height={14} aria-hidden="true">
                <use xlinkHref="#arrow-right" />
              </svg>
            </button>
          </div>
        }

        {
          slides.length <= 0 &&
          <SwiperSlide>
            <Stub />
          </SwiperSlide>
        }

        {
          slides.length > 0 && slides.map((slide) => {
            return (
              <SwiperSlide key={slide}>
                <CertificatesSliderItem
                  slide={slide}
                  sliderItemClass={sliderItemClass}
                  editable={editable}
                  onItemUpdate={onItemUpdate}
                  onItemDelete={onItemDelete}
                />
              </SwiperSlide>
            )
          })
        }
      </Swiper >
    </>
  )
}
