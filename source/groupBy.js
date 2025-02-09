'use strict';

 /**
  * Функция возвращающает объект, где ключи - уникальные значения по свойству или цепочке свойств groupKey,
  * а значения — массивы объектов, соответствующих этим ключам.
  * 
  * @param {Array<Object>} arr - массив объектов для группировки
  * @param {string} groupKey - имя свойства объектов, по которому производится их группировка 
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
  * @example
  * const data = [
  *     { id: 1, type: 'container', contents: {id: 1, category: 'fruit', name: 'apple'} },
  *     { id: 2, type: 'container', contents: {id: 2, category: 'fruit', name: 'banana'} },
  *     { id: 3, type: 'container', contents: {id: 3, category: 'vegetable', name: 'carrot'} },
  * ];
  * groupBy(data, 'contents.category');
  *
  * // returns
  * {
  *     fruit: [
  *         { id: 1, type: 'container', contents: {id: 1, category: 'fruit', name: 'apple'} },
  *         { id: 2, type: 'container', contents: {id: 2, category: 'fruit', name: 'banana'} },
  *     ],
  *     vegetable: [ 
  *         { id: 3, type: 'container', contents: {id: 3, category: 'vegetable', name: 'carrot'} }
  *     ]
  * }
  * 
  * @returns {Object}
  */
function groupBy(arr, groupKey) {
    const result = {};
    const keys = groupKey.split('.');

    arr.forEach((object) => {
        const key = keys.reduce((current, curKey) => current?.[curKey], object);
        if (key !== undefined) {
            result[key] ??= [];
            result[key].push(object); 
        }
    });
    return result;
}
