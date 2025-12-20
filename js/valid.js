import { checkStringLength } from './util.js';

const form = document.querySelector('.img-upload__form');
const hashtagsInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const validateHashtagFormat = (hashtag) => {
  if (hashtag.length === 0) {
    return true;
  }

  if (hashtag === '#') {
    return false;
  }

  if (!hashtag.startsWith('#')) {
    return false;
  }

  if (hashtag.length > 20) {
    return false;
  }

  const content = hashtag.slice(1);
  if (content.length === 0) {
    return false;
  }

  const validPattern = /^[a-zA-Zа-яА-ЯёЁ0-9]+$/;
  return validPattern.test(content);
};

const validateHashtagUnique = (hashtags) => {
  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);
  return uniqueHashtags.size === hashtags.length;
};

const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().split(/\s+/).filter((tag) => tag !== '');

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

export {
  validateHashtags,
  validateComments,
  hashtagsInput,
  commentInput,
  form
};
