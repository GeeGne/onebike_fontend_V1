const localStorage = {
  get (key) {
    return JSON.parse(window.localStorage.getItem(key)) || null;
  },
  set (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export default localStorage;