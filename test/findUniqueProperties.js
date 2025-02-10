'use strict';

QUnit.module("Тестируем функцию findUniqueProperties", function() {
    QUnit.test("Работает правильно для объектов с уникальными свойствами", function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: 2, c: 3 },
            { b: 2, c: 4, d: 5 }
        );

        assert.deepEqual(result, { a: 1, d: 5 }, "Должны быть уникальные свойства из обоих объектов.");
    });

    QUnit.test("Работает правильно для объектов с отсутствующими свойствами", function(assert) {
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
        const result = findUniqueProperties(
            {},
            {}
        );

        assert.deepEqual(result, {}, "Пустые объекты должны вернуть пустой объект.");
    });
    QUnit.test("Работает правильно для объектов с разными ключами, но одинаковыми значениями ключей", function(assert) {
        const result = findUniqueProperties(
            { a: 1 },
            { c: 1 }
        );

        assert.deepEqual(result, { a: 1, c: 1}, "Объекты с разными ключами, но одинаковыми" +
            " значениями, должны вернуть объект с уникальными ключами, независимо от их значений");
    });
    QUnit.test("Работает правильно для одного непустого и одного пустого объектов", function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: 2 },
            {}
        );

        assert.deepEqual(result, { a: 1, b: 2 }, "При непустом и пустом объектах должен вернуться непустой объект.");
    });
});
