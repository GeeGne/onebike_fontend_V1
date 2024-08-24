function fetchElementById (currentElement, dataInfo, fromElements) {
  
  return fromElements.filter(el => el.dataset[dataInfo] === currentElement.dataset[dataInfo])[0];
}

export default fetchElementById;