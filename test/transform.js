'use strict';

QUnit.module('Тестируем функцию transform', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const transformFunction = (value) => value * 2;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: 4, c: 6 }, 'Значения должны быть умножены на 2');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const transformFunction = (value) => value + 1;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: { c: 3, d: 4 }, e: 5 }, 'Значения должны быть увеличены на 1');
    });

    QUnit.test('Работает правильно с массивами', (assert) => {
        const originalObject = { a: [1, 2, 3], b: 4 };
        const transformFunction = (value) => value * 3;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: [3, 6, 9], b: 12 }, 'Элементы массива должны быть умножены на 3');
    });
});

QUnit.module('Тестируем функцию transform на дополнительные свои тесты', () => {
    QUnit.test('Работает правильно с объектами большой вложенности', (assert) => {
        const originalObject = { a: 1, b: { c: { d: { e: 4 } } } };
        const transformFunction = (value) => value * value;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 1, b: { c: { d: { e: 16 } } } }, 'Элементы массива должны быть возведены в квадрат');
    });

    QUnit.test('Работает правильно с объектами, у которых есть значение null в значении ключа массива', (assert) => {
        const originalObject = { a: 1, b: null, c: 3 };
        const transformFunction = (value) => value * value;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 1, b: null, c: 9 }, 'Элементы массива должны быть возведены в квадрат, элемент null правильно обработан');
    });

    QUnit.test('Работает правильно с объектами, у которых есть значение null как ключ массива', (assert) => {
        const originalObject = { a: -1, b: 3, null: null };
        const transformFunction = (value) => value * value;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 1, b: 9, null: null }, 'Элементы массива должны быть возведены в квадрат, элемент null правильно обработан');
    });
});
