const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function isEscKey(evt) {
  return evt.key === 'Escape';
}

function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}


export{
  getRandomInteger,
  isEscKey,
  checkStringLength
};
