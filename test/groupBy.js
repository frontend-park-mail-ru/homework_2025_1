'use strict';

QUnit.module('Тестируем функцию groupBy', () => {
    QUnit.test('Работает правильно с группировкой по ключу', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', name: 'banana' },
            { id: 3, category: 'vegetable', name: 'carrot' },
            { id: 4, category: 'fruit', name: 'orange' },
            { id: 5, category: 'vegetable', name: 'lettuce' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit', name: 'apple' },
                { id: 2, category: 'fruit', name: 'banana' },
                { id: 4, category: 'fruit', name: 'orange' }
            ],
            vegetable: [
                { id: 3, category: 'vegetable', name: 'carrot' },
                { id: 5, category: 'vegetable', name: 'lettuce' }
            ]
        }, 'Объекты должны быть сгруппированы по категории');
    });

    QUnit.test('Работает правильно с пустым массивом', (assert) => {
        const emptyData = [];
        const result = groupBy(emptyData, 'category');

        assert.deepEqual(result, {}, 'Пустой массив должен возвращать пустой объект');
    });

    QUnit.test('Работает правильно, когда все объекты имеют одно значение по ключу', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', name: 'banana' },
            { id: 3, category: 'fruit', name: 'orange' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit', name: 'apple' },
                { id: 2, category: 'fruit', name: 'banana' },
                { id: 3, category: 'fruit', name: 'orange' }
            ]
        }, 'Все объекты должны быть сгруппированы под одним значением');
    });

    QUnit.test('Работает правильно, когда в объектах нет заданного ключа', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', name: 'banana' },
            { id: 3, category: 'vegetable', name: 'carrot' },
            { id: 4, category: 'fruit', name: 'orange' },
            { id: 5, category: 'vegetable', name: 'lettuce' }
        ];
        const result = groupBy(data, 'somethingElse');

        assert.deepEqual(result, {}, 'Несуществующий в объектах массива ключ возвращает пустой объект');
    });

    QUnit.test('Работает правильно, когда только часть объектов имеет заданное по ключу свойство', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple', color: 'green' },
            { id: 2, category: 'fruit', name: 'banana',  },
            { id: 3, category: 'vegetable', name: 'carrot' },
            { id: 4, category: 'fruit', name: 'orange', color: 'orange' },
            { id: 5, category: 'vegetable', name: 'lettuce', color: 'green' }
        ];
        const result = groupBy(data, 'color');

        assert.deepEqual(result, {
            green: [
                { id: 1, category: 'fruit', name: 'apple', color: 'green' },
                { id: 5, category: 'vegetable', name: 'lettuce', color: 'green' }
            ],
            orange: [ 
                { id: 4, category: 'fruit', name: 'orange', color: 'orange' }
            ]
        }, 'Должны быть сгруппированы только объекты со свойством цвета');
    });

    QUnit.test('Работает правильно при наличии вложенных объектов', (assert) => {
        const data = [
            { id: 1, type: 'container', contents: {id: 1, category: 'fruit', name: 'apple'} },
            { id: 2, type: 'container', contents: {id: 2, name: 'cucumber'} },
            { id: 3, type: 'object', name: 'box' },
        ];
        const result = groupBy(data, 'type');

        assert.deepEqual(result, {
            container: [
                { id: 1, type: 'container', contents: {id: 1, category: 'fruit', name: 'apple'} },
                { id: 2, type: 'container', contents: {id: 2, name: 'cucumber'} },
            ],
            object: [ 
                { id: 3, type: 'object', name: 'box' }
            ]
        }, 'Должны быть верно сгруппированы вложенные объекты');
    });

    QUnit.test('Работает правильно при цепочке ключей группировки', (assert) => {
        const data = [
            { id: 1, type: 'container', contents: {id: 1, category: 'fruit', name: 'apple'} },
            { id: 2, type: 'container', contents: {id: 2, name: 'cucumber'} },
            { id: 3, type: 'object', name: 'box' },
            { id: 4, type: 'container', contents: {id: 4, category: 'fruit', name: 'banana'} },
            { id: 5, type: 'container', contents: {id: 5, category: 'vegetable', name: 'carrot'} },
        ];
        const result = groupBy(data, 'contents.category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, type: 'container', contents: {id: 1, category: 'fruit', name: 'apple'} },
                { id: 4, type: 'container', contents: {id: 4, category: 'fruit', name: 'banana'} },
            ],
            vegetable: [ 
                { id: 5, type: 'container', contents: {id: 5, category: 'vegetable', name: 'carrot'} }
            ]
        }, 'Объекты должны быть сгруппированы по вложенному свойству category');
    });

    QUnit.test('Работает правильно при большей цепочке ключей группировки', (assert) => {
        const data = [
            { id: 1, type: 'container', contents: {id: 1, name: 'apple', properties: {color: 'green'} } },
            { id: 2, type: 'container', contents: {id: 2, name: 'cucumber', properties: {color: 'green'} } },
            { id: 3, type: 'object', name: 'box' },
            { id: 4, type: 'container', contents: {id: 4, name: 'banana'} },
            { id: 5, type: 'container', contents: {id: 5, name: 'carrot', properties: {color: 'orange'} } },
            { id: 6, type: 'container', contents: {id: 6, name: 'strawberry', properties: {amount: 100} } },
        ];
        const result = groupBy(data, 'contents.properties.color');

        assert.deepEqual(result, {
            green: [
                { id: 1, type: 'container', contents: {id: 1, name: 'apple', properties: {color: 'green'} } },
                { id: 2, type: 'container', contents: {id: 2, name: 'cucumber', properties: {color: 'green'} } }
            ],
            orange: [ 
                { id: 5, type: 'container', contents: {id: 5, name: 'carrot', properties: {color: 'orange'} } }
            ]
        }, 'Объекты должны быть сгруппированы по вложенному свойству color');
    });

    QUnit.test('Работает правильно при наличии объекта-ключа', (assert) => {
        const data = [
            { id: 1, type: 'container', contents: {id: 1, name: 'apple', properties: {color: 'green'} } },
            { id: 2, type: 'container', contents: {id: 2, name: 'cucumber', properties: {color: 'green'} } },
            { id: 3, type: 'object', name: 'box' },
            { id: 4, type: 'container', contents: {id: 1, name: 'apple', properties: {color: 'green'} } },
            { id: 5, type: 'container', contents: {id: 5, name: 'carrot', properties: {color: 'orange'} } },
        ];
        const result = groupBy(data, 'contents');

        assert.deepEqual(result, {
            '{"id":1,"name":"apple","properties":{"color":"green"}}': [
                { id: 1, type: 'container', contents: {id: 1, name: 'apple', properties: {color: 'green'} } },
                { id: 4, type: 'container', contents: {id: 1, name: 'apple', properties: {color: 'green'} } }
            ],
            '{"id":2,"name":"cucumber","properties":{"color":"green"}}': [ 
                { id: 2, type: 'container', contents: {id: 2, name: 'cucumber', properties: {color: 'green'} } }
            ],
            '{"id":5,"name":"carrot","properties":{"color":"orange"}}': [
                { id: 5, type: 'container', contents: {id: 5, name: 'carrot', properties: {color: 'orange'} } }
            ]
        }, 'Объекты должны быть сгруппированы по объектам внутри свойства contents');
    });

    QUnit.test('Работает правильно при наличии массива-ключа', (assert) => {
        const data = [
            { id: 1, type: 'container', contents: [{name: 'banana'}, {name: 'apple'}, {name: 'cucumber'}] },
            { id: 2, type: 'container', contents: [{name: 'banana'}, {name: 'apple'}, {name: 'cucumber'}] },
            { id: 3, type: 'object', name: 'box' },
            { id: 4, type: 'container', contents: [{name: 'tomato'}, {name: 'apple'}, {name: 'cucumber'}] },
            { id: 5, type: 'container', contents: {id: 5, name: 'carrot', properties: {color: 'orange'} } },
        ];
        const result = groupBy(data, 'contents');

        assert.deepEqual(result, {
            '[{"name":"banana"},{"name":"apple"},{"name":"cucumber"}]': [
                { id: 1, type: 'container', contents: [{name: 'banana'}, {name: 'apple'}, {name: 'cucumber'}] },
                { id: 2, type: 'container', contents: [{name: 'banana'}, {name: 'apple'}, {name: 'cucumber'}] }
            ],
            '[{"name":"tomato"},{"name":"apple"},{"name":"cucumber"}]': [
                { id: 4, type: 'container', contents: [{name: 'tomato'}, {name: 'apple'}, {name: 'cucumber'}] }
            ],
            '{"id":5,"name":"carrot","properties":{"color":"orange"}}': [
                { id: 5, type: 'container', contents: {id: 5, name: 'carrot', properties: {color: 'orange'} } }
            ]
        }, 'Объекты должны быть сгруппированы по массивам (или объектам) внутри свойства contents');
    });

    QUnit.test('Работает правильно при наличии ключа типа number и BigInt', (assert) => {
        const data = [
            {name: 'apple', amount: 123},
            {name: 'banana', amount: 777},
            {name: 'tomato', amount: 123n},
            {name: 'carrot', amount: 1234567890123456789012345678901234567890n},
        ];
        const result = groupBy(data, 'amount');

        assert.deepEqual(result, {
            '123': [
                { name: 'apple', amount: 123 }, 
                { name: 'tomato', amount: 123n }
            ],
            '777': [
                { name: 'banana', amount: 777 }
            ],
            '1234567890123456789012345678901234567890': [
                { name: 'carrot', amount: 1234567890123456789012345678901234567890n }
            ]
          }, 'Объекты должны быть сгруппированы по соответственным числам');
    });

    QUnit.test('Работает правильно при ошибке сериализации JSON.stringify()', (assert) => {
        const data = [
            {name: 'apple', amount: [1234567890123456789012345678901234567890n]},
            {name: 'banana', amount: 777},
            {name: 'tomato', amount: 123n},
            {name: 'carrot', amount: 1234567890123456789012345678901234567890n},
        ];
        const result = groupBy(data, new String('amount'));

        assert.deepEqual(result, {
            '123': [
                { name: 'tomato', amount: 123n }
            ],
            '777': [
                { name: 'banana', amount: 777 }
            ],
            '1234567890123456789012345678901234567890': [
                { name: 'carrot', amount: 1234567890123456789012345678901234567890n }
            ]
          }, 'Объект, вызывающий ошибку TypeError (name=apple), должен быть пропущен');
    });

    QUnit.test('Работает правильно при неверно переданном типе первого аргумента', (assert) => {
        assert.throws(() => {groupBy('array', 'string')}, TypeError, "Должна выбрасываться ошибка TypeError");
    });

    QUnit.test('Работает правильно при неверно переданном типе второго аргумента', (assert) => {
        const data = [
            {name: 'apple'},
            {name: 'banana'}
        ];

        assert.throws(() => {groupBy(data, 123)}, TypeError, "Должна выбрасываться ошибка TypeError");
    });
});
