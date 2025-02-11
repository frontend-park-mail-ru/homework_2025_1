'use strict';

/**
 * Рекурсивная функция преобразования объектов
 * Применяет предоставленную функцию преобразования ко всем значениям 
 * в объекте, в т.ч. рекурсивно
 *
 * @param {Object} obj - Объект для преобразования
 * @param {Function} transformFn - Функция преобразования значений
 * @returns {Object} Новый объект с преобразованными значениями
 *
 * @example
 * // Преобразование чисел в строки
 * transform({a: 1, b: {c: 2}}, String);
 * // Возвращает: {a: '1', b: {c: '2'}}
 *
 */
const transform = (obj, transformFn) => {
    if (typeof transformFn !== 'function' || obj === undefined) {
        return {};
    }

    if (typeof obj !== 'object' || obj === null ) {
        return transformFn(obj);
    }

    if (Array.isArray(obj)) {
        return obj.map(item => (typeof item === 'object') ? transform(item, transformFn) : transformFn(item));
    }

    const result = {};

    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            result[key] = transform(obj[key], transformFn);
        } else {
            result[key] = transformFn(obj[key]);
        }
    }

    return result;
}
