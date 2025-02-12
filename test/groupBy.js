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

    QUnit.test('Работает правильно с не-объектами', assert => {
        const input = [
            { id: 1, category: 'fruit', name: 'apple' },
            'invalid', 
            { id: 2, category: 'vegetable', name: 'carrot' }
        ];
        const result = groupBy(input, 'category');

        assert.deepEqual(result, {
            fruit: [
              { id: 1, category: 'fruit', name: 'apple' }
            ],
            undefined: ['invalid'],
            vegetable: [
              { id: 2, category: 'vegetable', name: 'carrot' }
            ]
        }, 'Не-объекты были записаны в категорию "undefined"');
    });

    QUnit.test('Работает правильно с объектами без категории', assert => {
        const input = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, name: 'unknown' }, 
            { id: 3, category: 'vegetable', name: 'carrot' }
        ];
        const result = groupBy(input, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit', name: 'apple' }
            ],
            undefined: [
              { id: 2, name: 'unknown' }
            ],
            vegetable: [
              { id: 3, category: 'vegetable', name: 'carrot' }
            ]
          }, 'Объекты без категории были записаны в категорию undefined');
    });

    QUnit.test('Работает правильно с числовыми ключами', assert => {
        const input = [
            { 14: 1, category: 'fruit', name: 'apple' },
            { 100000000000: 2, category:'fruit', name: 'orange' }, 
            { 0: 3, category: 'vegetable', name: 'carrot' }
        ];
        const result = groupBy(input, 'category');

        const expected = {
            fruit: [
                { '14': 1, category: 'fruit', name: 'apple' },
                { '100000000000': 2, category:'fruit', name: 'orange' }
            ],
            vegetable: [
              { '0': 3, category: 'vegetable', name: 'carrot' }
            ]
          };
        assert.deepEqual(result, expected, 'Числа корректно преобразуются в строки');
    });

    QUnit.test('Работает правильно с булевыми значениями в ключах', assert => {
        const input = [
            { true: 1, category: 'fruit', name: 'apple' },
            { false: 2, category:'fruit', name: 'orange' }, 
            { true: 3, category: 'vegetable', name: 'carrot' }
        ];
        const expected = {
            fruit: [
                { 'true': 1, category: 'fruit', name: 'apple' },
                { 'false': 2, category:'fruit', name: 'orange' }, 
            ],
            vegetable: [
              { 'true': 3, category: 'vegetable', name: 'carrot' }
            ]
          };
        const result = groupBy(input, 'category');
        assert.deepEqual(result, expected, 'Числа корректно преобразуются в строки');
    });

    QUnit.test('Работает правильно с объект строками в значении атрибутов', (assert) => {
        const data = [
            { id: 1, category: new String('fruit'), name: new String('apple') },
            { id: 2, category: new String('fruit'), name: new String('banana') },
            { id: 3, category: new String('vegetable'), name: new String('carrot') },
            { id: 4, category: new String('fruit'), name: new String('orange') },
            { id: 5, category: new String('vegetable'), name: new String('lettuce') }
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

    
    QUnit.test('Работает правильно если передать первым аргументом не массив', (assert) => {
        const data = 123;
        assert.throws(() => {
            groupBy(data, 123)
        }, TypeError, 'Ошибка выбрасывается, если первый аргумент функции не массив объектов');
    });

    QUnit.test('Работает правильно с группировкой по ключу с не строковыми типами данных', (assert) => {
        const data = [
            { true: 'in_stock', category: 'fruit', name: 'apple', 1: 12},
            { true: 'in_stock', category: 'fruit', name: 'banana', 1: -21 },
            { true: 'not_in_stock', category: 'vegetable', name: 'carrot', 1: 12 },
            { true: 'in_stock', category: 'fruit', name: 'orange', 1: -21 },
            { true: 'not_in_stock', category: 'vegetable', name: 'lettuce', 1:12 }
        ];

        const result1 = groupBy(data, true);
        const result2 = groupBy(data, 1);

        assert.deepEqual(result1, {
            in_stock: [
                { true: 'in_stock', category: 'fruit', name: 'apple', 1: 12},
                { true: 'in_stock', category: 'fruit', name: 'banana', 1: -21 },
                { true: 'in_stock', category: 'fruit', name: 'orange', 1: -21 },
            ],
            not_in_stock: [
            { true: 'not_in_stock', category: 'vegetable', name: 'carrot', 1: 12 },
            { true: 'not_in_stock', category: 'vegetable', name: 'lettuce', 1:12 }
        ]
        }, 'Объекты должны быть сгруппированы по ключу с булевым значением');

        assert.deepEqual(result2, {
            '12': [
                { true: 'in_stock', category: 'fruit', name: 'apple', 1: 12},
                { true: 'not_in_stock', category: 'vegetable', name: 'carrot', 1: 12 },
                { true: 'not_in_stock', category: 'vegetable', name: 'lettuce', 1:12 }
            ],
            '-21': [
                { true: 'in_stock', category: 'fruit', name: 'banana', 1: -21 },
                { true: 'in_stock', category: 'fruit', name: 'orange', 1: -21 }
            ]
        }, 'Объекты должны быть сгруппированы по ключу с числовым значением');
    });
});
