'use strict';

QUnit.module("Тестируем функцию fibonacciGenerator", function() {
    QUnit.test("Правильно генерирует первое число Фибоначчи", function(assert) {
        const fibGen = fibonacciGenerator(1);

        assert.deepEqual([...fibGen], [0], "Должно быть сгенерировано только первое число Фибоначчи.");
    });
    
    QUnit.test("Правильно генерирует 5 первых чисел Фибоначчи", function(assert) {
        const fibGen = fibonacciGenerator(5);

        assert.deepEqual([...fibGen], [0, 1, 1, 2, 3], "Должны быть сгенерированы первые 5 чисел Фибоначчи.");
    });

    QUnit.test("Работает правильно с отрицательным числом чисел", function(assert) {
        const fibGen = fibonacciGenerator(-5);

        assert.deepEqual([...fibGen], [], "Генерация отрицательного числа должна вернуть пустой массив.");
    });
    QUnit.test("Работает правильно с нулем чисел", function(assert) {
        const fibGen = fibonacciGenerator(0);

        assert.deepEqual([...fibGen], [], "Генерация нуля должна вернуть пустой массив.");
    });
    QUnit.test("Работает правильно с NaN", function(assert) {
        const fibGen = fibonacciGenerator(NaN);

        assert.deepEqual([...fibGen], [], "NaN должен вернуть пустой массив.");
    });

    QUnit.test("Работает правильно с Infinity", function(assert) {
        const fibGen = fibonacciGenerator(Infinity);

        assert.deepEqual([...fibGen], [], "Infinity должен вернуть пустой массив.");
    });

    QUnit.test("Работает правильно с -Infinity", function(assert) {
        const fibGen = fibonacciGenerator(-Infinity);

        assert.deepEqual([...fibGen], [], "-Infinity должен вернуть пустой массив.");
    });

    QUnit.test("Работает правильно с null", function(assert) {
        const fibGen = fibonacciGenerator(null);

        assert.deepEqual([...fibGen], [], "null должен вернуть пустой массив.");
    });

    QUnit.test("Работает правильно с undefined", function(assert) {
        const fibGen = fibonacciGenerator(undefined);

        assert.deepEqual([...fibGen], [], "undefined должен вернуть пустой массив.");
    });

    QUnit.test("Работает правильно со строкой", function(assert) {
        const fibGen = fibonacciGenerator("5");

        assert.deepEqual([...fibGen], [], "Строка '5' должна вернуть пустой массив.");
    });

    QUnit.test("Работает правильно с объектом", function(assert) {
        const fibGen = fibonacciGenerator({});

        assert.deepEqual([...fibGen], [], "Объект {} должен вернуть пустой массив.");
    });
});
