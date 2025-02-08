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
 */
function filterObjectByKeys(obj, keys) {
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}
