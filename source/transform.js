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
    if (typeof transformFn !== 'function' || typeof obj !== 'object') {
        return {};
    }

    if (obj === null || obj === undefined) {
        return transformFn(obj);
    }

    if (Array.isArray(obj)) {
        return obj.map(item => transform(item, transformFn));
    }

    const result = {};

    for (const key in obj) {
        result[key] = transform(obj[key], transformFn);
    }

    return result;
}
