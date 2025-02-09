'use strict';

QUnit.module('Тестируем функцию factorial', () => {
    QUnit.test('Факториал 0 должен быть 1', (assert) => {
        assert.strictEqual(factorial(0), 1, '0! = 1');
    });

    QUnit.test('Факториал 5 должен быть 120', (assert) => {
        assert.strictEqual(factorial(5), 120, '5! = 120');
    });

    QUnit.test('Факториал 10 должен быть 3628800', (assert) => {
        assert.strictEqual(factorial(10), 3628800, '10! = 3628800');
    });

    QUnit.test('Факториал 1 должен быть 1', (assert) => {
        assert.strictEqual(factorial(1), 1, '1! = 1');
    });

    QUnit.test('Факториал для отрицательного числа должен выбрасывать ошибку', (assert) => {
        assert.throws(() => {
            factorial(-1);
        }, /Факториал не определен для отрицательных чисел/, 'Ошибка выбрасывается для -1');
    });

    QUnit.test('Факториал от строки должен выбрасывать ошибку с выводом типа', (assert) => {
        assert.throws(() => {
            factorial("5");
        }, /Факториал должен быть вызван с целым числом/, 'Ошибка выбрасывается для строки');
    });

    QUnit.test('Факториал от null должен выбрасывать ошибку с выводом типа', (assert) => {
        assert.throws(() => {
            factorial(null);
        }, /Факториал должен быть вызван с целым числом/, 'Ошибка выбрасывается для null');
    });
});
