'use strict';

QUnit.module('Тестируем функцию deepClone', () => {
    QUnit.test('Работает правильного для простого объекта', (assert) => {
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

    QUnit.test('Работает правильно для массива', (assert) => {
        const original = [1, "test", { a: {c: {a: undefined}, p: NaN} }];
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия массива должна быть равна оригиналу');
        assert.notStrictEqual(cloned[2], original[2], 'Вложенный объект в массиве должен быть независимым');
    });

    QUnit.test('Проверка глубокого копирования всех стандартных типов в js', (assert) => {
        const original = {
            number: 509,
            string: "test",
            boolean: true,
            null: null,
            undefined: undefined,
            nan: NaN,
            date: new Date(),
            regex: /ab+c/,
            array: [1, {c: 90, p: 100}, { a: undefined, b: [4, NaN] }],
        };


        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия должна быть равна оригиналу');
        assert.deepEqual(cloned.number, original.number, 'test number');
        assert.deepEqual(cloned.string, original.string, 'test string');
        assert.deepEqual(cloned.boolean, original.boolean, 'test bool');
        assert.deepEqual(cloned.null, original.null, 'test Null');
        assert.deepEqual(cloned.undefined, original.undefined, 'test undefined');
        assert.deepEqual(cloned.nan, original.nan, 'test NaN');
        assert.deepEqual(cloned.date.getTime(), original.date.getTime(), 'test Date');
        assert.deepEqual(cloned.regex.toString(), original.regex.toString(), 'test regex');
        assert.deepEqual(cloned.array, original.array, 'test array');

        assert.notStrictEqual(cloned.array, original.array, 'test array strict');
        assert.notStrictEqual(cloned.regex, original.regex, 'test regex strict');
        assert.notStrictEqual(cloned.date, original.date, 'test date strict');
    });


});
