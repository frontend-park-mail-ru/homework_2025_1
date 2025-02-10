'use strict';

/**
 * Сортирует массив по частоте появления элементов. 
 * Если два элемента имеют одинаковую частоту, они сортируются по возрастанию.
 * 
 * @param {Array<Number>} arr - Входной массив чисел.
 * 
 * @example
 * // returns [4, 4, 5, 5, 3, 6]
 * sortByFrequency([4, 5, 6, 5, 4, 3]);
 * 
 * @returns {Array<Number>} - Отсортированный массив.
 */
function sortByFrequency(arr) {
    const frequencyMap = new Map();

    for (const num of arr) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    return [...arr].sort((a, b) => {
        const freqA = frequencyMap.get(a);
        const freqB = frequencyMap.get(b);
        return freqA === freqB ? a - b : freqB - freqA;
    });
}
