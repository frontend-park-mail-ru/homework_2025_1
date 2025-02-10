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
            { id: 1, category: "fruit", name: "apple" },
            "invalid", 
            { id: 2, category: "vegetable", name: "carrot" }
        ];
        const expected = {
            fruit: [
              { id: 1, category: "fruit", name: "apple" }
            ],
            undefined: ["invalid"],
            vegetable: [
              { id: 2, category: "vegetable", name: "carrot" }
            ]
        };
        const result = groupBy(input);
        assert.deepEqual(result, expected, 'Не-объекты были записаны в категорию "undefined"');
    });

QUnit.test('Работает правильно с объектами без категории', assert => {
        const input = [
            { id: 1, category: "fruit", name: "apple" },
            { id: 2, name: "unknown" }, 
            { id: 3, category: "vegetable", name: "carrot" }
        ];
        const expected = {
            fruit: [
                { id: 1, category: "fruit", name: "apple" }
            ],
            undefined: [
              { id: 2, name: "unknown" }
            ],
            vegetable: [
              { id: 3, category: "vegetable", name: "carrot" }
            ]
          };
        const result = groupBy(input);
        assert.deepEqual(result, expected, 'Объекты без категории были записаны в группу undefined');
    });
});
