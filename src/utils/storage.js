export const loadLS = (k) => {
  try {
    const raw = localStorage.getItem(k);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};
export const saveLS = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch(e) {}
};
