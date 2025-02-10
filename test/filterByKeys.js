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
});
