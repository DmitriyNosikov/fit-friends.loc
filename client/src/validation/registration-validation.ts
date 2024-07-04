import { CreateUserDTO } from '@shared/user';
import Joi from 'joi';

const ERROR_CLASS = {
  FIELD: 'custom-input--error',
  TEXT_BOX: 'custom-input__error'
}

export const UserValidation = {
NAME: {
  MIN_LENGTH: 1,
  MAX_LENGTH: 15,
},
PASSWORD: {
  MIN_LENGTH: 6,
  MAX_LENGTH: 12,
},
DESCRIPTION: {
  MIN_LENGTH: 10,
  MAX_LENGTH: 140,
},
LOSE_CALORIES: {
  MIN: 1000,
  MAX: 5000,
},
DAY_CALORIES: {
  MIN: 1000,
  MAX: 5000,
},
TRAINING_TYPE: {
  MIN_COUNT: 1,
  MAX_COUNT: 3
},
ALLOWED_IMG_EXT: ['jpg', 'jpeg', 'png']
} as const;

export const registrationValidationSchema = Joi.object({
  name: Joi.string()
    .min(UserValidation.NAME.MIN_LENGTH)
    .max(UserValidation.NAME.MAX_LENGTH)
    .required(),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  password: Joi.string()
    .min(UserValidation.PASSWORD.MIN_LENGTH)
    .max(UserValidation.PASSWORD.MAX_LENGTH)
    .required(),

  birthDate: Joi.date()
    .required(),

  role: Joi.string()
    .required(),

  gender: Joi.string()
    .required(),

  location: Joi.string()
    .required()
});


export function validateFields(target: CreateUserDTO) {
  // clearErrors();

  const validationErrors = registrationValidationSchema.validate(target, { abortEarly: false });

  if(validationErrors.error?.details) {
    const errorDetails = validationErrors.error.details;

    errorDetails.forEach((error) => {
      const inputContainerId = error.context?.key;
      const inputContainer = document.querySelector(`#${inputContainerId}`);
      const errorTextBox = inputContainer?.querySelector(`.${ERROR_CLASS.TEXT_BOX}`);

      if(errorTextBox && error.message) {
        errorTextBox.textContent = error.message;
        inputContainer?.classList.add(ERROR_CLASS.FIELD);
      }
   });

   return false;
  }

  return true;
}

export function clearErrors() {
  const fieldsWithErorrs = document.querySelectorAll(`.${ERROR_CLASS.FIELD}`);

  fieldsWithErorrs.forEach((errorField) => errorField.classList.remove(ERROR_CLASS.FIELD));
}

export function clearFieldError(target: HTMLElement) {
  const errorContainer = target.closest(`.${ERROR_CLASS.FIELD}`);

  if(errorContainer) {
    errorContainer.classList.remove(ERROR_CLASS.FIELD);
  }
}
