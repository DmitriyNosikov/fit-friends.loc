import Joi from 'joi';

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

export function validateFields<T>(target: T, validationSchema: Joi.ObjectSchema<any>) {
  clearErrors();

  const validationErrors = validationSchema.validate(target, { abortEarly: false });

  let isFieldsHasErrors = false;

  if (validationErrors.error?.details) {
    isFieldsHasErrors = true;

    const errorDetails = validationErrors.error.details;

    errorDetails.forEach((error) => {
      const inputContainerId = error.context?.key;
      const inputContainer = document.querySelector(`#${inputContainerId}`);
      const errorTextBox = inputContainer?.querySelector(`.${ERROR_CLASS.TEXT_BOX}`);

      if (errorTextBox && error.message) {
        errorTextBox.textContent = error.message;
        inputContainer?.classList.add(ERROR_CLASS.FIELD);
      }
    });

  }

  return isFieldsHasErrors;
}

export function clearErrors() {
  const fieldsWithErorrs = document.querySelectorAll(`.${ERROR_CLASS.FIELD}`);

  fieldsWithErorrs.forEach((errorField) => errorField.classList.remove(ERROR_CLASS.FIELD));
}

export function clearFieldError(target: HTMLElement) {
  const errorContainer = target.closest(`.${ERROR_CLASS.FIELD}`);

  if (errorContainer) {
    errorContainer.classList.remove(ERROR_CLASS.FIELD);
  }
}
