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
 * @example
 * // Умножение всех чисел на 2
 * transform([1, [2, 3]], x => typeof x === 'number' ? x * 2 : x);
 * // Возвращает: [2, [4, 6]]
 */
function transform(obj, transformFn) {
    if (typeof obj !== 'object' || obj === null) {
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
