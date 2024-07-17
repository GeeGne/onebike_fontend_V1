function getCurrentDateFormat () {
  const today = new Date();
  const day = today.getDate();
  const month = String((today.getMonth() + 1)).padStart(2, '0');
  const year = String(today.getFullYear()).padStart(2, '0');
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const seconds = String(today.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export default getCurrentDateFormat;




