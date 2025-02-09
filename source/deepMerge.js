/**
 * Функция, объединяющая два объекта.
 * 
 * Если оба объекта содержат одинаковые ключи, и значения по этим ключам являются объектами, 
 * то они будут объединены рекурсивно. Если значения не являются объектами, значение из второго объекта 
 * перезаписывает значение из первого.
 * 
 * @param {Object} source Первый объект.
 * @param {Object} target Второй объект.
 * 
 * @returns {Object} Объединённый объект.
 * 
 * @example
 * // returns { a: 1, b: { x: 10, y: 50, z: 30 }, c: 3, d: 4 }
 * deepMerge({ a: 1, b: { x: 10, y: 20 }, c: 3 }, { b: { y: 50, z: 30 }, d: 4 });
 */
function deepMerge(source, target) {
    if (!source || typeof source !== 'object') return target;
    if (!target || typeof target !== 'object') return source;

    let merged = { ...source };

    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            if (
                typeof target[key] === 'object' &&
                target[key] !== null &&
                !Array.isArray(target[key]) &&
                typeof source[key] === 'object' &&
                source[key] !== null &&
                !Array.isArray(source[key])
            ) {
                merged[key] = deepMerge(source[key], target[key]);
            } else {
                merged[key] = target[key];
            }
        }
    }

    return merged;
}