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
function deepClone(obj)
{
    if (undefined === obj)
        return undefined;

    else if (null === obj)
        return null;

    let copy;
    switch (typeof obj)
    {
        case 'object':
        {
            if (obj instanceof Date)
                return new Date (obj);

            else if (obj instanceof RegExp)
                return new RegExp (obj);

            if (obj instanceof Set)
            {
                copy = new Set ();
                for (let val in obj)
                    copy.add (deepClone (val));

            }
            else if (obj instanceof Array)
            {
                copy = [];
                obj.map (x => copy.push (deepClone(x)));
            }
            else if (obj instanceof Map)
            {
                copy = new Map ();
                for (let [key, val] in obj)
                    copy.set(deepClone (key), deepClone (val));

            }
            else
            {
                copy = Object ();
                for (let val in obj)
                    copy[deepClone (val)] = deepClone (obj[val]);

            }

            return copy;
        }
        case 'boolean':
            return obj ? true : false;

        case 'bigint':
            return BigInt (obj);

        case 'symbol':
            return Symbol (obj);

        case 'number':
        {
            if (Number.isNaN (obj))
                return NaN

            return Number (obj);
        }
        case 'string':
        {
            copy = structuredClone (obj.split ('').join (''));
            return copy; // У меня нет идей как это сделать лучше
        }
        default:
            return obj;
    }
}
