"use strict";
/**
 * Объединяет два объекта, возвращая новый объект с объединенными свойствами.
 * В случае конфликта свойств (одинаковые ключи):
 *  - Если оба свойства - массивы, они объединяются в один массив без дубликатов.
 *  - Иначе, свойство из первого объекта (target) имеет приоритет.
 * @param {object} target Первый объект (имеет приоритет при конфликте свойств).
 * @param {object} source Второй объект.
 * @throws {TypeError} Если target или source не являются объектами.
 * @example
 * const obj1 = { a: 1, b: [2, 3], c: "hello" };
 * const obj2 = { b: [3, 4, 5], d: true, e: null };
 * const mergedObj = mergeObjects(obj1, obj2);
 * returns { a: 1, b: [ 2, 3, 4, 5 ], c: 'hello', d: true, e: null }
 * @returns {object}
 */
const mergeObjects = (target, source) => {
    if (typeof target !== "object" || target === null || Array.isArray(target)) {
        throw new TypeError("Первый аргумент должен быть объектом.");
    }
    if (typeof source !== "object" || source === null || Array.isArray(source)) {
        throw new TypeError("Второй аргумент должен быть объектом.");
    }

    /**
     * Объединяет два массива, возвращая новый массив без дубликатов.
     * @param {Array} arr1 Первый массив.
     * @param {Array} arr2 Второй массив.
     * @throws {TypeError} Если arr1 или arr2 не являются массивами.
     * @example
     * const arr1 = [1, 2, 3];
     * const arr2 = [3, 4, 5];
     * const mergedArray = mergeArraysUnique(arr1, arr2);
     * returns [1, 2, 3, 4, 5]
     * @returns {Array} 
     */
    const mergeArraysUnique = (arr1, arr2) => {
        if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
            throw new TypeError("Оба аргумента должны быть массивами.");
        }
        return [...new Set([...arr1, ...arr2])];
    };

    return Object.entries(source).reduce((acc, [key, value]) => {
        if (Object.prototype.hasOwnProperty.call(acc, key)) {
            if (Array.isArray(acc[key]) && Array.isArray(value)) {
                acc[key] = mergeArraysUnique(acc[key], value);
            }
        } else {
            acc[key] = value;
        }
        return acc;
    }, { ...target });
};

/**
 * Объединяет два массива объектов по указанному ключу.
 * Если объекты имеют одинаковое значение по этому ключу, они объединяются в один объект,
 * содержащий все свойства из обоих объектов.
 * Если одно из свойств отсутствует в одном из объектов, оно добавляется из другого объекта.
 * Если одно из свойств является массивом, они объединяются в один массив без дубликатов.
 * Если ключ объединения отсутствует в объекте, он пропускается.
 * @param {Array<object>} arr1 Первый массив объектов.
 * @param {Array<object>} arr2 Второй массив объектов.
 * @param {string} key Ключ, по которому нужно объединить объекты.
 * @throws {TypeError} Если входные данные не являются массивами или ключ не является строкой.
 * @example
 * const array1 = [
 *   { id: 1, name: "Alice", tags: ["friend"] },
 *   { id: 2, name: "Bob", tags: ["colleague"] }
 * ];
 * const array2 = [
 *   { id: 1, age: 30, tags: ["travel"] },
 *   { id: 3, name: "Charlie" }
 * ];
 * const mergedArray = mergeBy(array1, array2, "id");
 * returns [
 * //   {
 * //     "id": 1,
 * //     "name": "Alice",
 * //     "tags": [
 * //       "friend",
 * //       "travel"
 * //     ],
 * //     "age": 30
 * //   },
 * //   {
 * //     "id": 2,
 * //     "name": "Bob",
 * //     "tags": [
 * //       "colleague"
 * //     ]
 * //   },
 * //   {
 * //     "id": 3,
 * //     "name": "Charlie"
 * //   }
 * // ]
 * @returns {Array<object>} 
 */
function mergeBy(arr1, arr2, key) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        throw new TypeError("Оба входных аргумента должны быть массивами.");
    }

    if (typeof key !== "string") {
        throw new TypeError("Ключ должен быть строкой.");
    }

    const merged = new Map();

    const processArray = (arr) => {
        arr.forEach(obj => {
            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                return;
            }
            const keyValue = obj[key];
            if (merged.has(keyValue)) {
                const existingObj = merged.get(keyValue);
                merged.set(keyValue, mergeObjects(existingObj, obj));
            } else {
                merged.set(keyValue, obj);
            }
        });
    };

    processArray(arr1);
    processArray(arr2);

    return Array.from(merged.values());
}
