function cleanseString (str) {
  const lowerCase = str.toLowerCase();
  const replace = lowerCase.replace(/\s/g, '-');

  return replace;
}

export default cleanseString;