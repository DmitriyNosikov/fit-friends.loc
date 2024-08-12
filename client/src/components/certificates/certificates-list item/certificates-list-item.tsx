import classNames from 'classnames';
import { ReactElement, useState } from 'react';

type CertificatesListItemProps = {
  imageSrc: string
}

export default function CertificatesListItem({ imageSrc }: CertificatesListItemProps): ReactElement {
  const [isEditing, setIsEditing] = useState(false);

  function handleChangeBtnClick() {
    setIsEditing(true);
  }

  function handleSaveBtnClick() {
    setIsEditing(false);
  }

  return (
    <li className="personal-account-coach__item">
      <div className={
        classNames(
          'certificate-card',
          { 'certificate-card--edit': isEditing })
      }>
        <div className="certificate-card__image">
          <picture>
            {/* <source type="image/webp" srcSet="img/content/certificates-and-diplomas/certificate-1.webp, img/content/certificates-and-diplomas/certificate-1@2x.webp 2x" /> */}
            <img src={ imageSrc } width={294} height={360} alt="Сертификат - Биомеханика ударов в боксе" />
          </picture>
        </div>
        <div className="certificate-card__buttons">
          {
            !isEditing &&
            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button" onClick={ handleChangeBtnClick }>
              <svg width={12} height={12} aria-hidden="true">
                <use xlinkHref="#icon-edit" />
              </svg><span>Изменить</span>
            </button>
          }


          {
            isEditing &&
            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button" onClick={ handleSaveBtnClick }>
              <svg width={12} height={12} aria-hidden="true">
                <use xlinkHref="#icon-edit" />
              </svg><span>Сохранить</span>
            </button>
          }

          {
            isEditing &&
            <div className="certificate-card__controls">
              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-change" />
                </svg>
              </button>
              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                <svg width={14} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-trash" />
                </svg>
              </button>
            </div>
          }
        </div>
      </div>
    </li>
  )
}
