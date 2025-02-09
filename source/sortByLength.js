'use strict';

/**
 * Функция, которая принимает массив строк и возвращает новый массив, отсортированный по длине строк. 
 * Если две строки имеют одинаковую длину, они должны быть отсортированы в алфавитном порядке.
 *
 * @param {Array<string>} arr - массив строк
 *
 * @example
 * // returns ["ant", "bat", "cat", "dog"]
 * sortByLength(["cat", "bat", "ant", "dog"]);
 * 
 * @returns {Array<string>} - новый массив строк, отсортированный по длине
 */
const sortByLength = function (arr) {
	const cmp = function (a, b) {
		if (a.length !== b.length)
			return a.length - b.length;

		if (a < b)
			return -1;

		if (a > b)
			return 1;

		return 0;
	};

	return arr.sort((a, b) => cmp(a, b));
};
