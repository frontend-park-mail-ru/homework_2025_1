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

    QUnit.test("Правильная обработка null значений", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" }
        ];
        const array2 = [
            { id: null, name: "Bob" }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" },
            { id: null, name: "Bob" }
        ]);
    });

    QUnit.test("Правильная обработка undefined значений", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" }
        ];
        const array2 = [
            { id: undefined, name: "Bob" }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" },
            { id: undefined, name: "Bob" }
        ]);
    });

    QUnit.test("Правильная обработка схожих значений разных типов данных", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" }
        ];
        const array2 = [
            { id: "1", name: "Bob" }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" },
            { id: "1", name: "Bob" }
        ]);
    });

    QUnit.test("Правильное объединение вложенных объектов", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", address: { city: "Moscow", zip: "119125" } }
        ];
        const array2 = [
            { id: 1, name: "Alice", address: { country: "Russia" } }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", address: { city: "Moscow", zip: "119125", country: "Russia" } }
        ]);
    });

    QUnit.test("Правильное объединение вложенных объектов и массивов", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["A", "B"], address: { city: "Moscow" } }
        ];
        const array2 = [
            { id: 1, name: "Alice", tags: ["B", "C"], address: { country: "Russia" } }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["A", "B", "C"], address: { city: "Moscow", country: "Russia" } }
        ]);
    });
});
