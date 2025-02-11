'use strict';

/**
 * Функция, фильтрует объект по ключам который есть в массиве
 * @param {Object} obj - объект который нужно фильтровать
 * @param {Array<String>} keys - массив с ключами
 *
 * @example
 * // returns { a: 1, c: 3 }
 * filterByKeys({ a: 1, b: 2, c: 3 }, ['a', 'c']);
 *
 * @returns {Object}
 */
const filterByKeys = (obj, keys) => {
  const NewObj = {};

  Object.keys(obj).forEach((i) => {
    if (keys.includes(i)) {
      NewObj[i] = obj[i];
      }
    });
  return NewObj;
};

