'use strict';

/**
 * Объединяет два массива объектов по заданному ключу.
 * Если объекты имеют одинаковое значение по ключу, они объединяются.
 * Массивы внутри объектов объединяются без дубликатов.
 *
 * @param {Array<Object>} array1 - Первый массив объектов.
 * @param {Array<Object>} array2 - Второй массив объектов.
 * @param {string} key - Ключ, по которому объединяем объекты.
 * @returns {Array<Object>} - Массив объединенных объектов.
 */
const mergeBy = (array1, array2, key) => {
    const mergedMap = new Map();

    /**
     * Функция для объединения двух объектов.
     * @param {Object} obj1 - Первый объект.
     * @param {Object} obj2 - Второй объект.
     * @returns {Object} - Объединенный объект.
     */
    const mergeObjects = (obj1, obj2) => {
        const result = { ...obj1, ...obj2 };
        for (const prop in obj1) {
            if (Array.isArray(obj1[prop]) && Array.isArray(obj2?.[prop])) {
                result[prop] = [...new Set([...obj1[prop], ...obj2[prop]])];
            }
        }
        return result;
    }

    [...array1, ...array2].forEach(obj => {
        if (key in obj) {
            if (mergedMap.has(obj[key])) {
                mergedMap.set(obj[key], mergeObjects(mergedMap.get(obj[key]), obj));
            } else {
                mergedMap.set(obj[key], obj);
            }
        }
    });

    return Array.from(mergedMap.values());
}
