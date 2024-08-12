import Joi from 'joi';
import { toast } from 'react-toastify';

const ERROR_CLASS = {
  FIELD: 'custom-input--error',
  TEXT_BOX: 'custom-input__error'
}

/**
 * Для отображения текста ошибки, необходимо добавить <span className="custom-input__error"></span>
 * в контейнер с валидируемым полем, а также добавить уникальный идентификатор id="" на контейнер с
 * валидируемым полем. Название идентификатора должно быть равно соответствующему ключу в валидируемом
 * объекте
 */

export function validateFields<T>(
  target: T,
  validationSchema: Joi.ObjectSchema<any>,
  preserveErrorTextFieldContent: boolean = false, // Сохранять текст, который предустановлен в поле с ошибкой
  showErrorToasts: boolean = true // Показывать всплывающие окна с ошибкой
): [boolean, string[] | []] {
  clearErrors();
  const validationErrors = validationSchema.validate(target, { abortEarly: false });

  let isFieldsHasErrors = false;
  let errorMessages: string[] | [] = [];

  if (validationErrors.error?.details) {
    isFieldsHasErrors = true;

    const errorDetails = validationErrors.error.details;

    errorDetails.forEach((error) => {
      const inputContainerId = error.context?.key;
      const inputContainer = document.querySelector(`#${inputContainerId}`);
      const errorTextBox = inputContainer?.querySelector(`.${ERROR_CLASS.TEXT_BOX}`);

      if (errorTextBox && error.message) {
        // Если в поле с ошибкой указан какой то стандартный текст
        // сохраняем его
        if(!errorTextBox.textContent || !preserveErrorTextFieldContent) {
          errorTextBox.textContent = error.message;
        }

        inputContainer?.classList.add(ERROR_CLASS.FIELD);
      }
    });

    errorMessages = errorDetails.map((error) => error.message);
  }

  if(showErrorToasts && errorMessages.length > 0) {
    toast.error('Validation error');
    errorMessages.forEach((error) => toast.warn(error))
    toast.info(`Please, correct marked fields and try send form again.`);
  }

  return [isFieldsHasErrors, errorMessages];
}

export function clearErrors() {
  const fieldsWithErrors = document.querySelectorAll(`.${ERROR_CLASS.FIELD}`);

  fieldsWithErrors.forEach((errorField) => errorField.classList.remove(ERROR_CLASS.FIELD));
}

export function clearFieldError(target: HTMLElement) {
  const errorContainer = target.closest(`.${ERROR_CLASS.FIELD}`);

  if (errorContainer) {
    errorContainer.classList.remove(ERROR_CLASS.FIELD);
  }
}
