'use strict';

QUnit.module("Тестируем функцию fibonacciGenerator", function () {
    QUnit.test("Правильно генерирует первое число Фибоначчи", function (assert) {
        const fibGen = fibonacciGenerator(1);

        assert.deepEqual([...fibGen], [0], "Должно быть сгенерировано только первое число Фибоначчи.");
    });

    QUnit.test("Правильно генерирует 5 первых чисел Фибоначчи", function (assert) {
        const fibGen = fibonacciGenerator(5);

        assert.deepEqual([...fibGen], [0, 1, 1, 2, 3], "Должны быть сгенерированы первые 5 чисел Фибоначчи.");
    });

    QUnit.test("Работает правильно с отрицательным числом чисел", function (assert) {
        const fibGen = fibonacciGenerator(-5);

        assert.deepEqual([...fibGen], [], "Генерация отрицательного числа должна вернуть пустой массив.");
    });

    QUnit.test("Работает правильно с вещественным числом", function (assert) {
        const fibGen = fibonacciGenerator(-2.1);

        assert.deepEqual([...fibGen], [], "Генерация вещественного числа должна вернуть пустой массив.");
    });

    QUnit.test("Работает правильно с не числовым значением", function (assert) {
        const fibGen = fibonacciGenerator({});

        assert.deepEqual([...fibGen], [], "Генерация не числового значения должна вернуть пустой массив.");
    });
});
