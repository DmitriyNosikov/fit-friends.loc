import classNames from 'classnames';
import { ReactElement, useRef, useState } from 'react';
import PdfPreview from '../../pdf-preview/pdf-preview';
import { BASE_URL } from '@client/src/services/api';
import Spinner from '../../tools/spinner/spinner';
import { getFilePreviewLink } from '@client/src/utils/common';

type CertificatesListItemProps = {
  itemSrc: string,

  onItemUpdate?: Function,
  onItemDelete?: Function,
}

export default function CertificatesListItem({ itemSrc, onItemUpdate, onItemDelete }: CertificatesListItemProps): ReactElement {
  const itemURL = `${BASE_URL}${itemSrc}`;

  const [currentCertificate, setCurrentCertificate] = useState(itemURL);
  const [isEditing, setIsEditing] = useState(false);
  const uploadCertificateField = useRef<HTMLInputElement>(null);


  function handleChangeBtnClick() {
    setIsEditing(true);
  }

  function handleSaveBtnClick() {
    setIsEditing(false);

    // Если сертификат был обновлен
    if (currentCertificate !== itemSrc && currentCertificate !== '' && onItemUpdate) {
      const newCertificateField = uploadCertificateField?.current;

      if (!newCertificateField || !newCertificateField.files) {
        return;
      }

      onItemUpdate(itemSrc, newCertificateField.files[0]);

      return;
    }

    // Если у нас нет нового сертификата и текущего - значит он был удален
    if (currentCertificate === '' && onItemDelete) {
      console.log('2');
      onItemDelete(itemSrc);
      return;
    }
  }

  function handleDeleteCertificate() {
    setCurrentCertificate('');

    if (uploadCertificateField.current) {
      uploadCertificateField.current.value = '';
    }
  }

  function handleUploadNewCertificate() {
    const target = uploadCertificateField?.current;

    if (!target || !target.files) {
      return;
    }

    getFilePreviewLink(target.files[0], setCurrentCertificate)
  }

  return (
    <li className="personal-account-coach__item">
      <div className={
        classNames(
          'certificate-card',
          { 'certificate-card--edit': isEditing })
      }>
        <div className="certificate-card__image">
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
              </svg>
              <span>Изменить</span>
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
                <label className="certificate-card__controls--change" htmlFor='change-certificate'>
                  <input id="change-certificate" className="visually-hidden" type="file" accept=".pdf" ref={uploadCertificateField} onChange={handleUploadNewCertificate} />
                  <svg width={16} height={16} aria-hidden="true">
                    <use xlinkHref="#icon-change" />
                  </svg>
                </label>
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
