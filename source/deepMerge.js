'use strict';

/**
 * Проверяет, является ли значение объектом (не включая массивы и null).
 *
 * @param {*} value - Проверяемое значение.
 * @returns {boolean} Возвращает true, если переданное значение — объект, false в противном случае.
 */
const isObject = value =>
    value !== null && typeof value === 'object' && !Array.isArray(value);


/**
 * Глубоко объединяет два объекта.
 * Если оба объекта содержат одинаковые ключи, и значения по этим ключам — объекты, то они объединяются рекурсивно.
 * Если значения — не объекты (примитивы, массивы и т. д.), то значение из второго объекта перезаписывает значение из первого.
 *
 * @param {object} obj1 - Первый объект.
 * @param {object} obj2 - Второй объект.
 * @returns {object} Новый объект, полученный в результате глубокого слияния.
 */
const deepMerge = (obj1, obj2) => {
    const result = structuredClone(obj1);

    for (const [key, value] of Object.entries(obj2)) {
        if (isObject(value) && isObject(result[key])) {
            result[key] = deepMerge(result[key], value);
        } else {
            result[key] = structuredClone(value);
        }
    }

    return result;
};

