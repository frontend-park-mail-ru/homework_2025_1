'use strict';

/**
 * @param {Array} arr
 * @example
 * //returns [1, 2, 3]
 * flatten([1, 2, 3]);
 * @returns {Array} 
 */
function flatten(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError("Аргумент должен быть массивом");
    }

    return arr.reduce((acc, item) => {
        if (Array.isArray(item)) {
            return acc.concat(flatten(item));
        } else {
            return acc.concat(item); 
        }
    }, []);
}
