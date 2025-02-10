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
    if (key in obj) {
      acc[key] = structuredClone(obj[key]);
    }
    return acc;
  }, {});
};
