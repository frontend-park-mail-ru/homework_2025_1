'use strict';

QUnit.module('Тестируем функцию factorial', () => {
    QUnit.test('Факториал 0 должен быть 1', (assert) => {
        assert.strictEqual(factorial(0), 1, '0! = 1');
    });

    QUnit.test('Факториал 5 должен быть 120', (assert) => {
        assert.strictEqual(factorial(5), 120, '5! = 120');
    });

    // new tests

    QUnit.test('Факториал 1 должен быть 1', (assert) => {
        assert.strictEqual(factorial(1), 1, '1! = 1');
    });

    QUnit.test('Факториал 2 должен быть 2', (assert) => {
        assert.strictEqual(factorial(2), 2, '2! = 2');
    });

    QUnit.test(`Факториал 6 должен быть 720`, (assert) => {
        assert.strictEqual(factorial(6), 720, '6! = 720');
    });

    QUnit.test('Факториал для отрицательного числа должен выбрасывать ошибку', (assert) => {
        assert.throws(() => {
            factorial(-1);
        }, /Факториал не определен для отрицательных чисел/, 'Ошибка выбрасывается для -1');
    })

    QUnit.test('Факториал для не числа должен выбрасывать ошибку', (assert) => {
        assert.throws(() => {
            factorial('a');
        }, /Факториал определен только для чисел/, 'Ошибка выбрасывается для "a"');
    })
});
