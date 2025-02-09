'use strict';

/**
 * Объединяет два объекта в один.
 * Если оба объекта содержат одинаковые ключи, и значения по этим ключам являются объектами,
 * то они должны быть объединены рекурсивно. Если значения не являются объектами,
 * то значение из второго объекта должно перезаписывать значение из первого.
 * @param {Object} obj1 - первый объект
 * @param {Object} obj2 - второй объект
 * 
 * @example
 * // returns { a: 1, b: 2, c: 3 }
 * deepMerge({ a: 1 }, { b: 2, c: 3 });
 * 
 * @returns {Object} - объединенный объект
 */

const deepMerge = (obj1, obj2) => {
  if (Array.isArray(obj2)) {
    return obj2;
  }

  if (typeof obj2 === 'object' && obj2!== null) {
    for (const key in obj2) {
      if (Object.prototype.hasOwnProperty.call(obj2, key)) {
        if (typeof obj2[key] === 'object' && obj2[key]!== null) {
          if (!obj1[key]) {
            obj1[key] = {};
          }
          obj1[key] = deepMerge(obj1[key], obj2[key]);
        } else {
          obj1[key] = obj2[key];
        }
      }
    }
  }

  return obj1;
};
