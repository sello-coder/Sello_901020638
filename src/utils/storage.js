// Small helper functions keep localStorage code in one place.
export function loadData(key, fallbackValue) {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallbackValue;
  } catch (error) {
    console.error(`Could not load ${key} from localStorage.`, error);
    return fallbackValue;
  }
}

export function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Could not save ${key} to localStorage.`, error);
    alert("The browser could not save this data. Check available storage.");
  }
}

export function makeId(prefix = "item") {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}
