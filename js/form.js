import { isEscKey } from './util.js';
import { initEffectsModule, resetEffectsModule } from './effects.js';
import { sendData } from './api.js';
import { showSuccess, showError } from './messages.js';
import { validateHashtags, validateComments, hashtagsInput, commentInput, form } from './valid.js';

const uploadInput = form.querySelector('#upload-file');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('#upload-cancel');
const submitButton = form.querySelector('.img-upload__submit');
const previewImage = form.querySelector('.img-upload__preview img');
const body = document.body;

let pristine;

function onDocumentKeydown(evt) {
  if (isEscKey(evt)) {
    const isHashtagsFocused = document.activeElement === hashtagsInput;
    const isCommentFocused = document.activeElement === commentInput;

    if (isHashtagsFocused || isCommentFocused) {
      return;
    }

    evt.preventDefault();
    closeUploadForm();
  }
}

function onCloseButtonClick(evt) {
  evt.preventDefault();
  closeUploadForm();
}

function resetForm() {
  form.reset();
  resetEffectsModule();

  previewImage.src = 'img/upload-default-image.jpg';

  if (pristine) {
    pristine.reset();
  }
}

function closeUploadForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  resetForm();

  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
}

const openUploadForm = (file) => {
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();

    reader.onload = (event) => {
      previewImage.src = event.target.result;
    };

    reader.readAsDataURL(file);
  }

  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  initEffectsModule();

  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
};

const onFileInputChange = () => {
  if (uploadInput.files && uploadInput.files.length > 0) {
    const file = uploadInput.files[0];
    openUploadForm(file);
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
    showError(error.message);
  } finally {
    unblockSubmitButton();
  }
};

const initUploadForm = () => {
  uploadInput.addEventListener('change', onFileInputChange);
  form.addEventListener('submit', onFormSubmit);

  const pristineConfig = {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'form__item--invalid',
    successClass: 'form__item--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'span',
    errorTextClass: 'form__error'
  };

  pristine = new Pristine(form, pristineConfig);

  pristine.addValidator(
    hashtagsInput,
    validateHashtags,
    'Хэш-теги должны соответствовать правилам: начинаться с #, содержать только буквы/цифры, макс. 20 символов, не более 5 уникальных тегов'
  );

  pristine.addValidator(
    commentInput,
    validateComments,
    'Максимальная длина комментария - 140 символов'
  );

  hashtagsInput.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });

  commentInput.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });
};

export { initUploadForm, closeUploadForm };
