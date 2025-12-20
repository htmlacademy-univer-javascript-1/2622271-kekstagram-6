import { isEscKey } from './util.js';

const messageTemplate = {
  error: document.querySelector('#error').content.querySelector('.error'),
  success: document.querySelector('#success').content.querySelector('.success')
};

let messageElement = null;

const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const onDocumentClick = (evt) => {
  if (messageElement && !messageElement.contains(evt.target)) {
    closeMessage();
  }
};

const closeMessage = () => {
  if (messageElement) {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
    messageElement = null;
  }
};

const showMessage = (type, text = '') => {
  messageElement = messageTemplate[type].cloneNode(true);

  if (text) {
    const titleElement = messageElement.querySelector(`.${type}__title`);
    titleElement.textContent = text;
  }

  const buttonElement = messageElement.querySelector(`.${type}__button`);
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
