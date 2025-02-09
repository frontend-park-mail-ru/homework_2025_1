'use strict';

QUnit.module("Тестируем функцию deepMerge", function() {
    QUnit.test("Работает правильно с вложенными объектами", function(assert) {
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

    QUnit.test("Работает правильно с невложенными объектами", function(assert) {
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

    QUnit.test("Работает с пустым исходным объектом", function(assert) {
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

    /**
     * Тест на случай, когда оба объекта пустые.
     * @param {QUnit.Assert} assert - Утверждения QUnit.
     */
    QUnit.test("Слияние пустых объектов", function(assert) {
        const source = {};
        const target = {};
        const expected = {};

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Слияние двух пустых объектов должно дать пустой объект");
    });

    /**
     * Тест на случай, когда в одном объекте — примитив, а в другом — вложенный объект.
     * @param {QUnit.Assert} assert - Утверждения QUnit.
     */
    QUnit.test("Слияние примитива и объекта", function(assert) {
        const source = { user: 123 };
        const target = { user: { name: "Bob" } };
        const expected = { user: { name: "Bob" } };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Примитив в source заменяется объектом из target");
    });

    /**
     * Тест на случай, когда оба значения — это массивы (перезапись массива).
     * @param {QUnit.Assert} assert - Утверждения QUnit.
     */
    QUnit.test("Слияние массивов (перезапись)", function(assert) {
        const source = { hobbies: ["reading", "gaming"] };
        const target = { hobbies: ["traveling", "photography"] };
        const expected = { hobbies: ["traveling", "photography"] };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Второй массив полностью заменяет первый");
    });
});
