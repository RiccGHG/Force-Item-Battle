import { system, world } from "@minecraft/server";

export class DataBase {
  #identifier;
  #data;
  /**
   *
   * @param {string} identifier An unique identifier
   */
  constructor(identifier) {
    system.run(() => {
      this.#identifier = identifier;
    let data = world.getDynamicProperty(identifier);
    try {
      this.#data = JSON.parse(data);
    } catch {
      this.#data = {};
    }
    })
  }
  #validKey(key) {
    if (typeof key !== "string" && typeof key !== "number") return false;
    return true;
  }
  /**
   *
   * @param {string | number} key
   * @param {any} value
   */
  set(key, value) {
    if (!this.#validKey(key))
      return console.error(
        `Can not save Data\n for identifier: ${this.#identifier} Invalid Key, must be string or number. Key: ${key}`,
      );
    this.#data[key] = value;
    world.setDynamicProperty(this.#identifier, JSON.stringify(this.#data));

  }
  /**
   *
   * @param {string | number} key
   */
  get(key) {
    if (!this.#validKey(key))
      return console.error(
        `Can not save Data\n for identifier: ${this.#identifier} Invalid Key, must be string or number. Key: ${key}`,
      );
    return this.#data[key];
  }
  has(key) {
    if (!this.#validKey(key))
      return console.error(
        `Can not save Data\n for identifier: ${this.#identifier} Invalid Key, must be string or number. Key: ${key}`,
      );
    const data = this.get(key);
    if (data) return true;
    return false;
  }
  delete(key) {
    if (!this.#validKey(key))
      return console.error(
        `Can not save Data\n for identifier: ${this.#identifier} Invalid Key, must be string or number. Key: ${key}`,
      );
    if (!this.has(key))
      return console.error(
        `Can not delete Data\n for identifier: ${this.#identifier} Key does not exist. Key: ${key}`,
      );
    this.#data[key] = undefined;
    world.setDynamicProperty(this.#identifier, JSON.stringify(this.#data));
  }
  keys() {
    const keys = Object.keys(this.#data);
    return keys;
  }
  values() {
    const values = Object.values(this.#data);
    return values;
  }
  entries() {
    const entries = Object.entries(this.#data);
    return entries;
  }
  clear() {
    this.#data = {};
    world.setDynamicProperty(this.#identifier, JSON.stringify(this.#data));
  }
  size() {
    const array = this.keys();
    return array.length;
  }
  /**
   * 
   * @param {(key: string, value: *) => *} callback 
   */
  forEach(callback) {
    Object.entries(this.#data).forEach(([key, value]) => callback(key, value));
  }
}