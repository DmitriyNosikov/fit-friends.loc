import { ReactElement } from 'react';
import CertificatesList from './certificates-list/certificates-list';

const certificates = [
  'img/content/certificates-and-diplomas/certificate-1.jpg',
  'img/content/certificates-and-diplomas/certificate-2.jpg',
  'img/content/certificates-and-diplomas/certificate-3.jpg',
  'img/content/certificates-and-diplomas/certificate-4.jpg',
  'img/content/certificates-and-diplomas/certificate-5.jpg',
  'img/content/certificates-and-diplomas/certificate-6.jpg'
]

export default function Certificates(): ReactElement {
  return (
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>

        <button className="btn-flat btn-flat--underlined personal-account-coach__button" type="button">
          <svg width={14} height={14} aria-hidden="true">
            <use xlinkHref="#icon-import" />
          </svg><span>Загрузить</span>
        </button>

        <div className="personal-account-coach__controls">
          <button className="btn-icon personal-account-coach__control personal-account-coach__control--prev" type="button" aria-label="previous">
            <svg width={16} height={14} aria-hidden="true">
              <use xlinkHref="#arrow-left" />
            </svg>
          </button>
          <button className="btn-icon personal-account-coach__control personal-account-coach__control--next" type="button" aria-label="next">
            <svg width={16} height={14} aria-hidden="true">
              <use xlinkHref="#arrow-right" />
            </svg>
          </button>
        </div>
      </div>

      <CertificatesList imagesSrc={ certificates } />
    </div>
  )
}
