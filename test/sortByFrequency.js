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

    QUnit.test("Работает правильно с элементами с одинаковой частотой", function(assert) {
        const result = sortByFrequency([5, 5, 2, 2]);

        assert.deepEqual(result, [2, 2, 5, 5], "Массив должен сортировать по возрастанию.");
    });

    QUnit.test("Работает правильно с отрицательными элементами и несколькими элементами с одинаковой частотой", function(assert) {
        const result = sortByFrequency([-5, -5, -2, 2, 10, 0, 45]);

        assert.deepEqual(result, [-5, -5, -2, 0, 2, 10, 45], "Массив должен сортировать по частоте и по возрастанию в случаях с одинаковой частотой.");
    });

    QUnit.test("Работает правильно с переданной строкой", function(assert) {
        const result = sortByFrequency('строка');

        assert.deepEqual(result, [], "Должен возвращать пустой массив");
    });

    QUnit.test("Работает правильно с переданным числом", function(assert) {
        const result = sortByFrequency(25);

        assert.deepEqual(result, [], "Должен возвращать пустой массив");
    });

    QUnit.test("Работает правильно без аргумента", function(assert) {
        const result = sortByFrequency();

        assert.deepEqual(result, [], "Должен возвращать пустой массив");
    });

    QUnit.test("Работает правильно c входным параметром null", function(assert) {
        const result = sortByFrequency(null);

        assert.deepEqual(result, [], "Должен возвращать пустой массив");
    });
});
