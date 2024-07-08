import { ReactElement } from 'react';
import ScrollToTop from '../tools/scroll-to-top/scroll-to-top';
import { useAppDispatch } from '@client/src/hooks';
import { setReviewPopupShowing } from '@client/src/store/slices/main-process/main-process';
import { setBodyScrollAvailable } from '@client/src/utils/common';

export default function PopupReview(): ReactElement {
  const dispatch = useAppDispatch();

  const popup = document.querySelector('.popup');
  const firstTabIndexItem = document.querySelector('.popup__rate-list+li label') as HTMLInputElement;

  initPopup();

  function initPopup() {
    document.addEventListener('keydown', handleEscapeKeydown);
    document.addEventListener('keydown', handleTabKeydown);
    popup?.addEventListener('focusout', handleLastElementBlur);
  }

  function closePopup() {
    dispatch(setReviewPopupShowing(false));
    setBodyScrollAvailable(true);

    document.removeEventListener('keydown', handleEscapeKeydown)
    document.removeEventListener('keydown', handleTabKeydown)
    popup?.removeEventListener('focusout', handleLastElementBlur);

    if(firstTabIndexItem) {
      firstTabIndexItem.focus();
    }
  }

  // Handlers
  function handleEscapeKeydown(e: KeyboardEvent) {
    if(e.key !== 'Escape' && e.code !== 'Escape') {
      return;
    }

    closePopup();
  }

  function handleTabKeydown(e: KeyboardEvent) {
    if(e.key !== 'Tab' && e.code !== 'Tab') {
      return;
    }
  }

  function handleClosePopupBtnClick() {
    closePopup();
  }

  function handleLastElementBlur(e) {
    const target = e.target;

    console.log(target.classList.contains('btn'));

    if(!target.classList.contains('btn')) {
      return;
    }

    firstTabIndexItem.focus();
    console.log('BLURED ON LAST ELEMENT: ', target);
  }

  return (
    <section className="popup">
      <ScrollToTop />

      <div className="popup__wrapper">
        <div className="popup-head">
          <h2 className="popup-head__header">Оставить отзыв</h2>
          <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={handleClosePopupBtnClick} tabIndex={0}>
            <svg width={20} height={20} aria-hidden="true">
              <use xlinkHref="#icon-cross" />
            </svg>
          </button>
        </div>
        <div className="popup__content popup__content--feedback">
          <h3 className="popup__feedback-title">Оцените тренировку</h3>
          <ul className="popup__rate-list">
            <li className="popup__rate-item">
              <div className="popup__rate-item-wrap">
                <label tabIndex={1}>
                  <input type="radio" name="оценка тренировки" aria-label="оценка 1." defaultValue={1}/>
                  <span className="popup__rate-number">1</span>
                </label>
              </div>
            </li>
            <li className="popup__rate-item">
              <div className="popup__rate-item-wrap">
                <label tabIndex={2} >
                  <input type="radio" name="оценка тренировки" aria-label="оценка 2." defaultValue={2}/>
                  <span className="popup__rate-number">2</span>
                </label>
              </div>
            </li>
            <li className="popup__rate-item">
              <div className="popup__rate-item-wrap">
                <label tabIndex={3}>
                  <input type="radio" name="оценка тренировки" aria-label="оценка 3." defaultValue={3}/>
                  <span className="popup__rate-number">3</span>
                </label>
              </div>
            </li>
            <li className="popup__rate-item">
              <div className="popup__rate-item-wrap">
                <label tabIndex={4}>
                  <input type="radio" name="оценка тренировки" aria-label="оценка 4." defaultValue={4}/>
                  <span className="popup__rate-number">4</span>
                </label>
              </div>
            </li>
            <li className="popup__rate-item">
              <div className="popup__rate-item-wrap">
                <label tabIndex={5}>
                  <input type="radio" name="оценка тренировки" aria-label="оценка 5." defaultValue={5} defaultChecked/>
                  <span className="popup__rate-number">5</span>
                </label>
              </div>
            </li>
          </ul>
          <div className="popup__feedback">
            <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
            <div className="popup__feedback-textarea">
              <div className="custom-textarea">
                <label>
                  <textarea name="description" placeholder=" " defaultValue={""} tabIndex={6}/>
                </label>
              </div>
            </div>
          </div>
          <div className="popup__button">
            <button className="btn" type="button" tabIndex={7}>Продолжить</button>
          </div>
        </div>
      </div>
    </section>
  )
}
