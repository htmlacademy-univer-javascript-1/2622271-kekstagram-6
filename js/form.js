import { isEscKey } from './util.js';
import { initEffectsModule, resetEffectsModule } from './effects.js';
import { sendData } from './api.js';
import { showSuccess, showError } from './messages.js';
import {
  validateHashtags,
  validateComments,
  hashtagsInput,
  commentInput,
  form
} from './valid.js';

const uploadInput = form.querySelector('#upload-file');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('#upload-cancel');
const submitButton = form.querySelector('.img-upload__submit');
const previewImage = form.querySelector('.img-upload__preview img');
const effectPreviews = form.querySelectorAll('.effects__preview');
const body = document.body;

let pristine;

const onFormEscKeydown = (evt) => {
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

function onCloseButtonClick(evt) {
  evt.preventDefault();
  closeUploadForm();
}

function resetForm() {
  form.reset();
  uploadInput.value = '';
  resetEffectsModule();
  previewImage.src = 'img/upload-default-image.jpg';
  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = 'url("img/upload-default-image.jpg")';
  });

  if (pristine) {
    pristine.reset();
  }
}

function closeUploadForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  resetForm();

  document.removeEventListener('keydown', onFormEscKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
}

const updateEffectPreviews = (imageUrl) => {
  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${imageUrl})`;
  });
};

const openUploadForm = (file) => {
  if (file && file.type.startsWith('image/')) {
    const imageUrl = URL.createObjectURL(file);
    previewImage.src = imageUrl;
    updateEffectPreviews(imageUrl);
  }

  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  initEffectsModule();

  document.addEventListener('keydown', onFormEscKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
};

const onFileInputChange = () => {
  if (uploadInput.files.length > 0) {
    openUploadForm(uploadInput.files[0]);
  }
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  blockSubmitButton();

  try {
    const formData = new FormData(form);
    await sendData(formData);

    showSuccess();
    closeUploadForm();
  } catch (error) {
    showError();
  } finally {
    unblockSubmitButton();
  }
};

const initUploadForm = () => {
  uploadInput.addEventListener('change', onFileInputChange);
  form.addEventListener('submit', onFormSubmit);

  pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'form__error'
  });

  pristine.addValidator(
    hashtagsInput,
    validateHashtags,
    'Некорректные хэш-теги'
  );

  pristine.addValidator(
    commentInput,
    validateComments,
    'Длина комментария не более 140 символов'
  );
};

export { initUploadForm, closeUploadForm, onFormEscKeydown };
