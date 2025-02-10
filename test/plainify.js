'use strict';
/* eslint-disable require-jsdoc */

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
    
    QUnit.test('Работает правильно с объектом, содержащим функции', (assert) => {
        const originalObject = {
            num: 1,
            hello: function() { return 'hello'; },
            russia: {
                omsk: function() { return 'omsk'; }
            }
        };
        const result = plainify(originalObject);
    
        assert.deepEqual(result, { num: 1, hello: originalObject.hello, 'russia.omsk': originalObject.russia.omsk }, 'Функции должны быть сохранены, но не вызваны');
    });

    QUnit.test('Работает правильно с параметром prefix', (assert) => {
        const originalObject = {
            a: 1,
            b: {
                c: 2
            }
        };
        const result = plainify(originalObject, 'prefix.');
    
        assert.deepEqual(result, { 'prefix.a': 1, 'prefix.b.c': 2 }, 'Префикс должен добавляться к каждому ключу на соответствующем уровне вложенности');
    });
    

});
