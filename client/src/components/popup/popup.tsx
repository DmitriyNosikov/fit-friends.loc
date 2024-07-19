import { ReactElement, useEffect } from 'react';
import { setBodyScrollAvailable } from '@client/src/utils/common';

import ScrollToTop from '../tools/scroll-to-top/scroll-to-top';
import PopupPortal from './popup-portal/popup-portal';

type PopupProps = {
  title: string,
  PopupContentComponent: any,
  PopupContentComponentProps?: any,

  isOpened?: boolean,
  onClose?: Function
};

export default function Popup({ title, PopupContentComponent, PopupContentComponentProps, isOpened = false, onClose }: PopupProps): ReactElement {
  let sendBtn: HTMLButtonElement | null = null;
  let closeBtn: HTMLButtonElement | null = null;

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      initPopup();
    }

    return () => {
      isMounted = false;
    }
  });

  function initPopup() {
    sendBtn = document.querySelector('.popup__button_send') as HTMLButtonElement;
    closeBtn = document.querySelector('.popup__button_close') as HTMLButtonElement;

    document.addEventListener('keydown', handleEscapeKeydown);
    document.addEventListener('keydown', handleTabKeydown);
  }

  function closePopup() {
    if(onClose) {
      onClose();
    }

    setBodyScrollAvailable(true);

    document.removeEventListener('keydown', handleEscapeKeydown)
    document.removeEventListener('keydown', handleTabKeydown)
  }

  // Handlers
  function handleEscapeKeydown(e: KeyboardEvent) {
    if (e.key !== 'Escape' && e.code !== 'Escape') {
      return;
    }

    closePopup();
  }

  function handleTabKeydown(e: KeyboardEvent) {
    if (e.key !== 'Tab' && e.code !== 'Tab') {
      return;
    }

    const target = e.target as HTMLElement;

    if(!target) {
      return;
    }

    const isCloseBtn = target?.classList.contains('popup__button_close');
    const isSendBtn = target?.classList.contains('popup__button_send');

    if(isCloseBtn && e.shiftKey) {
      e.preventDefault();
      sendBtn?.focus();
    }

    if(isSendBtn && !e.shiftKey) {
      e.preventDefault();
      closeBtn?.focus();
    }
  }

  function handleClosePopupBtnClick() {
    closePopup();
  }

  return(
    <PopupPortal isOpened={isOpened} >
      <section className="popup">
        <ScrollToTop />

        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">{ title }</h2>
            <button className="btn-icon btn-icon--outlined btn-icon--big popup__button_close" type="button" aria-label="close" onClick={handleClosePopupBtnClick} tabIndex={1}>
              <svg width={20} height={20} aria-hidden="true">
                <use xlinkHref="#icon-cross" />
              </svg>
            </button>
          </div>

          <PopupContentComponent onClose={onClose} {...PopupContentComponentProps}/>
        </div>
      </section>
    </PopupPortal>
  )
}
