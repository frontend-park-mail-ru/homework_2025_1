'use strict';

QUnit.module('Тестируем функцию factorial', () => {
    QUnit.test('Факториал 0 должен быть 1', (assert) => {
        assert.strictEqual(factorial(0), 1, '0! = 1');
    });

    QUnit.test('Факториал 5 должен быть 120', (assert) => {
        assert.strictEqual(factorial(5), 120, '5! = 120');
    });

    QUnit.test('Факториал для отрицательного числа должен выбрасывать ошибку', (assert) => {
        assert.throws(() => {
            factorial(-1);
        }, RangeError, 'Ошибка выбрасывается для -1');
    });

    QUnit.test('Факториал 1 должен быть 1', (assert) => {
        assert.strictEqual(factorial(1), 1, '1! = 1');
    });

    QUnit.test('Факториал 2 должен быть 2', (assert) => {
        assert.strictEqual(factorial(2), 2, '2! = 2');
    });

    QUnit.test('Факториал 3 должен быть 6', (assert) => {
        assert.strictEqual(factorial(3), 6, '3! = 6');
    });

    QUnit.test('Факториал 4 должен быть 24', (assert) => {
        assert.strictEqual(factorial(4), 24, '4! = 24');
    });

    QUnit.test('Факториал 10 должен быть 3628800', (assert) => {
        assert.strictEqual(factorial(10), 3628800, '10! = 3628800');
    });

    QUnit.test('Факториал не должен принимать строку', (assert) => {
        assert.throws(() => {
            factorial("string");
        }, TypeError, 'Ошибка выбрасывается для строки');
    });

    QUnit.test('Факториал не должен принимать объект', (assert) => {
        assert.throws(() => {
            factorial({});
        }, TypeError, 'Ошибка выбрасывается для объекта');
    });

    QUnit.test('Факториал не должен принимать массив', (assert) => {
        assert.throws(() => {
            factorial([]);
        }, TypeError, 'Ошибка выбрасывается для массива');
    });

    QUnit.test('Факториал не должен принимать отрицательное число в виде строки', (assert) => {
        assert.throws(() => {
            factorial("-5");
        }, TypeError, 'Ошибка выбрасывается для отрицательного числа в виде строки');
    });
});

