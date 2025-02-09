'use strict';

QUnit.module("Тестируем функцию mergeBy", function() {
    QUnit.test("Работает правильно с одинаковыми значениями по ключу", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["friend"] },
            { id: 2, name: "Bob", tags: ["colleague"] }
        ];
        const array2 = [
            { id: 1, age: 30, tags: ["travel"] },
            { id: 3, name: "Charlie" }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["friend", "travel"], age: 30 },
            { id: 2, name: "Bob", tags: ["colleague"] },
            { id: 3, name: "Charlie" }
        ]);
    });

    QUnit.test("Работает правильно с отсутствующими ключами", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
        ];
        const array2 = [
            { age: 30 },
            { id: 2, age: 25 }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob", age: 25 }
        ]);
    });

    QUnit.test("Работает правильно с разными ключами", function(assert) {
        const arr1 = [
            { id: 'A123', description: 'Awesome' },
            { id: 'B456', description: 'Fantastic', price: 99.99 }
        ];
        
        const arr2 = [
            { id: 'A123', price: 19.99, discount: 0.1 },
            { id: 'C789', description: 'Incredible', price: 49.99 }
        ];

        const result = mergeBy(arr1, arr2, 'id');

        assert.deepEqual(result, [
            { id: 'A123', description: 'Awesome', price: 19.99, discount: 0.1 },
            { id: 'B456', description: 'Fantastic', price: 99.99 },
            { id: 'C789', description: 'Incredible', price: 49.99 }

        ]);
    });

    QUnit.test("Работает с полностью разными массивами, но с переданными одинаковыми ключами", function(assert) {
        const arr1 = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' }
        ];
        
        const arr2 = [
            { user_id: 1, city: 'Moskow' },
            { user_id: 3, city: 'St. Petersburg' }
        ];

        const result = mergeBy(arr1, arr2, 'id');

        assert.deepEqual(result, [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' }

        ]);
    });
});
