import { isEscKey } from './util.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('#upload-file');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('#upload-cancel');
const body = document.body;

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  form.reset();

  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
};

const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeUploadForm();
};

// Обработчик выбора файла
const onFileInputChange = () => {
  if (uploadInput.files && uploadInput.files.length > 0) {
    //подстановка изображения
    openUploadForm();
  }
};

// Инициализация формы
const initUploadForm = () => {
  uploadInput.addEventListener('change', onFileInputChange);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    //обработка отправки формы
    console.log('Форма отправлена');
  });
};

export { initUploadForm, closeUploadForm };
