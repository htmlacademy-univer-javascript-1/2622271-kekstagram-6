const NAMES = [
  'Даша',
  'Маша',
  'Саша',
  'Дима',
  'Аня'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Описание 1',
  'Описание 2',
  'Описание 3',
  'Описание 4',
  'Описание 5',
  'Описание 6'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


// Генератор ID для комментариев
const getCommentsId = () => {
  const usedId = new Set();

  return () => {
    let newId;

    newId = getRandomInteger(1, 1000);
    while (usedId.has(newId)){
      newId = getRandomInteger(1, 1000);
    };

    usedId.add(newId);
    return newId;
  };
};

const сommentsId = getCommentsId();

//комментарий
const createComment = () => ({
  id: сommentsId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

// создание объекта фото
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

const generatePhotos = () => Array.from({length: 25}, (_, index) => createPhoto(index + 1));

const photos = generatePhotos();

console.log(photos);

//только через table видно результат почему то
//console.table(photos);
//console.table(photos[0].comments);
