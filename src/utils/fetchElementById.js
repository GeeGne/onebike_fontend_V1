function fetchElementById (currentElement, dataInfo, fromElements) {
  
  return fromElements.filter(el => Number(el.dataset[dataInfo]) === Number(currentElement.dataset[dataInfo]))[0];
}

export default fetchElementById;