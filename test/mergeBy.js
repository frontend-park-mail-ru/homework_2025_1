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

    QUnit.test("Работает с пустыми массивами", function(assert) {
        const result = mergeBy([], [], "id");
        assert.deepEqual(result, []);
    });

    QUnit.test("Работает, если нет совпадающих ключей", function(assert) {
        const array1 = [{ id: 1, name: "Alice" }];
        const array2 = [{ key: 2, name: "Bob" }];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" }
        ]);
    });

    QUnit.test("Работает, если массивы содержат одинаковые объекты", function(assert) {
        const array1 = [{ id: 1, name: "Alice" }];
        const array2 = [{ id: 1, name: "Alice" }];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [{ id: 1, name: "Alice" }]);
    });

    QUnit.test("Работает правильно, если хотя бы один из параметров не массив", function (assert) {
        const array1 = [{id: 1, name: "Alice"}];
        const array2 = "Not an array";

        assert.throws(
        () => mergeBy(array1, array2, "id"),
        TypeError,
        "Ожидается TypeError, если один из параметров не массив"
        );
    })

    QUnit.test("Работает правильно, если ключ является текстом", function (assert) {
        const array1 = [{id: 1, name: "Alice"}];
        const array2 = [{id: 2, name: "Bob"}];
        const key = 2;

        assert.throws(
        () => mergeBy(array1, array2, key),
        TypeError,
        "Ожидается TypeError, если ключ не текст"
        );
    })
});
