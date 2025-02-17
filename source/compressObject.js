/**
 * Функция удаляет из объекта пары, где значения равны null, undefined или пустой строке.
 *
 * @param {Object} obj - Входной объект с ключами и значениями.
 * @returns {Object} Новый объект без пустых значений.
 */

let compressObject = (obj) => {
    if (typeof obj !== "object" || Array.isArray(obj)) {
        throw new TypeError("Expected an object as input");
    }

    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== "")
    );
}
