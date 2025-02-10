'use strict';

QUnit.module('Тестируем функцию filterObjectByKeys', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'c'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1, c: 3 }, 'Объект должен содержать только указанные ключи');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const keysToFilter = ['b', 'e'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { b: { c: 2, d: 3 }, e: 4 }, 'Вложенные объекты должны быть скопированы');
    });

    QUnit.test('Работает правильно отсутствующими ключами', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const keysToFilter = ['a', 'c']; // 'c' отсутствует
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1 }, 'Отсутствующие ключи должны быть проигнорированы');
    });


    // Добавленные тесты


    QUnit.test('Работает правильно с пустым массивом ключей', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const keysToFilter = [];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, {}, 'Если массив ключей пустой, должен возвращаться пустой объект');
    });

    QUnit.test('Работает правильно с пустым объектом', (assert) => {
        const originalObject = {};
        const keysToFilter = ['a', 'b'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, {}, 'Если исходный объект пустой, должен возвращаться пустой объект');
    });

    QUnit.test('Работает с объектами, содержащими null и undefined значения', (assert) => {
        const originalObject = { a: 1, b: null, c: undefined };
        const keysToFilter = ['a', 'b', 'c'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1, b: null, c: undefined }, 'Null и undefined значения должны быть сохранены');
    });

    QUnit.test('Работает с числовыми ключами', (assert) => {
        const originalObject = { 1: 'a', 2: 'b' };
        const keysToFilter = [1, 2];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { 1: 'a', 2: 'b' }, 'Числовые ключи должны корректно обрабатываться');
    });

    
    // Проверка типов


    QUnit.test('Работает, если originalObject не объект', (assert) => {
        const keysToFilter = [1, 2];

        const objectsToTest = {            
            'number': 1,
            'bigint': 1n,
            'string': 'London is the capital of Great Britain',
            'boolean': false,
            'null': null,
            'undefined': undefined
        };

        for (const [testedType, testedObject] of Object.entries(objectsToTest)) {
            assert.throws(
                () => filterObjectByKeys(testedObject, keysToFilter),
                TypeError,
                `Должно быть выброшено исключение TypeError, если typeof obj === ${testedType}`
            );
        }
    });

    QUnit.test('Работает, если keysToFilter не массив', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };

        const keysToTest = {            
            'number': 1,
            'bigint': 1n,
            'string': 'London is the capital of Great Britain',
            'boolean': false,
            'null': null,
            'undefined': undefined
        };

        for (const [testedType, testedKeys] of Object.entries(keysToTest)) {
            assert.throws(
                () => filterObjectByKeys(originalObject, testedKeys),
                TypeError,
                `Должно быть выброшено исключение TypeError, если typeof keys === ${testedType}`
            );
        }
    });
});
