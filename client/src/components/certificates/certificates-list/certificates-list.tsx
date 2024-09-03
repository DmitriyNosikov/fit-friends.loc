import { ReactElement } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';

import CertificatesListItem from '../certificates-list item/certificates-list-item';
import Stub from '../../tools/stub/stub';

type CertificatesListProps = {
  itemsSrcList: string[]
}

export default function CertificatesList({ itemsSrcList }: CertificatesListProps): ReactElement {
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
        itemsSrcList.length <= 0 &&
          <SwiperSlide>
            <Stub />
          </SwiperSlide>
      }

      {
        itemsSrcList.length > 0 && itemsSrcList.map((src) => {
          return (
            <SwiperSlide key={src}>
              <CertificatesListItem itemSrc={src} />
            </SwiperSlide>
          )
        })
      }
    </Swiper >
  )
}
