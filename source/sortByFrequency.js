'use strict';

/**
 * Сортирует массив чисел по частоте появления элементов.
 * Если два элемента имеют одинаковую частоту, они сортируются по возрастанию.
 * @param {Array<Number>} arr - массив чисел для сортировки
 * 
 * @example
 * // returns [2, 2, 2, 2, 4, 4, 4, 6, 6]
 * sortByFrequency([4, 6, 2, 6, 4, 4, 2, 2, 2]);
 * 
 * @returns {Array<Number>} новый массив, отсортированный по частоте и значению
 */
const sortByFrequency = (arr) => {
    if (!Array.isArray(arr)) {
        return []
    }
    const frequencyMap = {};
    arr.forEach(num => {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    });
    return arr.sort((a, b) => {
        if (frequencyMap[a] !== frequencyMap[b]) {
            return frequencyMap[b] - frequencyMap[a];
        } else {
            return a - b;
        }
    });
};
