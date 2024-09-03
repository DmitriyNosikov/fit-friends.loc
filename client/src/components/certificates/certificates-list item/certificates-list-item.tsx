import classNames from 'classnames';
import { ReactElement, useEffect, useRef, useState } from 'react';
import PdfPreview from '../../pdf-preview/pdf-preview';
import { BASE_URL } from '@client/src/services/api';
import Spinner from '../../tools/spinner/spinner';

type CertificatesListItemProps = {
  itemSrc: string,

  onItemUpdate?: Function,
  onItemDelete?: Function,
}

export default function CertificatesListItem({ itemSrc, onItemUpdate, onItemDelete }: CertificatesListItemProps): ReactElement {
  const itemURL = `${BASE_URL}${itemSrc}`;

  const [currentCertificate, setCurrentCertificate] = useState(itemURL);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const uploadCertificateField = useRef<HTMLInputElement>(null);

  function handleChangeBtnClick() {
    setIsEditing(true);
  }

  function handleSaveBtnClick() {
    setIsEditing(false);
  }

  function handleUpdateCertificate() {
    if (onItemUpdate) {
      onItemUpdate(itemSrc);
    }
  }

  function handleDeleteCertificate() {
    setIsDeleting(true);

    if (onItemDelete) {
      onItemDelete(itemSrc);
    }
  }

  function handleUploadNewCertificate() {
    console.log(uploadCertificateField?.current?.files);
  }

  return (
    <li className="personal-account-coach__item">
      <div className={
        classNames(
          'certificate-card',
          { 'certificate-card--edit': isEditing })
      }>
        <div className={classNames(
          'certificate-card__image',
          { 'certificate-card__image--delete': isDeleting }
        )}>
          {
            isEditing &&
            <label className="certificate-card__upload-form">
              <input className="visually-hidden" type="file" accept=".pdf" ref={uploadCertificateField} onChange={handleUploadNewCertificate} />
              <span>Нажмите, чтобы загрузить новый сертификат</span>
            </label>
          }

          {/* PDF Preview */}
          {
            !currentCertificate && <Spinner />
          }

          {
            currentCertificate && <PdfPreview pdfFileUrl={currentCertificate} />
          }
        </div>
        <div className="certificate-card__buttons">
          {
            !isEditing &&
            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button" onClick={handleChangeBtnClick}>
              <svg width={12} height={12} aria-hidden="true">
                <use xlinkHref="#icon-edit" />
              </svg><span>Изменить</span>
            </button>
          }


          {
            isEditing &&
            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button" onClick={handleSaveBtnClick}>
              <svg width={12} height={12} aria-hidden="true">
                <use xlinkHref="#icon-edit" />
              </svg>
              <span>Сохранить</span>
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
              <button className="btn-icon certificate-card__control" type="button" aria-label="next" onClick={handleDeleteCertificate}>
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
