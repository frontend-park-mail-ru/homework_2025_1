//Ларин Алексей WEB-22

/**
 * Функция разделяет элементы массива на два подмассива: один для элементов, которые удовлетворяют предикату, и другой для элементов, которые не удовлетворяют
 * @param {Array} arr - Исходный массив
 * @param {Function} predicate - Предикат (функция)
 * 
 * @example
 * // return [[1, 2, 3], [-1]]
 * partition([-1, 1, 2, 3], isPositive);
 * 
 * @returns {Array} - Массив из двух массивов: в первом элементы удовлетворяют предикату, а во втором нет
 */
function partition(arr, predicate) {
    let result = [[], []];
    for (let i = 0; i < arr.length; i++) {
        if (predicate(arr[i])) {
            result[0].push(arr[i]);
        } else {
            result[1].push(arr[i]);
        }
    }
    return result;
}