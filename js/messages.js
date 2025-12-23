import { isEscKey } from './util.js';
import { onFormEscKeydown } from './form.js';

const messageTemplate = {
  error: document.querySelector('#error').content.querySelector('.error'),
  success: document.querySelector('#success').content.querySelector('.success'),
  dataError: null // Добавляем шаблон для ошибки данных
};

let messageElement = null;

// Создаём шаблон для ошибки данных, если он не существует в DOM
if (!messageTemplate.dataError) {
  messageTemplate.dataError = document.createElement('div');
  messageTemplate.dataError.className = 'data-error';
  messageTemplate.dataError.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 10px 3px;
    font-size: 30px;
    text-align: center;
    background-color: red;
    color: white;
  `;

  const message = document.createElement('p');
  message.textContent = 'Ошибка загрузки данных';
  messageTemplate.dataError.appendChild(message);
}

const onMessageEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const onDocumentClick = (evt) => {
  const inner = messageElement.querySelector('.success__inner, .error__inner');

  if (!inner || inner.contains(evt.target)) {
    return;
  }

  closeMessage();
};

function closeMessage() {
  if (!messageElement) {
    return;
  }

  messageElement.remove();
  messageElement = null;

  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onDocumentClick);

  document.addEventListener('keydown', onFormEscKeydown);
}

const showMessage = (type) => {
  messageElement = messageTemplate[type].cloneNode(true);
  messageElement.style.zIndex = '1000';
  // Для обычных error/success сообщений
  if (type === 'error' || type === 'success') {
    const button = messageElement.querySelector(`.${type}__button`);
    if (button) {
      button.addEventListener('click', closeMessage);
    }

    document.removeEventListener('keydown', onFormEscKeydown);
    document.addEventListener('keydown', onMessageEscKeydown);
    document.addEventListener('click', onDocumentClick);
  }
  // Для data-error не добавляем обработчики закрытия
  if (type === 'dataError') {
    // Автоматическое скрытие через 5 секунд
    setTimeout(closeMessage, 5000);
  }
  document.body.appendChild(messageElement);
};

const showSuccess = () => {
  showMessage('success');
};

const showError = (message) => {
  if (message === 'Не удалось загрузить фотографии. Попробуйте обновить страницу') {
    showMessage('dataError');
  } else {
    showMessage('error');
  }
};

export { showSuccess, showError };
