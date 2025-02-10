/* eslint-disable require-jsdoc */

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

    QUnit.test('Обработка объекта со строковыми значениями', (assert) => {
        const originalObject = {
            str1: 'hello',
            str2: 'world',
            num: 42
        };
        const transformFunction = (value) => typeof value === 'string' ? value.toUpperCase() : value;
        const result = transform(originalObject, transformFunction);
        assert.deepEqual(result, {
            str1: 'HELLO',
            str2: 'WORLD',
            num: 42
        }, 'Строки должны быть преобразованы в верхний регистр');
    });

    QUnit.test('Обработка пустого объекта и null значений', (assert) => {
        const originalObject = {
            empty: {},
            nullVal: null,
            arr: []
        };
        const transformFunction = (value) => value !== null ? value : 'NULL';
        const result = transform(originalObject, transformFunction);
        assert.deepEqual(result, {
            empty: {},
            nullVal: 'NULL',
            arr: []
        }, 'Пустые объекты и массивы должны остаться неизменными, null заменен на строку');
    });

    QUnit.test('Глубоко вложенная структура объектов', (assert) => {
        const originalObject = {
            a: 1,
            b: {
                c: {
                    d: 2,
                    e: {
                        f: 3
                    }
                }
            }
        };
        const transformFunction = (value) => typeof value === 'number' ? value * 10 : value;
        const result = transform(originalObject, transformFunction);
        assert.deepEqual(result, {
            a: 10,
            b: {
                c: {
                    d: 20,
                    e: {
                        f: 30
                    }
                }
            }
        }, 'Все числа должны быть умножены на 10 во всей глубине объекта');
    });

    QUnit.test('Смешанная структура с разными типами данных', (assert) => {
        const originalObject = {
            num: 42,
            str: 'text',
            bool: true,
            obj: { a: 1, b: 'two' },
            arr: [1, 'two', { c: 3 }],
            und: undefined,
            nul: null
        };
        const transformFunction = (value) => {
            if (typeof value === 'string') return value.toUpperCase();
            if (typeof value === 'number') return value * 2;
            if (typeof value === 'boolean') return !value;
            return value;
        };
        const result = transform(originalObject, transformFunction);
        assert.deepEqual(result, {
            num: 84,
            str: 'TEXT',
            bool: false,
            obj: { a: 2, b: 'TWO' },
            arr: [2, 'TWO', { c: 6 }],
            und: {},
            nul: null
        }, 'Разные типы данных должны быть преобразованы согласно их типу');
    });
    
    QUnit.test('Обработка null вместо функции преобразования', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const result = transform(originalObject, null);
        assert.deepEqual(result, {}, 'При null вместо функции должен вернуться пустой объект');
    });
    
    QUnit.test('Обработка undefined вместо объекта', (assert) => {
        const transformFunction = (value) => value * 2;
        const result = transform(undefined, transformFunction);
        assert.deepEqual(result, {}, 'При undefined вместо объекта должен вернуться пустой объект');
    });
    
    QUnit.test('Обработка undefined вместо функции преобразования', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const result = transform(originalObject, undefined);
        assert.deepEqual(result, {}, 'При undefined вместо функции должен вернуться пустой объект');
    });
});
