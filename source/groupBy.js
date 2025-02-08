'use strict';

 /**
  * Функция возвращающает объект, где ключи - уникальные значения по свойству groupKey,
  * а значения — массивы объектов, соответствующих этим ключам.
  * 
  * @param {Array<Object>} arr - массив объектов для группировки
  * @param {string} groupKey - имя свойства объектов, по которому производится группировка 
  * 
  * @example
  * const data = [
  *     { category: 'fruit', name: 'apple' },
  *     { category: 'fruit', name: 'banana' },
  *     { category: 'vegetable', name: 'carrot' },
  * ];
  * groupBy(data, 'category');
  * 
  * // returns
  * {
  *     fruit: [
  *         { category: 'fruit', name: 'apple' },
  *         { category: 'fruit', name: 'banana' },
  *     ],
  *     vegetable: [
  *         { category: 'vegetable', name: 'carrot' },
  *     ]
  * }
  * 
  * @returns {Object}
  */
function groupBy(arr, groupKey) {
    const result = {};
    arr.forEach((object) => {
        const key = object[groupKey];
        result[key] ??= [];
        result[key].push(object);
    });
    return result;
}