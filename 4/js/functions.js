
function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}

console.log( checkStringLength('проверяемая строка', 20));
console.log( checkStringLength('проверяемая строка', 18));
console.log( checkStringLength('проверяемая строка', 10));

function isPallindrom(str){
  str = str.toLowerCase().split(' ').join('');
  return str=== str.split('').reverse().join('');
}

console.log(isPallindrom('топот')); // true
console.log(isPallindrom('ДовОд')); // true
console.log(isPallindrom('Кекс'));  // false

console.log(isPallindrom('Лёша на полке клопа нашёл ')); // true

function findNumbers (str){

  if (typeof str === 'number') {
    str = str.toString();
  }

  const digits = str.replace(/\D/g, '');

  if (digits === '') {
    return NaN;
  }

  return parseInt(digits, 10);
}

console.log(findNumbers('2023 год'));
console.log(findNumbers('ECMAScript 2022'));
console.log(findNumbers('1 кефир, 0.5 батона'));
console.log(findNumbers('агент 007'));
console.log(findNumbers(2023));
console.log(findNumbers(-1));
console.log(findNumbers(15));
