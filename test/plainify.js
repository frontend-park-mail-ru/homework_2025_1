'use strict';

QUnit.module('Тестируем функцию plainify', () => {
    QUnit.test('Работает правильно с вложенным объектом', (assert) => {
        const originalObject = {
            a: 1,
            b: {
                c: 2,
                d: {
                    e: 3
                }
            },
            f: 4
        };
        const result = plainify(originalObject);

        assert.deepEqual(result, { a: 1, 'b.c': 2, 'b.d.e': 3, f: 4 }, 'Объект должен быть преобразован в plain');
    });

    QUnit.test('Работает правильно с пустым объектом', (assert) => {
        const originalObject = {};
        const result = plainify(originalObject);

        assert.deepEqual(result, {}, 'Пустой объект должен возвращать пустой объект');
    });

    QUnit.test('Работает правильно с объектом, содержащим примитивы', (assert) => {
        const originalObject = {
            x: 'hello',
            y: 42,
            z: { a: 1, b: 2 }
        };
        const result = plainify(originalObject);

        assert.deepEqual(result, { x: 'hello', y: 42, 'z.a': 1, 'z.b': 2 }, 'Примитивы и вложенные объекты должны быть правильно преобразованы');
    });

    QUnit.test('Работает правильно с объектом, содержащим числа в ключах свойств объекта', (assert) => {
        const originalObject = {
            1: 'hello',
            2: 5,
            z: { 3: 'one', 4: 'two' }
        };
        const result = plainify(originalObject);

        assert.deepEqual(result, { 1: 'hello', 2: 5, 'z.3': 'one', 'z.4': 'two' }, 'Объект содержащий числа в ключах свойств должны быть правильно преобразованы');
    });

    QUnit.test('Работает правильно с объектом, содержащим булевые значения в значениях свойств объекта', (assert) => {
        const originalObject = {
            1: true,
            2: false,
            z: { 3: true, 4: false }
        };
        const result = plainify(originalObject);

        assert.deepEqual(result, { 1: true, 2: false, 'z.3': true, 'z.4': false }, 'Примитивы и вложенные объекты должны быть правильно преобразованы');
    });
});
