'use strict';

/**
 * @function deepClone
 *
 * Функция, выполняющия глубокое копирование передаваемого
 * в нее объекта или чего либо то не было
 *
 * @param {any} obj - копируемый объект
 *
 * @example
 * // returns [1, 2, 3]
 * deepClone([1, 2, 3]);
 *
 * @example
 * // return [1, 2, {a: 1, b: 2, c: {p: 4, [[[[1]]]]}}]
 * deepClone([1, 2, {a: 1, b: 2, c: {p: 4, [[[[1]]]]}}])
 *
 * @example
 * // return 509
 * deepClone(509);
 *
 * @example
 * //return undefined
 * deepClone(undefined);
 *
 * @returns {any}
 */
const deepClone = (obj) => {
    if (null === obj || 'object' !== typeof obj)
        return obj;

    else if (obj instanceof Date)
        return new Date(obj);

    else if (obj instanceof RegExp)
        return new RegExp(obj);

    else if (obj instanceof Set)
        return new Set([...obj].map(deepClone));

    else if (obj instanceof Map)
        return new Map([...obj].map(([key, val]) => [deepClone(key), deepClone(val)]));

    else if (Array.isArray(obj))
        return obj.map(x => deepClone(x));

    else
        return Object.fromEntries(
            Object.entries(obj).map(([key, val]) => [deepClone(key), deepClone(val)])
        );
}
