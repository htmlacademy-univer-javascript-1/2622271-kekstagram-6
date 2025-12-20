import { isEscKey } from './util.js';

const messageTemplate = {
  error: document.querySelector('#error').content.querySelector('.error'),
  success: document.querySelector('#success').content.querySelector('.success')
};

const showMessage = (type, text = '') => {
  const messageElement = messageTemplate[type].cloneNode(true);

  if (text) {
    const titleElement = messageElement.querySelector(`.${type}__title`);
    titleElement.textContent = text;
  }

  const buttonElement = messageElement.querySelector(`.${type}__button`);

  const closeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  const onDocumentKeydown = (evt) => {
    if (isEscKey(evt)) {
      closeMessage();
    }
  };

  const onDocumentClick = (evt) => {
    if (!messageElement.contains(evt.target)) {
      closeMessage();
    }
  };

  buttonElement.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);

  document.body.appendChild(messageElement);
};

const showError = (text) => {
  showMessage('error', text);
};

const showSuccess = () => {
  showMessage('success');
};

export { showError, showSuccess };
