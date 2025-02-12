'use strict';

/**
 * Преобразует объект с вложенными свойствами в плоскую структуру.
 * Все ключи вложенных объектов объединяются через точку.
 *
 * @param {Object} obj - Объект, который нужно преобразовать в плоский.
 * @param {string} [prefix=''] - Префикс для текущего уровня вложенности (обычно используется рекурсивно).

 * @returns {Object} Плоский объект с объединёнными ключами.
 *
 * @example
 * const nestedObj = {
 *   name: 'Ivan Ivanovich Ivanov',
 *   job: {
 *      last_job: "Communist revolutionary",
 *      status: "Unemployed"
 *   },
 *   drunk: true,
 *   age: 30
 * };
 *
 * const plainObj = plainify(nestedObj);
 * console.log(plainObj);
 * // {
 * //   name: 'Ivan Ivanovich Ivanov',
 * //   'job.last_job': 'Communist revolutionary',
 * //   'job.status': 'Unemployed',
 * //   drunk: true,
 * //   age: 30
 * // }
 */
function plainify(obj, prefix = '') {
    const res = {};
    for (const key in obj) {

        const value = obj[key];

        if (typeof value === 'function') {
            res[prefix + key] = '[Function]'; 
        }

        if (typeof value == 'object' && value !== null) {
            if (Object.keys(value).length === 0) {
                res[prefix + key] = {};
            } else {
                Object.assign(res, plainify(value, prefix + key + '.'));
            }
        } else {
            res[prefix + key] = value;
        }
    }
    return res;
}
