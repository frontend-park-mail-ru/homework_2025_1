'use strict';

/**
 * Преобразует объект с вложенными свойствами в плоскую структуру.
 * Все ключи вложенных объектов объединяются через точку.
 *
 * @param {Object} obj - Объект, который нужно преобразовать в плоский.
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
    let res = {};
    for (const key in obj) {

        const value = obj[key];

        if (typeof value == 'object' && value !== null) {
            res = { ...res, ...plainify(value, prefix + key + '.') };
        } else {
            res[prefix + key] = value;
        }
    }
    return res;
}

