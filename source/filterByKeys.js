"use strict";

/**
 * Функция для фильтрирования объекта, оставляя только указанные ключи.
 * @param {Object} obj - Исходный объект.
 * @param {string[]} keys - Массив ключей, которые должны остаться в новом объекте.
 *
 * @example
 * // returns { a: 1, c: 3 }
 * filterObjectByKeys({ a: 1, b: 2, c: 3 }, ['a', 'c']);
 *
 * @returns {Object} Новый объект, содержащий только указанные ключи из исходного объекта.
 * @throws {TypeError} Если входные параметры не соответствуют ожидаемым типам.
 */
const filterObjectByKeys = (obj, keys) => {
  if (obj === null || typeof obj !== "object") {
    throw new TypeError("Функция принимает только объект первым аргументом.");
  }

  if (!Array.isArray(keys)) {
    throw new TypeError(
      "Функция принимает только массив ключей вторым аргументом."
    );
  }

  return keys.reduce((acc, key) => {
    if (typeof key !== "string") {
      throw new TypeError(`Ключ "${key}" должен быть строкой.`);
    }

    if (key in obj) {
      acc[key] = deepClone(obj[key]);
    }
    return acc;
  }, {});
};

/**
 * Глубокое копирование объекта или массива при помощи рекурсии.
 *
 * @param {*} value - Исходное значение (примитив, объект или массив).
 *
 * @example
 * const obj = { a: 1, b: { c: 2 } };
 * const copy = deepClone(obj);
 * console.log(copy); // { a: 1, b: { c: 2 } }
 * console.log(copy === obj); // false (новый объект)
 * console.log(copy.b === obj.b); // false (новый вложенный объект)
 *
 * @returns {*} Глубокая копия переданного значения.
 */
const deepClone = (value) => {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(deepClone);
  }

  const copy = {};
  for (const key in value) {
    copy[key] = deepClone(value[key]);
  }

  return copy;
};
