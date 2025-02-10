'use strict';

QUnit.module("Тестируем функцию sortByFrequency", function() {
    QUnit.test("Работает правильно с сортировкой по частоте появления", function(assert) {
        const result = sortByFrequency([4, 6, 2, 6, 4, 4, 2, 2, 2]);

        assert.deepEqual(result, [2, 2, 2, 2, 4, 4, 4, 6, 6], "Массив должен быть отсортирован по частоте.");
    });

    QUnit.test("Работает правильно с пустым массивом", function(assert) {
        const result = sortByFrequency([]);

        assert.deepEqual(result, [], "Пустой массив должен вернуть пустой массив.");
    });

    QUnit.test("Работает правильно с массивом с одним элементом", function(assert) {
        const result = sortByFrequency([5]);

        assert.deepEqual(result, [5], "Массив с одним элементом должен вернуть тот же элемент.");
    });

    QUnit.test("Работает правильно с одинаковой частотой чисел", function(assert) {
        const result = sortByFrequency([3, 1, 2, 3, 1, 2]);

        assert.deepEqual(result, [1, 1, 2, 2, 3, 3], "Числа с одинаковой частотой должны сортироваться по возрастанию.");
    });

    QUnit.test("Работает правильно с отрицательными числами", function(assert) {
        const result = sortByFrequency([-1, -2, -2, -1, -3]);

        assert.deepEqual(result, [-2, -2, -1, -1, -3], "Отрицательные числа должны сортироваться корректно.");
    });
});
