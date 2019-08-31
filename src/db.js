import { readable, writable } from "svelte/store";

const inMemoryLocalStorage = (store = {}) => ({
  setItem: (k, v) => (store[k] = v),
  getItem: k => store[k]
});

let _localStorage;
try {
  _localStorage = localStorage;
} catch (e) {
  _localStorage = inMemoryLocalStorage();
}

class DB {
  constructor() {
    this.storage = _localStorage;
  }

  get(key, fallback) {
    const value = this.storage.getItem(key);
    return value === undefined ? fallback : JSON.parse(value);
  }

  set(key, valueOrFunction, fallback) {
    let value;
    if (valueOrFunction instanceof Function) {
      const prev = this.get(key, fallback);
      value = valueOrFunction(prev);
    } else {
      value = valueOrFunction;
    }
    this.storage.setItem(key, JSON.stringify(value));
    return value;
  }

  has(key) {
    return this.storage[key] !== undefined;
  }

  getsert(key, valueOrFunction) {
    let value;
    if (!this.has(key)) {
      if (valueOrFunction instanceof Function) {
        value = valueOrFunction(key);
      } else {
        value = valueOrFunction;
      }
      this.set(key, value);
    }
    return this.get(key);
  }

  writable(key, valueOrFunction) {
    const value = writable(this.getsert(key, valueOrFunction));
    value.subscribe(current => {
      this.set(key, current);
    });
    return value;
  }
}

export default new DB();
