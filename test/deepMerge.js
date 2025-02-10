'use strict';

QUnit.module("Тестируем функцию deepMerge", () => {
    QUnit.test("Работает правильно с вложенными объектами", (assert) => {
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

    QUnit.test("Работает правильно с невложенными объектами", (assert) => {
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

    QUnit.test("Работает с пустым вторым объектом", (assert) => {
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

    QUnit.test("Работает с пустыми первым и вторым объектами", (assert) => {
        const source = {};

        const target = {};

        const expected = {};

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно возвращать пустой объект");
    });

    QUnit.test("Перезапись вложенных значений", (assert) => {
        const source = {
            a: {         
                aa: [1, 2],
                bb: [1, 2] 
            }
        };

        const target = {
            a: { 
                bb: [3, 4]
            }
        };

        const expected = {
            a: { 
                aa: [1, 2],
                bb: [3, 4] 
            }
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Вложенные значения должны перезаписаться");
    });

    QUnit.test("Падает с ошибкой, если первый агумент - не объект", (assert) => {
        const source = "Alice";

        const target = {
            b: [3, 4]
        };

        assert.throws(() => deepMerge(source, target), TypeError, "Должна выбрасывать TypeError");
    });

    QUnit.test("Падает с ошибкой, если второй агумент - не объект", (assert) => {
        const source = {
            a: [1, 2],
            b: [1, 2]
        };

        const target = 34;

        assert.throws(() => deepMerge(source, target), TypeError, "Должна выбрасывать TypeError");
    });
});
