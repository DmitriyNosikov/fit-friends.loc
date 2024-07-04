import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '@client/src/hooks';
import useAdditionalInfo from '@client/src/hooks/useAdditionalInfo';

import { getAdditionalInfo } from '@client/src/store/slices/user-process/user-process.selectors';
import { registerAction } from '@client/src/store/actions/api-user-action';

import RegistrationLocation from '@client/src/components/registration/registration-location/registration-location';
import RegistrationAvatar from '@client/src/components/registration/registration-avatar/registration-avatar';
import RegistrationRole from '@client/src/components/registration/registration-role/registration-role';
import RegistrationGender from '@client/src/components/registration/registration-gender/registration-gender';
import { clearFieldError, validateFields } from '../../validation/registration-validation';

import { CreateUserDTO } from '@shared/user';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@client/src/const';

export default function Registration() {
  useAdditionalInfo();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const additionalInfo = useAppSelector(getAdditionalInfo);
  const gender = additionalInfo?.gender;
  const location = additionalInfo?.location;
  const roles = additionalInfo?.roles;

  const userName = useRef<HTMLInputElement>(null);
  const userEmail = useRef<HTMLInputElement>(null);
  const userBirthDate = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);
  const [userAvatar, setUserAvatar] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [userGender, setUserGender] = useState('неважно');
  const [userRole, setUserRole] = useState('client');
  const policyAgreement = useRef<HTMLInputElement>(null);

  // Policy agreement
  const signUpBtn = document.querySelector('.sign-up__button');
  function handleChangePolicyAgreement() {
    const target = policyAgreement?.current?.checked;

    if(!target) {
      signUpBtn?.setAttribute('disabled', 'true');
      return;
    }

    signUpBtn?.removeAttribute('disabled');
  }

  // Form Submit
  async function handleFormSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const isPolicyAgreementChecked = policyAgreement?.current?.checked;

    if(!isPolicyAgreementChecked) {
      toast.warn('You have to agree with privacy policy');
      return;
    }

    const nameValue = userName?.current?.value;
    const emailValue = userEmail?.current?.value;
    const birthDateValue = userBirthDate?.current?.value;
    const passwordValue = userPassword?.current?.value;

    const userData = {
      avatar: userAvatar ?? '',
      name: nameValue,
      email: emailValue,
      birthDate: birthDateValue ? new Date(birthDateValue) : undefined,
      password: passwordValue,
      location: userLocation,
      gender: userGender,
      role: userRole,
    } as CreateUserDTO;

    const isFormHasErrors = validateFields(userData);

    if(isFormHasErrors) {
      toast.warn('Validation error. Please, correct marked fields and try send form again.');
    }

    dispatch(registerAction(userData))
      .then((result) => {
        if('error' in result) {
          return;
        }

        toast.success('You have been successfully registered. Try to LogIn right now :)');

        navigate(AppRoute.LOGIN);
      })
  }

  function handleFormFieldChange(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target;

    // При изменении поля, если на нем есть ошибка - очищаем ее
    clearFieldError(target as HTMLElement);
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
        <div className="popup-form popup-form--sign-up">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Регистрация</h1>
              </div>

              <div className="popup-form__form">
                <form name="registration" method="get" className="registration-form" onChange={handleFormFieldChange} onSubmit={handleFormSubmit}>
                  <div className="sign-up">

                    {/* User avatar */}
                    <RegistrationAvatar onAvatarUpload={setUserAvatar} />

                    <div className="sign-up__data">
                      <div className="custom-input" id="name">
                        <label>
                          <span className="custom-input__label">Имя</span>
                          <span className="custom-input__wrapper">
                            <input type="text" name="name" ref={userName} />
                          </span>
                          <span className="custom-input__error"></span>
                        </label>
                      </div>

                      <div className="custom-input" id="email">
                        <label>
                          <span className="custom-input__label">E-mail</span>
                          <span className="custom-input__wrapper">
                            <input type="email" name="email" ref={userEmail} />
                          </span>
                          <span className="custom-input__error"></span>
                        </label>
                      </div>

                      <div className="custom-input" id="birthDate">
                        <label>
                          <span className="custom-input__label">Дата рождения</span>
                          <span className="custom-input__wrapper">
                            <input type="date" name="birthday" max="2099-12-31" ref={userBirthDate} />
                          </span>
                          <span className="custom-input__error"></span>
                        </label>
                      </div>

                      {
                        // Location list
                        location &&  <RegistrationLocation locationList={location} onLocationCheck={setUserLocation} />
                      }

                      <div className="custom-input" id="password">
                        <label>
                          <span className="custom-input__label">Пароль</span>
                          <span className="custom-input__wrapper">
                            <input type="password" name="password" autoComplete="off" ref={userPassword} />
                          </span>
                          <span className="custom-input__error"></span>
                        </label>
                      </div>

                      {
                        // User gender
                        gender && <RegistrationGender genderList={gender} onGenderChange={setUserGender} />
                      }
                    </div>

                    {
                      // User roles
                      roles && <RegistrationRole roles={roles} onRoleChangeHandler={setUserRole} />
                    }

                    <div className="sign-up__checkbox">
                      <label>
                        <input type="checkbox" value="user-agreement" name="user-agreement" defaultChecked onChange={handleChangePolicyAgreement} ref={policyAgreement}/>
                        <span className="sign-up__checkbox-icon" >
                            <svg width="9" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-check"></use>
                            </svg>
                        </span>
                        <span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
                      </label>
                    </div>
                    <button className="btn sign-up__button" type="submit">Продолжить</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
