'use strict';

QUnit.module('Тестируем функцию filterObjectByKeys', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'c'];
        const result = filterByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1, c: 3 }, 'Объект должен содержать только указанные ключи');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const keysToFilter = ['b', 'e'];
        const result = filterByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { b: { c: 2, d: 3 }, e: 4 }, 'Вложенные объекты должны быть скопированы');
    });

    QUnit.test('Работает правильно отсутствующими ключами', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const keysToFilter = ['a', 'c']; // 'c' отсутствует
        const result = filterByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1 }, 'Отсутствующие ключи должны быть проигнорированы');
    });

    QUnit.test('Работает правильно с пустым массивом ключей', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const keysToFilter = []; // пусто
        const result = filterByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, {}, 'Выводится пустой объект');
    });

    QUnit.test('Работает правильно вложенным массивом и отсутствующим ключом', (assert) => {
        const originalObject = { a: [1, 5], b: 2 };
        const keysToFilter = ['a', 'c']; // 'c' отсутствует
        const result = filterByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: [1, 5] }, 'Отсутствующие ключи должны быть проигнорированы и вложенные объекты должны быть скопированы');
    });
});
