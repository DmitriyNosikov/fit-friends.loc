import { ReactElement } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';

import CertificatesListItem from '../certificates-list item/certificates-list-item';

type CertificatesListProps = {
  imagesSrc: string[]
}

export default function CertificatesList({ imagesSrc }: CertificatesListProps): ReactElement {
  console.log(imagesSrc);
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={3}
      slidesPerGroup={3}
      allowTouchMove={false}
      speed={1500}

      navigation={{
        enabled: true,
        prevEl: '.personal-account-coach__control--prev',
        nextEl: '.personal-account-coach__control--next',
      }}

      className='personal-account-coach__list'
    >
      {
        imagesSrc.map((imageSrc) => {
          return (
            <SwiperSlide key={imageSrc}>
              <CertificatesListItem imageSrc={imageSrc} />
            </SwiperSlide>
          )
        })
      }
    </Swiper >
  )
}
