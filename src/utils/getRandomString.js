const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const chars = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

function getRandomString(length = 10, withNumber = false) {
  let allChars = chars;
  if (withNumber) {
    allChars = allChars.concat(numbers);
  }
  const charLength = allChars.length;
  let string = '';
  for (let i = 0; i < length; i += 1) {
    string += allChars[Math.floor(charLength * Math.random())];
  }
  return string;
}

export default getRandomString;
