'use strict';

/**
 * Функция, преобразующая вложенный массив в одномерный
 * @param {Array<Object>} array - массив объектов
 * 
 * @example
 * // returns [1, 'hello', 'world', 4]
 * flatten([1, [['hello'], 'world', 4]]);
 * 
 * @returns {Array<Object>}
 */
// аргумент Infinity - обработка неограниченного числа уровней вложенности
const flatten = array => array.flat(Infinity);
