// вспомогательные функции

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getUniqueRandomIntegerGenerator = (min, max) => {
  const usedValues = new Set();

  return () => {
    let newValue;

    do {
      newValue = getRandomInteger(min, max);
    } while (usedValues.has(newValue));

    usedValues.add(newValue);
    return newValue;
  };
};

export{ getRandomInteger, getRandomArrayElement, getUniqueRandomIntegerGenerator};
