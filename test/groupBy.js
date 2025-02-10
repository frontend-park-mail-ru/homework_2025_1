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

    // Новые тесты
    
    QUnit.test('Обрабатывает объекты без указанного ключа корректно', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, name: 'banana' }, 
            { id: 3, category: 'vegetable', name: 'carrot' }
        ];
        const result = groupBy(data, 'category');
    
        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit', name: 'apple' }],
            vegetable: [
                { id: 3, category: 'vegetable', name: 'carrot' }],
            undefined: [
                { id: 2, name: 'banana' }]
        }, 'Объекты без ключа должны группироваться под "undefined"');
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
});
