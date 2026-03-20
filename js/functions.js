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

//задание 5.16.
//функция переводит строчную запись времени часы минуты в число минут
function transformToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

//функция проверят не выходит ли начало и конец встречи за рамки начала и конца рабочего для
function isMeetingOnWorkDay(timeStartWorkDay, timeEndWorkDay, timeStartMeeting, durationMeeting) {
  const startWork = transformToMinutes(timeStartWorkDay); //480
  const endWork = transformToMinutes(timeEndWorkDay); //1050
  const startMeeting = transformToMinutes(timeStartMeeting); //840

  const endMeeting = startMeeting + durationMeeting; //930

  return startMeeting >= startWork && endMeeting <= endWork;
}//возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.

isMeetingOnWorkDay('08:00', '17:30', '14:00', 90); // true
isMeetingOnWorkDay('8:0', '10:0', '8:0', 120); // true
isMeetingOnWorkDay('08:00', '14:30', '14:00', 90); // false
isMeetingOnWorkDay('14:00', '17:30', '08:0', 90); // false
isMeetingOnWorkDay('8:00', '17:30', '08:00', 900); // false
