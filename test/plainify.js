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

    QUnit.test('Работает правильно с не вложенным объектом', (assert) => {
        const originalObject = {
            x: 14,
            y: 1,
            z: 2
        };
        const result = plainify(originalObject);

        assert.deepEqual(result, { x: 14, y: 1, z: 2 }, 'Объект не должен измениться');
    });

    QUnit.test('Работает правильно с объектом, содержащим массив', (assert) => {
        const originalObject = {
            x: [1, 2, 3],
            y: {
                z: [4, 5]
            }
        };
        const result = plainify(originalObject);

        assert.deepEqual(result, { "x.0": 1, "x.1": 2, "x.2": 3, "y.z.0": 4, "y.z.1": 5 }, 'Массивы должны оставаться неизменными');
    });

    QUnit.test('Работает правильно с объектом, содержащим null', (assert) => {
        const originalObject = {
            x: 'hello',
            y: 42,
            z: { a: 1, b: 2 },
            null: null,
            undefined: undefined,
        };
        const result = plainify(originalObject);

        assert.deepEqual(result, { x: 'hello', y: 42, 'z.a': 1, 'z.b': 2, null: null, undefined: undefined }, 'Значения null и undefined должны быть правильно сохранены');
    });

    QUnit.test('Работает правильно с глубинной вложенностью', (assert) => {
        const originalObject = {
            hello: {
                I: {
                    am: {
                        a:
                        {
                            tree: true
                        }
                    }
                }

            }
        };
        const result = plainify(originalObject);

        assert.deepEqual(result, { 'hello.I.am.a.tree': true}, 'Глубокая вложенность должна быть корректно обработана');
    });

    QUnit.test('Работает правильно с объектом, содержащим вложенные пустые объекты', (assert) => {
        const originalObject = {
            number: 1,
            nothing: {},
            object: {
                deeper_nothing: {}
            },
            bool: false
        };
        const result = plainify(originalObject);
    
        assert.deepEqual(result, { number: 1, nothing: {}, 'object.deeper_nothing': {}, bool: false }, 'Пустые объекты должны быть сохранены, а вложенные пустые объекты плоскими');
    });

    QUnit.test('Работает правильно с объектом, содержащим массив объектов', (assert) => {
        const originalObject = {
            a: [
                { b: 1 },
                { c: 2 }
            ]
        };
        const result = plainify(originalObject);
    
        assert.deepEqual(result, { 'a.0.b': 1, 'a.1.c': 2 }, 'Объект не должен содержать массива с объектами');
    });
});