import { ReactElement, useRef } from 'react';

import CertificatesList from './certificates-list/certificates-list';

import { useAppDispatch, useAppSelector } from '@client/src/hooks';
import { updateUserAction, uploadCertificateAction } from '@client/src/store/actions/api-user-action';
import { getCurrentUserInfo } from '@client/src/store/slices/user-process/user-process.selectors';
import { toast } from 'react-toastify';

// const certificates = [
//   'img/content/certificates-and-diplomas/certificate-1.jpg',
//   'img/content/certificates-and-diplomas/certificate-2.jpg',
//   'img/content/certificates-and-diplomas/certificate-3.jpg',
//   'img/content/certificates-and-diplomas/certificate-4.jpg',
//   'img/content/certificates-and-diplomas/certificate-5.jpg',
//   'img/content/certificates-and-diplomas/certificate-6.jpg'
// ]

export default function Certificates(): ReactElement {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(getCurrentUserInfo);
  const userCertificates = userInfo?.certificates ?? [];
  const uploadingCertificates = useRef<HTMLInputElement>(null);

  function handleUploadCertificate() {
    const newCertificates = uploadingCertificates?.current?.files;

    if (!newCertificates) {
      return;
    }

    const formData = new FormData();

    for (const newCertificate of newCertificates) {
      formData.append('files', newCertificate);
    }

    dispatch(uploadCertificateAction(formData))
      .then((loadCertificatesResult) => {
        console.log('Uploading certificates result: ', loadCertificatesResult);

        const payload = loadCertificatesResult.payload;

        if ('error' in loadCertificatesResult || (!Array.isArray(payload) || payload.length < 0)) {
          return;
        };

        toast.success('Certificates has been successfully uploaded');

        // Обновляем список сертификатов пользователя
        const updatedCertificates = [...payload, ...userCertificates];
        const updateUserData = { certificates: updatedCertificates }

        dispatch(updateUserAction(updateUserData));
      })
  }

  function handleUpdateCertificate(oldCertificateURL: string, newCertificate: File) {
    const formData = new FormData();

    formData.append('files', newCertificate);

    console.log('New certificate: ', newCertificate);
    console.log('Form data: ', formData);

    dispatch(uploadCertificateAction(formData))
      .then((loadCertificatesResult) => {
        const payload = loadCertificatesResult.payload;

        if ('error' in loadCertificatesResult || (!Array.isArray(payload) || payload.length < 0)) {
          return;
        };

        toast.success('Certificate has been successfully uploaded');

        // Обновляем список сертификатов пользователя (удаляем из списка старый сертификат)
        const filteredCertificates = userCertificates.filter((item) => item !== oldCertificateURL);
        const updatedCertificates = [ ...payload, ...filteredCertificates ]
        const updateUserData = { certificates: updatedCertificates }

        dispatch(updateUserAction(updateUserData));
      })
  }

  function handleDeleteCertificate(url: string) {
    const filteredCertificates = userCertificates.filter((item) => item !== url);
    const updateUserData = { certificates: filteredCertificates }

    dispatch(updateUserAction(updateUserData));
  }


  return (
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>

        <label className="btn-flat btn-flat--underlined personal-account-coach__button">
          <svg width={14} height={14} aria-hidden="true">
            <use xlinkHref="#icon-import" />
          </svg>
          <span>Загрузить</span>
          <input className="visually-hidden" type="file" accept=".pdf" onChange={handleUploadCertificate} ref={uploadingCertificates} multiple />
        </label>

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

      <CertificatesList itemsSrcList={userCertificates} onItemUpdate={handleUpdateCertificate} onItemDelete={handleDeleteCertificate} />
    </div>
  )
}
