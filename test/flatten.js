'use strict';

QUnit.module("Тестируем функцию flatten", function() {
    QUnit.test("Работает правильно с плоским массивом", function(assert) {
        const result = flatten([1, 2, 3]);

        assert.deepEqual(result, [1, 2, 3], "Ожидается [1, 2, 3]");
    });

    QUnit.test("Работает правильно с вложенным массивом с несколькими уровнями", function(assert) {
        const result = flatten([1, [2, [3, 4], 5], 6]);

        assert.deepEqual(result, [1, 2, 3, 4, 5, 6], "Ожидается [1, 2, 3, 4, 5, 6]");
    });

    QUnit.test("Работает правильно с пустым массивом", function(assert) {
        const result = flatten([]);

        assert.deepEqual(result, [], "Ожидается []");
    });

    QUnit.test("Работает правильно с массивом глубокой вложенности", function(assert) {
        const result = flatten([1, [2, [3, [4, [5]]]]]);

        assert.deepEqual(result, [1, 2, 3, 4, 5], "Ожидается [1, 2, 3, 4, 5]");
    });

    QUnit.test("Игнорирует пустые массивы", function(assert) {
        const result = flatten([1, [], [2, [], [3, []]], 4]);

        assert.deepEqual(result, [1, 2, 3, 4], "Ожидается [1, 2, 3, 4]");
    });

    QUnit.test("Возвращает пустой массив, если все элементы — пустые массивы", function(assert) {
        const result = flatten([[], [[]], [[], [[]]]]);

        assert.deepEqual(result, [], "Ожидается []");
    });

    QUnit.test("Работает правильно с повторяющимися числами", function(assert) {
        const result = flatten([1, [1, [2, [2, 3, [3]]]]]);

        assert.deepEqual(result, [1, 1, 2, 2, 3, 3], "Ожидается [1, 1, 2, 2, 3, 3]");
    });

    QUnit.test("Корректно обрабатывает нули в массиве", function(assert) {
        const result = flatten([0, [1, [0, 2, [0, 3]]]]);

        assert.deepEqual(result, [0, 1, 0, 2, 0, 3], "Ожидается [0, 1, 0, 2, 0, 3]");
    });

    QUnit.test("Выбрасывает ошибку при передаче не массива", function(assert) {
        assert.throws(() => flatten("не массив"), TypeError, "Ожидается TypeError");
        assert.throws(() => flatten(52), TypeError, "Ожидается TypeError");
        assert.throws(() => flatten(null), TypeError, "Ожидается TypeError");
        assert.throws(() => flatten(undefined), TypeError, "Ожидается TypeError");
    });

    QUnit.test("Корректно обрабатывает null и undefined в массиве", function(assert) {
        const result = flatten([1, null, [2, undefined, [3]]]);

        assert.deepEqual(result, [1, null, 2, undefined, 3], "Ожидается [1, null, 2, undefined, 3]");
    });
});
