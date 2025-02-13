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
    QUnit.test("Правильно сортирует строки с разным регистром", function (assert) {
        const result = sortByLength(["Apple", "banana", "kiWi", "fig", "Grape"]);
        assert.deepEqual(result, ["fig", "kiWi", "Apple", "Grape", "banana"], "Строки с разным регистром должны быть отсортированы по длине и алфавиту.");
    });

    QUnit.test("Правильно сортирует строки с пробелами", function (assert) {
        const result = sortByLength([" apple ", " banana ", " kiwi ", " fig ", " grape "]);
        assert.deepEqual(result, [" fig ", " kiwi ", " apple ", " grape ", " banana "], "Строки с пробелами должны быть отсортированы по длине и алфавиту.");
    });

    QUnit.test("Правильно сортирует строки с одинаковыми буквами в разном регистре", function (assert) {
        const result = sortByLength(["b", "B", "a", "A", "aA", "bB"]);
        assert.deepEqual(result, ["a", "A", "b", "B", "aA", "bB"], "Строки с одинаковыми буквами в разном регистре должны быть отсортированы согласно алфавиту и длине.");
    });
});
