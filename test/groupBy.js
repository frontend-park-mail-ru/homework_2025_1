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

    QUnit.test('Работает правильно с группировкой по числовому ключу', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple', price: 10 },
            { id: 2, category: 'fruit', name: 'banana', price: 50 },
            { id: 3, category: 'vegetable', name: 'carrot', price: 20 },
            { id: 4, category: 'vegetable', name: 'lettuce', price: 20 }
        ];
        const result = groupBy(data, 'price');
    
        assert.deepEqual(result, {
            10: [
                { id: 1, category: 'fruit', name: 'apple', price: 10 }
            ],
            50: [
                { id: 2, category: 'fruit', name: 'banana', price: 50 }
            ],
            20: [
                { id: 3, category: 'vegetable', name: 'carrot', price: 20 },
                { id: 4, category: 'vegetable', name: 'lettuce', price: 20 }
            ]
        }, 'Объекты должны быть сгруппированы по числовому значению');
    });

    QUnit.test('Обрабатывает неверные типы данных: первый аргумент не массив', (assert) => {
        assert.throws(
            () => groupBy('not an array', 'category'), 
            /The first argument must be an array/, 
            'Функция должна выбрасывать ошибку, если первый аргумент не массив'
        );
    });
    
    QUnit.test('Обрабатывает неверные типы данных: ключ не строка и не число', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' }
        ];

        assert.throws(
            () => groupBy(data, null), 
            /The key must be a string or a number/,
            'Функция должна выбрасывать ошибку, если ключ — null'
        );

        assert.throws(
            () => groupBy(data, undefined), 
            /The key must be a string or a number/,
            'Функция должна выбрасывать ошибку, если ключ — undefined'
        );

        assert.throws(
            () => groupBy(data, true), 
            /The key must be a string or a number/,
            'Функция должна выбрасывать ошибку, если ключ — булевое значение'
        );
    });
    
    QUnit.test('Обрабатывает массив с элементами, не являющимися объектами', (assert) => {
        assert.throws(
            () => groupBy([1, 2, 3], 'category'), 
            /All elements in the array must be objects/,
            'Функция должна выбрасывать ошибку, если в массиве есть числа'
        );
    
        assert.throws(
            () => groupBy(['apple', 'banana', 'carrot'], 'category'), 
            /All elements in the array must be objects/,
            'Функция должна выбрасывать ошибку, если в массиве есть строки'
        );
    
        assert.throws(
            () => groupBy([null, { id: 1, category: 'fruit' }], 'category'), 
            /All elements in the array must be objects/,
            'Функция должна выбрасывать ошибку, если в массиве есть null'
        );
    
        assert.throws(
            () => groupBy([undefined, { id: 2, category: 'vegetable' }], 'category'), 
            /All elements in the array must be objects/,
            'Функция должна выбрасывать ошибку, если в массиве есть undefined'
        );
    
        assert.throws(
            () => groupBy([[1, 2], { id: 3, category: 'fruit' }], 'category'), 
            /All elements in the array must be objects/,
            'Функция должна выбрасывать ошибку, если в массиве есть вложенные массивы'
        );
    });
    
    QUnit.test('Обрабатывает new String() и new Number() в массиве как ошибки', (assert) => {
        assert.throws(
            () => groupBy([{ id: 1, category: new String('fruit'), name: 'apple' }], 'category'),
            /The key value in the object must be a string or a number/,
            'Функция должна выбрасывать ошибку, если в массиве есть new String()'
        );
    
        assert.throws(
            () => groupBy([{ id: 2, category: new Number(1), name: 'banana' }], 'category'),
            /The key value in the object must be a string or a number/,
            'Функция должна выбрасывать ошибку, если в массиве есть new Number()'
        );
    });
    
    QUnit.test("Группировка с ключом new String()", (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', name: 'banana' },
            { id: 3, category: 'vegetable', name: 'carrot' }
        ];
        
        const key = new String('category'); 
        const expected = {
            fruit: [
                { id: 1, category: 'fruit', name: 'apple' },
                { id: 2, category: 'fruit', name: 'banana' }
            ],
            vegetable: [
                { id: 3, category: 'vegetable', name: 'carrot' }
            ]
        };
    
        assert.deepEqual(groupBy(data, key), expected, "Функция должна корректно группировать по ключу new String");
    });           
});
