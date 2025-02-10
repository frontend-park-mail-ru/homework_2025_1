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

    QUnit.test("Работает с null и undefined значениями", function(assert) {
        const source = {
            name: "Алиса",
            age: 25,
            occupation: null,
            hobbies: undefined
        };
    
        const target = {
            age: 30,
            occupation: "Developer",
            hobbies: ["reading", "gaming"]
        };
    
        const expected = {
            name: "Алиса",
            age: 30,
            occupation: "Developer",
            hobbies: ["reading", "gaming"]
        };
    
        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно заменять null и undefined значения");
    });

    QUnit.test("Работает с пустым объектом во втором объекте для существующего ключа", function(assert) {
        const source = {
            name: "Алиса",
            age: 25,
            occupation: "Студент"
        };
    
        const target = {
            age: {},
            isActive: true
        };
    
        const expected = {
            name: "Алиса",
            age: {},
            occupation: "Студент",
            isActive: true
        };
    
        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно заменять значение в первом объекте пустым объектом из второго и сохранять остальные значения");
    });

    QUnit.test("Работает с массивами в объектах", function(assert) {
        const source = {
            hobbies: ["reading", "gaming"],
            user: {
                name: "Alice"
            }
        };
    
        const target = {
            hobbies: ["traveling"],
            user: {
                age: 30
            }
        };
    
        const expected = {
            hobbies: ["traveling"],
            user: {
                name: "Alice",
                age: 30
            }
        };
    
        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно корректно обрабатывать массивы в объектах");
    });    
});
