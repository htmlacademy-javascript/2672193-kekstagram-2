function checkLengthString(string, maxLength) {
  return string.length <= maxLength; // .length считает количество символов
}
checkLengthString('проверяемая строка', 20); // true
checkLengthString('проверяемая строка', 18); // true
checkLengthString('проверяемая строка', 10); // false
checkLengthString('Привет, мир!', 15); // true
checkLengthString('Февраль', 5); // false
/*
console.log(checkLengthString('проверяемая строка', 20)); // true
console.log(checkLengthString('проверяемая строка', 18)); // true
console.log(checkLengthString('проверяемая строка', 10)); // false
console.log(checkLengthString('Привет, мир!', 15)); // true
console.log(checkLengthString('Февраль', 5)); // false
*/

function checkPalindrome(string) {
  const convertedString = string.replaceAll(' ', '').toLowerCase(); // .replaceAll меняет пробелы на ничего
  let sampleString = '';
  for (let i = convertedString.length - 1; i >= 0; i--) {
    sampleString += convertedString[i]; // [] обращение к конкретному символу строки по индексу (положение в строке)
  }
  return convertedString === sampleString;
}

checkPalindrome('топот'); // true
checkPalindrome('ДовОд'); // true
checkPalindrome('Кекс'); // false
checkPalindrome('Лёша на полке клопа нашёл '); // true
checkPalindrome('Привет, мир!'); // false
checkPalindrome('Февраль'); // false
/*
console.log(checkPalindrome('топот')); // true
console.log(checkPalindrome('ДовОд')); // true
console.log(checkPalindrome('Кекс')); // false
console.log(checkPalindrome('Лёша на полке клопа нашёл ')); // true
console.log(checkPalindrome('Привет, мир!')); // false
console.log(checkPalindrome('Февраль')); // false
*/
