import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '@client/src/hooks';

import ScrollToTop from '../tools/scroll-to-top/scroll-to-top';

import { setBodyScrollAvailable } from '@client/src/utils/common';
import { validateFields } from '@client/src/validation/validation-tools';

import { CreateTrainingReviewDTO } from '@shared/training-review';
import { reviewPopupValidationSchema } from '@client/src/validation/review-popup-validation';
import { getUserInfo } from '@client/src/store/slices/user-process/user-process.selectors';

import { addTrainingReviewsAction } from '@client/src/store/actions/api-training-review-action';

type PopupReviewProps = {
  onClose?: Function
}

export default function PopupReview({ onClose }: PopupReviewProps): ReactElement {
  const dispatch = useAppDispatch();
  const params = useParams()
  const trainingId = params.trainingId
  const userInfo = useAppSelector(getUserInfo);

  const sendBtn = document.querySelector('.popup__button_send') as HTMLButtonElement;
  const closeBtn = document.querySelector('.popup__button_close') as HTMLButtonElement;

  initPopup();

  function initPopup() {
    document.addEventListener('keydown', handleEscapeKeydown);
    document.addEventListener('keydown', handleTabKeydown);
  }

  function closePopup() {
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
      sendBtn.focus();
    }

    if(isSendBtn && !e.shiftKey) {
      e.preventDefault();
      closeBtn.focus();
    }
  }

  function handleClosePopupBtnClick() {
    if(onClose) {
      onClose();
    }

    closePopup();
  }

  function handleFormSubmit() {
    if (!userInfo || !trainingId) {
      return;
    }

    const rating = document.querySelector('#rating input[type="radio"]:checked') as HTMLInputElement;
    const text = document.querySelector('#text textarea') as HTMLTextAreaElement;

    const reviewData = {
      userId: userInfo.id,
      trainingId,
      rating: Number(rating?.value ?? null),
      text: text.value
    };

    const isFormHasErrors = validateFields<CreateTrainingReviewDTO>(reviewData, reviewPopupValidationSchema);

    if(isFormHasErrors) {
      toast.warn('Validation error. Please, correct marked fields and try send form again.');

      return;
    }

    dispatch(addTrainingReviewsAction(reviewData))
      .then((result) => {
        if ('error' in result) {
          return;
        }

        toast.success('Review has bees successfully added');

        rating.value = '5';
        text.value = '';
        closePopup();
      })
  }

  return (
    <section className="popup">
      <ScrollToTop />

      <div className="popup__wrapper">
        <div className="popup-head">
          <h2 className="popup-head__header">Оставить отзыв</h2>
          <button className="btn-icon btn-icon--outlined btn-icon--big popup__button_close" type="button" aria-label="close" onClick={handleClosePopupBtnClick} tabIndex={1}>
            <svg width={20} height={20} aria-hidden="true">
              <use xlinkHref="#icon-cross" />
            </svg>
          </button>
        </div>
        <div className="popup__content popup__content--feedback">
          <h3 className="popup__feedback-title">Оцените тренировку</h3>
          <div>

            <ul className="popup__rate-list" id="rating">
              <li className="popup__rate-item">
                <div className="popup__rate-item-wrap">
                  <label tabIndex={2}>
                    <input type="radio" name="оценка тренировки" aria-label="оценка 1." defaultValue={1} />
                    <span className="popup__rate-number">1</span>
                  </label>
                </div>
              </li>
              <li className="popup__rate-item">
                <div className="popup__rate-item-wrap">
                  <label tabIndex={3} >
                    <input type="radio" name="оценка тренировки" aria-label="оценка 2." defaultValue={2} />
                    <span className="popup__rate-number">2</span>
                  </label>
                </div>
              </li>
              <li className="popup__rate-item">
                <div className="popup__rate-item-wrap">
                  <label tabIndex={4}>
                    <input type="radio" name="оценка тренировки" aria-label="оценка 3." defaultValue={3} />
                    <span className="popup__rate-number">3</span>
                  </label>
                </div>
              </li>
              <li className="popup__rate-item">
                <div className="popup__rate-item-wrap">
                  <label tabIndex={5}>
                    <input type="radio" name="оценка тренировки" aria-label="оценка 4." defaultValue={4} />
                    <span className="popup__rate-number">4</span>
                  </label>
                </div>
              </li>
              <li className="popup__rate-item">
                <div className="popup__rate-item-wrap">
                  <label tabIndex={6}>
                    <input type="radio" name="оценка тренировки" aria-label="оценка 5." defaultValue={7} defaultChecked />
                    <span className="popup__rate-number">5</span>
                  </label>
                </div>
              </li>
            </ul>
            <span className="custom-input__error"></span>
          </div>
          <div className="popup__feedback">
            <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
            <div className="popup__feedback-textarea" id="text">
              <div className="custom-textarea">
                <label>
                  <textarea name="description" placeholder=" " defaultValue={""} autoFocus tabIndex={8} />
                </label>
              </div>
              <span className="custom-input__error"></span>
            </div>
          </div>
          <div className="popup__button">
            <button className="btn popup__button_send" type="button" onClick={handleFormSubmit} tabIndex={9}>Продолжить</button>
          </div>
        </div>
      </div>
    </section>
  )
}
