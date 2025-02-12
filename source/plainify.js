'use strict';

/**
 * Функция, преобразующая вложенный объект в plain-объект
 * @param {Object} obj - входной объект с возможными вложенными свойствами
 * @param {string} [prefix=''] - префикс для ключей (используется в рекурсии)
 * 
 * @example
 * // returns { x: 42, 'y.a': 1, 'y.b': 2 }
 * plainify({ x: 42, y: { a: 1, b: 2 } });
 * 
 * @returns {Object} – плоский объект с составными ключами
 */
const plainify = function (obj, prefix = '') {
    let result = {};
    
    for (const key of Object.keys(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        const value = obj[key];
        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                if (typeof item === 'object' && item !== null) {
                    Object.assign(result, plainify(item, `${newKey}.${index}`));
                } else {
                    result[`${newKey}.${index}`] = item;
                }
            });
        } else if (typeof value === 'object' && value !== null) {
            if (!Object.keys(value).length) {
                result[newKey] = {};
            } else {
                Object.assign(result, plainify(value, newKey));
            }
        } else {
            result[newKey] = value;
        }
    }
    
    return result;
}