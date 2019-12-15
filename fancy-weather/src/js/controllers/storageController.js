export default {
  set(key, value) {
    localStorage.removeItem(key);
    localStorage.setItem(key, `${value}`);
  },
  get(key) {
    return localStorage.getItem(key);
  },
};
