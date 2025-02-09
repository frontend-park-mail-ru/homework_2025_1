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

    QUnit.test('Работает правильно с пустым объектом', (assert) => {
        const result = transform({}, (val) => val * 2);
        assert.deepEqual(result, {}, 'Пустой объект остается пустым');
    });
    
    QUnit.test('Работает правильно с null и undefined', (assert) => {
        const result = transform({ a: null, b: undefined }, (val) => val ?? 'default');
        assert.deepEqual(result, { a: 'default', b: 'default' }, 'null и undefined заменяются на "default"');
    });

    QUnit.test('Работает правильно с глубоко вложенными объектами', (assert) => {
        const originalObject = { 
            a: 1, 
            b: { 
                c: 2, 
                d: { 
                    e: 3, 
                    f: { g: 4 } 
                } 
            } 
        };
        const transformFunction = (value) => value * 10;
        const result = transform(originalObject, transformFunction);
    
        assert.deepEqual(result, { 
            a: 10, 
            b: { 
                c: 20, 
                d: { 
                    e: 30, 
                    f: { g: 40 } 
                } 
            } 
        }, 'Все значения в глубоко вложенных объектах должны быть умножены на 10');
    });
});
