'use strict';

QUnit.module('Тестируем функцию deepClone', () => {
    QUnit.test('Работает правильно для простого объекта', (assert) => {
        const original = { a: 1, b: 2 };
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия должна быть равна оригиналу');
        assert.notStrictEqual(cloned, original, 'Копия должна быть независимой от оригинала');
    });

    QUnit.test('Работает правильно для вложенного объекта', (assert) => {
        const original = { a: 1, b: { c: 2 } };
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия должна быть равна оригиналу');
        assert.notStrictEqual(cloned.b, original.b, 'Вложенный объект должен быть независимым');
    });

    QUnit.test('Работает правильно для массива', (assert) => {
        const original = [1, 2, { a: 3 }];
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия массива должна быть равна оригиналу');
        assert.notStrictEqual(cloned[2], original[2], 'Вложенный объект в массиве должен быть независимым');
    });

    QUnit.test('Работает правильно для Date', (assert) => {
        const original = new Date('2023-01-01');
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия Date должна быть равна оригиналу');
        assert.notStrictEqual(cloned, original, 'Копия Date должна быть независимой');
    });

    QUnit.test('Работает правильно для RegExp', (assert) => {
        const original = /abc/i;
        const cloned = deepClone(original);

        assert.deepEqual(cloned.toString(), original.toString(), 'Копия RegExp должна быть равна оригиналу');
        assert.notStrictEqual(cloned, original, 'Копия RegExp должна быть независимой');
    });

    QUnit.test('Работает правильно для Map', (assert) => {
        const original = new Map([['key', { a: 1 }]]);
        const cloned = deepClone(original);

        assert.deepEqual(Array.from(cloned), Array.from(original), 'Копия Map должна быть равна оригиналу');
        assert.notStrictEqual(cloned.get('key'), original.get('key'), 'Значения в Map должны быть независимыми');
    });

    QUnit.test('Работает правильно для Set', (assert) => {
        const original = new Set([{ a: 1 }, { b: 2 }]);
        const cloned = deepClone(original);

        assert.deepEqual(Array.from(cloned), Array.from(original), 'Копия Set должна быть равна оригиналу');
        assert.notStrictEqual(Array.from(cloned)[0], Array.from(original)[0], 'Объекты внутри Set должны быть независимыми');
    });
});

