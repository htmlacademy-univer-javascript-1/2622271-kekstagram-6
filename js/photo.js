//генерация данных для фото

import { NAMES, MESSAGES, DESCRIPTIONS, PHOTO_COUNT } from './data.js';
import { getRandomInteger, getRandomArrayElement, getUniqueRandomIntegerGenerator } from './util.js';

//уникальные айди для комментариев
const generateCommentId = getUniqueRandomIntegerGenerator(1, 1000);

//создание комментария
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

//объекты фото
const createPhoto = (index) => {
  const commentsCount = getRandomInteger(0, 30);
  const comments = Array.from({length: commentsCount}, createComment);

  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: comments
  };
};

//все фотографии
const generatePhotos = () => Array.from({length: PHOTO_COUNT}, (_, index) => createPhoto(index + 1));

export { generatePhotos };
