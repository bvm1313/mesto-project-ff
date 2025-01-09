const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass ) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass );
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, popupFormConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(popupFormConfig.inputSelector));
  const buttonElement = formElement.querySelector(popupFormConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, popupFormConfig.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, popupFormConfig.inputErrorClass, popupFormConfig.errorClass);
      toggleButtonState(inputList, buttonElement, popupFormConfig.inactiveButtonClass);
    });
  });
};

export const enableValidation = (popupFormConfig) => {
  const formList = Array.from(document.querySelectorAll(popupFormConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, popupFormConfig);
  });
};

export const clearValidation = (formElement, popupFormConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(popupFormConfig.inputSelector));
  const buttonElement = formElement.querySelector(popupFormConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
   hideInputError(formElement, inputElement, popupFormConfig.inputErrorClass,
    popupFormConfig.errorClass)
  });
  // buttonElement.disabled = true;
  buttonElement.classList.add(popupFormConfig.inactiveButtonClass);
};