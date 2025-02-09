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
function deepClone(obj) {
    let copy;

    // обеспечиваем возврат примитивов, функций
    if (obj === null || typeof obj !== 'object') return obj;

    // Обработка дат
    if (obj instanceof Date) return new Date(obj);

    // Обработка регулярных выражений
    if (obj instanceof RegExp) return new RegExp(obj);

    // Обработка множества
    if (obj instanceof Set) {
        copy = new Set();
        obj.forEach(value => {
            copy.add(deepClone(value));
        });
        return copy;
    }

    // Обработка Map
    if (obj instanceof Map) {
        copy = new Map();
        obj.forEach((value, key) => {
            copy.set(deepClone(key), deepClone(value));
        });
        return copy;
    }

    // обработка массива
    if (obj instanceof Array) {
        copy = [];
        // создаем массив из глубоких копий элементов
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepClone(obj[i]);
        }
        return copy;
    }

    // обработка объекта
    copy = {};
    // глубокое копирование полей объекта
    for (let attr in obj) {
        copy[attr] = deepClone(obj[attr]);
    }
    return copy;
}