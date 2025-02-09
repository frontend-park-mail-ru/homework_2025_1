'use strict';

QUnit.module("Тестируем функцию flatten", function() {
    QUnit.test("Работает правильно с плоским массивом", function(assert) {
        const result = flatten([1, 2, 3]);
        assert.deepEqual(result, [1, 2, 3], "flatten([1, 2, 3]) == [1, 2, 3]");
    });

    QUnit.test("Работает правильно с вложенным массивом с несколькими уровнями", function(assert) {
        const result = flatten([1, [2, [3, 4], 5], 6]);
        assert.deepEqual(result, [1, 2, 3, 4, 5, 6], "flatten([1, [2, [3, 4], 5], 6]) == [1, 2, 3, 4, 5, 6]");
    });

    QUnit.test("Работает правильно с пустым массивом", function(assert) {
        const result = flatten([]);
        assert.deepEqual(result, [], "flatten([]) == []");
    });

    QUnit.test("Работает правильно с массивами, содержащими разные типы данных", function(assert) {
        const result = flatten([1, [2, ["three", true], null], { key: "value" }]);
        assert.deepEqual(result, [1, 2, "three", true, null, { key: "value" }], "flatten([1, [2, ['three', true], null], { key: 'value' }]) == [1, 2, 'three', true, null, { key: 'value' }]");
    });

    QUnit.test("Работает правильно с глубоко вложенными массивами", function(assert) {
        const result = flatten([1, [2, [3, [4, [5]]]]]);
        assert.deepEqual(result, [1, 2, 3, 4, 5], "flatten([1, [2, [3, [4, [5]]]]]) == [1, 2, 3, 4, 5]");
    });

    QUnit.test("Выбрасывает ошибку, если аргумент не является массивом", function(assert) {
        assert.throws(() => flatten("not an array"), TypeError, "Аргумент должен быть массивом");
    });
});
