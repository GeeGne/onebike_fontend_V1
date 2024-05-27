function strSlashSplit (str) {
  const array = str.split('/');
  const filterFirstIndex = array.filter(val => val !== '');

  return filterFirstIndex;
}

export default strSlashSplit;