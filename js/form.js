//для загрузки изображения

import { isEscKey } from './util.js';
import { initEffectsModule, resetEffectsModule } from './effects.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('#upload-file');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('#upload-cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const body = document.body;

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  initEffectsModule();

  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  form.reset();

  resetEffectsModule();

  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
};

const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    const isHashtagsFocused = document.activeElement === hashtagsInput;
    const isCommentFocused = document.activeElement === commentInput;

    if (isHashtagsFocused || isCommentFocused) {
      return;
    }

    evt.preventDefault();
    closeUploadForm();
  }
};

const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeUploadForm();
};

const onFileInputChange = () => {
  if (uploadInput.files && uploadInput.files.length > 0) {
    //подстановка фото

    openUploadForm();
  }
};

const initUploadForm = () => {
  uploadInput.addEventListener('change', onFileInputChange);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(form);

    // отправка на сервер
    // closeUploadForm();
  });
};

export { initUploadForm, closeUploadForm };
