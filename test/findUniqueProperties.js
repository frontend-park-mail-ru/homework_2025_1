'use strict';

QUnit.module("Тестируем функцию findUniqueProperties", function() {
    QUnit.test("Работает правильно для объектов с уникальными свойствами", function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: 2, c: 3 },
            { b: 2, c: 4, d: 5 }
        );

        assert.deepEqual(result, { a: 1, d: 5 }, "Должны быть уникальные свойства из обоих объектов.");
    });

    QUnit.test("Работает правильно для объекты с отсутствующими свойствами", function(assert) {
        const result = findUniqueProperties(
            { x: 10, y: 20 },
            { y: 20, z: 30 }
        );

        assert.deepEqual(result, { x: 10, z: 30 }, "Должны быть уникальные свойства x и z.");
    });

    QUnit.test("Работает правильно для идентичных объектов", function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: 2 },
            { a: 1, b: 2 }
        );

        assert.deepEqual(result, {}, "Идентичные объекты должны вернуть пустой объект.");
    });

    QUnit.test("Работает правильно для пустых объектов", function(assert) {
        const result = findUniqueProperties({}, {});

        assert.deepEqual(result, {}, "Пустые объекты должны вернуть пустой объект.");
    });

    QUnit.test("Работает правильно для объектов с разными типами", function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: true, c: "string" },
            { a: 1, b: false, c: "string" }
        );

        assert.deepEqual(result, {}, "Объекты с одинаковыми свойствами должны вернуть пустой объект.");
    });

    QUnit.test("Работает правильно, если передан тип не объект", function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: true, c: "string" },
            "fafafa"
        );

        assert.deepEqual(result, null, "Если передан не объект, должен вернуть null.");
    });

    QUnit.test("Работает правильно, если передан тип null", function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: true, c: "string" },
            null
        );

        assert.deepEqual(result, null, "Если передан не объект, должен вернуть null.");
    });

    QUnit.test("Работает правильно, при передаче массива", function(assert) {
        const result = findUniqueProperties(
            { '1': 2, '3': 4, },
            [5, 6, 7, 8]
        );

        assert.deepEqual(result, {"0": 5, "2": 7}, "Если передан массив, то он обрабатывается как объект.");
    });
});
