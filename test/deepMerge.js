'use strict';

QUnit.module("Тестируем функцию deepMerge", function () {
    QUnit.test("Работает правильно с вложенными объектами", function (assert) {
        const source = {
            user: {
                name: "Alice",
                age: 25,
                address: {
                    city: "Wonderland",
                    zip: 12345
                }
            },
            hobbies: ["reading", "gaming"]
        };

        const target = {
            user: {
                age: 30,
                address: {
                    country: "Fantasyland"
                }
            },
            hobbies: ["traveling"],
            isActive: true
        };

        const expected = {
            user: {
                name: "Alice",
                age: 30,
                address: {
                    city: "Wonderland",
                    zip: 12345,
                    country: "Fantasyland"
                }
            },
            hobbies: ["traveling"],
            isActive: true
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно работать правильно с вложенными объектами");
    });

    QUnit.test("Работает правильно с невложенными объектами", function (assert) {
        const source = {
            name: "Алиса",
            age: 25,
        };

        const target = {
            age: 30,
            isInWonderland: true,
        };

        const expected = {
            name: "Алиса",
            age: 30,
            isInWonderland: true,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно правильно перезаписывать ключи");
    });

    QUnit.test("Работает с пустым исходным объектом", function (assert) {
        const source = {
            name: "Алиса",
            age: 25
        };

        const target = {};

        const expected = {
            name: "Алиса",
            age: 25,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно возвращать исходный объект при отсутствии второго");
    });

    QUnit.test("Перезапись вложенных значений", function (assert) {
        const source = {
            a: { b: 1 }
        };

        const target = {
            a: { b: 2 }
        };

        const expected = {
            a: { b: 2 }
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Вложенные значения должны перезаписаться");
    });

    QUnit.test("Объединение массивов как значений", function (assert) {
        const source = {
            a: [1, 2],
            b: [1, 2]
        };

        const target = {
            b: [3, 4]
        };

        const expected = {
            a: [1, 2],
            b: [3, 4]
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Массив должен перезаписывается целиком");
    });
});
