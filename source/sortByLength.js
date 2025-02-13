'use strict';

/**
 * Функция, которая сравнивает две строки без учета регистра для сортировки.
 *
 * @param {string} a - первая строка для сравнения
 * @param {string} b - вторая строка для сравнения
 * 
 *  * @example
 * // returns -1
 * compareLocale("apple", "Banana");
 * 
 * @returns {number} - отрицательное число, если `a` меньше `b`, 
 *                     положительное число, если `a` больше `b`, 
 *                     и 0, если строки равны.
 */
const compareLocale = (a, b) => {
	const lowerA = a.toLowerCase();
	const lowerB = b.toLowerCase();

	if (lowerA < lowerB) {
		return -1;
	}

	if (lowerA > lowerB) {
		return 1;
	}

	return 0;
}

/**
 * Функция, которая принимает массив строк и возвращает новый массив, отсортированный по длине строк. 
 * Если две строки имеют одинаковую длину, они должны быть отсортированы в алфавитном порядке.
 *
 * @param {Array.<string>} arr - массив строк
 *
 * @example
 * // returns ["ant", "bat", "cat", "dog"]
 * sortByLength(["cat", "bat", "ant", "dog"]);
 * 
 * @returns {Array.<string>} - новый массив строк, отсортированный по длине
 */
const sortByLength = function (arr) {
	return arr.sort((a, b) => a.length === b.length ? compareLocale(a, b) : a.length - b.length);
};
