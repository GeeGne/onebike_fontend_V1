function removeDuplicates (duplicatedArray) {
  let filteredArray = []

  duplicatedArray.forEach(val => {
    let matchedItem;
    filteredArray.forEach(item => item === val && (matchedItem = true));
    matchedItem || (filteredArray = [...filteredArray, val]);
  })

  return filteredArray;
}

export default removeDuplicates;