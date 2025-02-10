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

        assert.deepEqual(result, { a: 1, b: { c: { d: { e: 16 } } } }, 'Элементы объекта должны быть возведены в квадрат');
    });

    QUnit.test('Работает правильно с объектами, у которых внутри есть null', (assert) => {
        const originalObject = { a: 1, b: null, c: 3, null: null };
        const transformFunction = (value) => value * value;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 1, b: null, c: 9, null: null }, 'Элементы объекта должны быть возведены в квадрат, элемент null правильно обработан');
    });

    QUnit.test('Работает правильно с объектами, состоящих только из null', (assert) => {
        const originalObject = [ null ];
        const transformFunction = (value) => value * value;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, [ null ], 'Элементы объекта должны быть возведены в квадрат, элемент null правильно обработан');
    });

    QUnit.test('Работает правильно с массивом c элементом типа new Boolean(true)', (assert) => {
        const elem = new Boolean(false);
        const originalObject = [ 1, 2, elem, 3 ];
        const transformFunction = (value) => value + 1;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, [ 2, 3, 1, 4 ], 'Элементы массива должны быть возведены в квадрат');
    });

    QUnit.test('Работает правильно, если вместо функции передать в аргументы что-то другое', (assert) => {
        const elem = new Boolean(false);
        const originalObject = [ 1, 2, 3 ];
        const transformFunction = 42;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, [ 1, 2, 3 ], 'Элементы массива должны быть не изменившимися');
    });
});


QUnit.module('Тестируем функцию transform на работу с примитивами', () => {
    QUnit.test('Работает правильно с null', (assert) => {
        const originalObject = null;
        const transformFunction = (value) => value * value;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, null, 'Элемент null правильно обработан');
    });

    QUnit.test('Работает правильно с типом number', (assert) => {
        const originalObject = 123;
        const transformFunction = (value) => value + 1;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, 124, 'Элемент типа number правильно обработан, прибавлена единица');
    });

    QUnit.test('Работает правильно с типом BigInt', (assert) => {
        const originalObject = BigInt("1234567890123456789012345678901234567890");
        const transformFunction = (value) => value + 1n;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, 1234567890123456789012345678901234567891n, 'Элемент типа BigInt правильно обработан, прибавлена единица');
    });

    QUnit.test('Работает правильно с типом string', (assert) => {
        const originalObject = "123";
        const transformFunction = (value) => value + 1;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, "1231", 'Элемент типа string правильно обработан, дописан символ единицы');
    });

    QUnit.test('Работает правильно с типом boolean true', (assert) => {
        const originalObject = new Boolean(true);
        const transformFunction = (value) => { return value == true ? false : true; };
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, false, 'Элемент типа boolean, false, правильно обработан');
    });

    QUnit.test('Работает правильно с типом boolean false', (assert) => {
        const originalObject = false;
        const transformFunction = (value) => { return value == true ? false : true; };
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, true, 'Элемент типа boolean, true, правильно обработан, получен false');
    });

    QUnit.test('Работает правильно с типом undefined', (assert) => {
        let originalObject;
        const transformFunction = (value) => (value);
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, undefined, 'Элемент типа undefined правильно обработан, получен undefined');
    });
});
