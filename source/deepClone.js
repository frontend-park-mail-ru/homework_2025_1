'use strict';

/**
 * Функция deepClone выполняет глубокое копирование объекта
 * @param {Object} object Копируемый объект
 * 
 * @example 
 * // returns [1, 2, 3, [1, 2]]
 * const obj = [1, 2, 3, [1, 2]]; deepClone(obj);
 * 
 * @returns {Object} Возвращает глубокую копию object
 */

const deepClone = object => structuredClone(object);
