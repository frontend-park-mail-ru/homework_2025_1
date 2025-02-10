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
    if (!Array.isArray(array1)) {
        console.warn(`Передан ${typeof array1}. Используем пустой массив.`);
        array1 = [];
    }
    if (!Array.isArray(array2)) {
        console.warn(`Передан ${typeof array2}. Используем пустой массив.`);
        array2 = [];
    }

    const mergedMap = new Map();

    /**
     * Функция для объединения двух объектов.
     * @param {Object} obj1 - Первый объект.
     * @param {Object} obj2 - Второй объект.
     * @returns {Object} - Объединенный объект.
     */
    const mergeObjects = (obj1, obj2) => {
        if (obj1 === null || obj1 === undefined) return obj2;
        if (obj2 === null || obj2 === undefined) return obj1;

        const result = { ...obj1 };

        for (const prop in obj2) {
            if (prop in obj2) {
                if (Array.isArray(obj1[prop]) && Array.isArray(obj2[prop])) {
                    result[prop] = [...new Set([...obj1[prop], ...obj2[prop]])];
                }
                else if (typeof obj1[prop] === 'object' && obj1[prop] !== null && typeof obj2[prop] === 'object' && obj2[prop] !== null) {
                    result[prop] = mergeObjects(obj1[prop], obj2[prop]);
                }
                else {
                    result[prop] = obj2[prop];
                }
            }
        }

        return result;
    };

    [...array1, ...array2].forEach(obj => {
        if (!obj || typeof obj !== 'object') {
            console.warn(`Неправильно значение`);
            return;
        }

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
