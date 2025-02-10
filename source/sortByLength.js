'use strict';

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
	const cmpStr = (a, b) => {
		if (a.length === b.length)
			return a.localeCompare(b);

		return a.length - b.length;
	};

	return arr.sort(cmpStr);
};
