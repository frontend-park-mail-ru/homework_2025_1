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

    QUnit.test("Работает правильно с пустыми массивами", function(assert) {
        const array1 = [];
        const array2 = [
            { id: 1, name: "Alice" }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" }
        ]);
    });

    QUnit.test("Работает правильно, если массивы не имеют пересечений по ключу", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" }
        ];
        const array2 = [
            { id: 2, name: "Bob" }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
        ]);
    });

    QUnit.test("Объединяет массивы внутри объектов без дубликатов", function(assert) {
        const array1 = [
            { id: 1, tags: ["A", "B"] }
        ];
        const array2 = [
            { id: 1, tags: ["B", "C"] }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, tags: ["A", "B", "C"] }
        ]);
    });

    QUnit.test("Работает правильно с одинаковыми объектами", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", age: 30 }
        ];
        const array2 = [
            { id: 1, name: "Alice", age: 30 }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", age: 30 }
        ]);
    });
});
