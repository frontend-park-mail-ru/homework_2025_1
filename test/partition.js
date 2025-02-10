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

    QUnit.test("Работает правильно с пустым массивом", function(assert) {
        const nothing = () => true;
        const result = partition([], nothing);
    
        assert.deepEqual(result, [[], []]);
    });

    QUnit.test("Работает правильно при разделении с предикатом, возвращающим false для всех элементов", function(assert) {
        const isNegative = num => num < 0;
        const result = partition([1, 2, 3, 4, 5], isNegative);
    
        assert.deepEqual(result, [
            [], 
            [1, 2, 3, 4, 5]
        ]);
    });
    
    QUnit.test("Работает правильно для массива с повторяющимися значениями", function(assert) {
        const isEven = num => num % 2 === 0;
        const result = partition([2, 2, 3, 3, 4, 4], isEven);
    
        assert.deepEqual(result, [
            [2, 2, 4, 4], 
            [3, 3]
        ]);
    });

    QUnit.test("Работает правильно с массивом строк", function(assert) {
        const startsWithA = str => str.startsWith("A");
        const result = partition(["Alice", "Bob", "Anna", "Mike"], startsWithA);
    
        assert.deepEqual(result, [
            ["Alice", "Anna"], 
            ["Bob", "Mike"]
        ]);
    });

    QUnit.test("Разделяет правильно объекты в зависимости от наличия свойства", function(assert) {
        const hasAge = obj => "age" in obj;
        const result = partition([
            { name: "Alice", age: 25 },
            { name: "Bob" },
            { name: "Charlie", age: 30 },
            { name: "David", height: 120 }

        ], hasAge);

        assert.deepEqual(result, [
            [
                { name: "Alice", age: 25 },
                { name: "Charlie", age: 30 }
            ],
            [
                { name: "Bob" },
                { name: "David", height: 120 }

            ]
        ]);
    });

    QUnit.test("Разделяет правильно массив со смешанными типами данных", function(assert) {
        const isString = item => typeof item === "string";
        const result = partition(["Alice", 42, "Bob", 17, "Charlie", 99], isString);

        assert.deepEqual(result, [
            ["Alice", "Bob", "Charlie"], 
            [42, 17, 99]
        ]);
    });

    QUnit.test("Правильно работает с предикатом с побочным эффектом в виде счетчика вызовов", function(assert) {
        let temp = 0;
        const changablePredicate = _ => {
            temp++;
            return temp % 2 == 0; 
        };  
        const result = partition([1, 2, 3, 4, 5, 6, 7, 8], changablePredicate);

        assert.deepEqual(result, [
            [2, 4, 6, 8], 
            [1, 3, 5, 7]  
        ]);
    });
});
