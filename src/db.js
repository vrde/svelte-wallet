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

  getsert(key, fallback) {
    if (!this.has(key)) {
      this.set(key, fallback);
    }
    return this.get(key);
  }
}

export default new DB();
