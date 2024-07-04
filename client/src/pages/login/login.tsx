import { AppRoute } from '@client/src/const';
import { useAppDispatch } from '@client/src/hooks';
import { loginAction } from '@client/src/store/actions/api-user-action';
import { LoginUserDTO } from '@shared/user';
import { ReactElement, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CHANGE_FORM_TIMEOUT = 50;

export default function Login(): ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userEmail = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);

  if((userEmail.current?.value && userPassword.current?.value)) {
    disableSubmitBtn(false);
  }

  function handleFormChange(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement;

    if(timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      if(
        (target.type === 'email' || target.type === 'password')
        && (!userEmail.current?.value || !userPassword.current?.value)
      ) {
        disableSubmitBtn(true)
        return;
      }

      disableSubmitBtn(false)
    }, CHANGE_FORM_TIMEOUT)
  }

  function handleFormSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if(!userEmail.current || !userPassword.current) {
      return false;
    }

    const userLoginData: LoginUserDTO = {
      email: userEmail.current.value,
      password: userPassword.current.value,
    };

    dispatch(loginAction(userLoginData))
      .then((result) => {
        if('error' in result) {
          return;
        }

        toast.info('You have been successfully authorized');

        navigate(AppRoute.MAIN);
      });
  }

  let timer: NodeJS.Timeout | null = null;

  function disableSubmitBtn(disable = false) {
    const submitBtn = document.querySelector('.sign-in__button');

    if(disable) {
      submitBtn?.setAttribute('disabled', 'true');
      return;
    }

    submitBtn?.removeAttribute('disabled');
  }

  return (
    <>
      <div className="background-logo">
          <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
            <use xlinkHref="#logo-big"></use>
          </svg>
          <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
            <use xlinkHref="#icon-logotype"></use>
          </svg>
        </div>
        <div className="popup-form popup-form--sign-in">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Вход</h1>
              </div>
              <div className="popup-form__form">
                <form method="get" onSubmit={handleFormSubmit} onChange={handleFormChange}>
                  <div className="sign-in">

                    <div className="custom-input sign-in__input">
                      <label>
                        <span className="custom-input__label">E-mail</span>
                        <span className="custom-input__wrapper">
                          <input type="email" name="email" ref={userEmail} required/>
                        </span>
                      </label>
                    </div>

                    <div className="custom-input sign-in__input">
                      <label>
                        <span className="custom-input__label">Пароль</span>
                        <span className="custom-input__wrapper">
                          <input type="password" name="password" ref={userPassword} required/>
                        </span>
                      </label>
                    </div>

                    <button className="btn sign-in__button" type="submit" disabled>Продолжить</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
