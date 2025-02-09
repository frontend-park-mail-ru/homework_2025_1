'use strict';

QUnit.module("Тестируем функцию sortByLength", function () {
	QUnit.test("Правильно сортирует строки по длине", function (assert) {
		const result = sortByLength(["apple", "banana", "kiwi", "fig", "grape"]);

		assert.deepEqual(result, ["fig", "kiwi", "apple", "grape", "banana"], "Строки должны быть отсортированы по длине.");
	});

	QUnit.test("Правильно сортирует строки с одинаковой длиной", function (assert) {
		const result = sortByLength(["cat", "bat", "ant", "dog"]);

		assert.deepEqual(result, ["ant", "bat", "cat", "dog"], "Строки с одинаковой длиной должны быть отсортированы в алфавитном порядке.");
	});

	QUnit.test("Правильно сортирует массив с одной строкой", function (assert) {
		const result = sortByLength(["hello"]);

		assert.deepEqual(result, ["hello"], "Массив с одной строкой должен вернуть ту же строку.");
	});

	QUnit.test("Правильно обрабатывает нулевой массив", function (assert) {
		const result = sortByLength([]);

		assert.deepEqual(result, [], "Нулевой массив должен вернуть пустой массив.");
	});

	QUnit.test("Правильно сортирует массив с одинаковой строкой", function (assert) {
		const result = sortByLength(["cat", "cat", "cat", "cat"]);

		assert.deepEqual(result, ["cat", "cat", "cat", "cat"], "Массив с одинаковыми строками должен вернуть тот же массив.");
	});
});
