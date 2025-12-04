import { checkStringLength } from './util.js';

const form = document.querySelector('.img-upload__form');
const hashtagsInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});


const validateHashtagFormat = (hashtag) => {
  if (hashtag.length === 0) return true;

  if (hashtag === '#') return false;

  if (!hashtag.startsWith('#')) return false;

  if (hashtag.length > 20) return false;

  const content = hashtag.slice(1);
  if (content.length === 0) return false;

  const validPattern = /^[a-zA-Zа-яА-ЯёЁ0-9]+$/;
  return validPattern.test(content);
};

const validateHashtagUnique = (hashtags) => {
  const lowerCaseHashtags = hashtags.map(tag => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);
  return uniqueHashtags.size === hashtags.length;
};


const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().split(/\s+/).filter(tag => tag !== '');

  // Проверка на количество хэштегов
  if (hashtags.length > 5) {
    return false;
  }

  // Проверка каждого хэштега
  for (const hashtag of hashtags) {
    if (!validateHashtagFormat(hashtag)) {
      return false;
    }
  }

  // Проверка на уникальность
  if (!validateHashtagUnique(hashtags)) {
    return false;
  }

  return true;
};

function validateComments(value) {
  if (value.trim() === '') {
    return true;
  }
  return checkStringLength(value, 140);
}

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

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});


