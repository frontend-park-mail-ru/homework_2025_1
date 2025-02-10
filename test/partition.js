/* eslint-disable require-jsdoc */

'use strict';

QUnit.module("Тестируем функцию partition", function() {
    QUnit.test("Работает правильно при разделении массива на основе предиката", function(assert) {
        const isEven = num => num % 2 === 0;
        const result = partition([1, 2, 3, 4, 5, 6], isEven);

        assert.deepEqual(result, [
            [2, 4, 6],
            [1, 3, 5]
        ]);
    });

    QUnit.test("Работает правильно при разделении с предикатом, возвращающим true для всех элементов", function(assert) {
        const isPositive = num => num > 0;
        const result = partition([1, 2, 3, 4, 5], isPositive);

        assert.deepEqual(result, [
            [1, 2, 3, 4, 5],
            []
        ]);
    });

    QUnit.test("Правильно делит массив объектов по свойству", function(assert) {
        const isAdult = person => person.age >= 18;
        const result = partition([ 
            { name: "Alice", age: 17 }, 
            { name: "Bob", age: 20 }, 
            { name: "Charlie", age: 15 }, 
            { name: "David", age: 22 }
        ], isAdult);
        
        assert.deepEqual(result, [
            [
                { name: "Bob", age: 20 },
                { name: "David", age: 22 }
            ],
            [
                { name: "Alice", age: 17 },
                { name: "Charlie", age: 15 }
            ]
        ]);
    });

    QUnit.test("Возвращает массив с undefined, если входной массив пустой", function(assert) {
        const isEven = num => num % 2 === 0;
        const result = partition([], isEven);

        assert.deepEqual(result, [
            [],
            []
        ]);
    });

    QUnit.test("Возвращает undefined для некорректного предиката", function(assert) {
        const result = partition([1, 2, 3], null);

        assert.strictEqual(result, undefined);
    });

    QUnit.test("Правильно работает с массивом, содержащим только одно значение", function(assert) {
        const isEven = num => num % 2 === 0;
        const result = partition([2], isEven);

        assert.deepEqual(result, [
            [2],
            []
        ]);
    });

    QUnit.test("Правильно работает с массивом, содержащим только одно значение, не подходящее под предикат", function(assert) {
        const isEven = num => num % 2 === 0;
        const result = partition([1], isEven);

        assert.deepEqual(result, [
            [],
            [1]
        ]);
    });

    QUnit.test("Корректно работает с массивом, содержащим элементы разных типов", function(assert) {
        const isString = item => typeof item === "string";
        const result = partition([1, "hello", 3.14, "world", true], isString);

        assert.deepEqual(result, [
            ["hello", "world"],
            [1, 3.14, true]
        ]);
    });

    QUnit.test("Корректно работает с пустыми строками и null значениями", function(assert) {
        const isNonEmptyString = str => str && str.trim() !== "";
        const result = partition(["", "hello", null, "world", ""], isNonEmptyString);

        assert.deepEqual(result, [
            ["hello", "world"],
            ["", null, ""]
        ]);
    });
});

