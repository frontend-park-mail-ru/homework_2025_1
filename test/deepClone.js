'use strict';

QUnit.module('Тестируем функцию deepClone', () => {
    QUnit.test('Работает правильного для простого объекта', (assert) => {
        const original = {a: 1, b: 2};
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия должна быть равна оригиналу');
        assert.notStrictEqual(cloned, original, 'Копия должна быть независимой от оригинала');
    });

    QUnit.test('Работает правильно для вложенного объекта', (assert) => {
        const original = {a: 1, b: {c: 2}};
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия должна быть равна оригиналу');
        assert.notStrictEqual(cloned.b, original.b, 'Вложенный объект должен быть независимым');
    });

    QUnit.test('Работает правильно для массива', (assert) => {
        const original = [1, 2, {a: 3}];
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия массива должна быть равна оригиналу');
        assert.notStrictEqual(cloned[2], original[2], 'Вложенный объект в массиве должен быть независимым');
    });

    QUnit.test('Работает правильно для мапы', (assert) => {
        const original = [1, "test", {a: {c: {a: undefined}, p: NaN}}];
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия массива должна быть равна оригиналу');
        assert.notStrictEqual(cloned[2], original[2], 'Вложенный объект в массиве должен быть независимым');
    });

    QUnit.test('Проверка глубокого копирования number', (assert) => {
        const original = {number: 509};
        const cloned = deepClone(original);

        assert.deepEqual(cloned.number, original.number, 'test number');
    });

    QUnit.test('Проверка глубокого копирования string', (assert) => {
        const original = {string: "test"};
        const cloned = deepClone(original);

        assert.deepEqual(cloned.string, original.string, 'test string');
    });

    QUnit.test('Проверка глубокого копирования boolean', (assert) => {
        const original = {boolean: true};
        const cloned = deepClone(original);

        assert.deepEqual(cloned.boolean, original.boolean, 'test bool');
    });

    QUnit.test('Проверка глубокого копирования null', (assert) => {
        const original = {null: null};
        const cloned = deepClone(original);

        assert.deepEqual(cloned.null, original.null, 'test Null');
    });

    QUnit.test('Проверка глубокого копирования undefined', (assert) => {
        const original = {undefined: undefined};
        const cloned = deepClone(original);

        assert.deepEqual(cloned.undefined, original.undefined, 'test undefined');
    });

    QUnit.test('Проверка глубокого копирования NaN', (assert) => {
        const original = {nan: NaN};
        const cloned = deepClone(original);

        assert.deepEqual(cloned.nan, original.nan, 'test NaN');
        assert.notStrictEqual(cloned.nan, original.nan, 'test NaN strict');
    });

    QUnit.test('Проверка глубокого копирования Date', (assert) => {
        const original = {date: new Date()};
        const cloned = deepClone(original);

        assert.deepEqual(cloned.date.getTime(), original.date.getTime(), 'test Date');
        assert.notStrictEqual(cloned.date, original.date, 'test Date strict');
    });

    QUnit.test('Проверка глубокого копирования RegExp', (assert) => {
        const original = {regex: /ab+c/};
        const cloned = deepClone(original);

        assert.deepEqual(cloned.regex.toString(), original.regex.toString(), 'test regex');
        assert.notStrictEqual(cloned.regex, original.regex, 'test regex strict');
    });

    QUnit.test('Проверка глубокого копирования массива', (assert) => {
        const original = {array: [1, {c: 90, p: 100}, {a: undefined, b: [4, NaN]}]};
        const cloned = deepClone(original);

        assert.deepEqual(cloned.array, original.array, 'test array');
        assert.notStrictEqual(cloned.array, original.array, 'test array strict');
    });

    QUnit.test('Работает правильно для Set', (assert) => {
        const originalSet = new Set([1, "test", {a: {c: {a: undefined}, p: NaN}}]);
        const clonedSet = deepClone(originalSet);

        assert.deepEqual([...clonedSet], [...originalSet], 'Копия Set должна быть равна оригиналу');
        assert.notStrictEqual(clonedSet, originalSet, 'Копия Set должна быть независимой от оригинала');

        assert.notStrictEqual([...clonedSet][2], [...originalSet][2], 'Вложенный объект в Set должен быть независимым');
    });

    QUnit.test('Работает правильно для Map', (assert) => {
        const originalMap = new Map([[1, "one"], [2, "two"],
            [3, {a: {c: {a: undefined}, p: NaN}}]
        ]);
        const clonedMap = deepClone(originalMap);

        assert.deepEqual([...clonedMap], [...originalMap], 'Копия Map должна быть равна оригиналу');
        assert.notStrictEqual(clonedMap, originalMap, 'Копия Map должна быть независимой от оригинала');

        assert.notStrictEqual(clonedMap.get(3), originalMap.get(3), 'Вложенный объект в Map должен быть независимым');
    });
});