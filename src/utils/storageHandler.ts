export function updateLocalStorage(key: string, value: Array<string>) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function getDataFromLocalStorage(
  key: string,
  defaultValue?: Array<string>
) {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  localStorage.setItem(key, JSON.stringify(defaultValue));
  return defaultValue;
}
