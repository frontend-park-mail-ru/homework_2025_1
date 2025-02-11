'use strict';

QUnit.module("Тестируем функцию compressObject", function() {
    QUnit.test("Сжатие объекта с null, undefined и пустыми строками.", function(assert) {
        const result = compressObject({
            name: "Андрей",
            age: null,
            city: "",
            country: "Россия",
            occupation: undefined
        });

        const expected = {
            name: "Андрей",
            country: "Россия"
        };

        assert.deepEqual(result, expected, "Должны остаться только ключи с ненулевыми значениями.");
    });

    QUnit.test("Работает с объектом без ненулевых значений.", function(assert) {
        const result = compressObject({
            a: null,
            b: undefined,
            c: "",
        });

        const expected = {};

        assert.deepEqual(result, expected, "Объект без ненулевых значений должен вернуть пустой объект.");
    });

    QUnit.test("Работает с пустым объектом", function(assert) {
        const result = compressObject({});
        const expected = {};

        assert.deepEqual(result, expected, "Пустой объект должен вернуть пустой объект.");
    });

    QUnit.test("Работает с пустым вложенным объектом.", function(assert) {
        const result = compressObject({
            a: {}
        });

        const expected = {
            a: {}
        };

        assert.deepEqual(result, expected, "Вложенный объект должен сохраниться.")
    });

    QUnit.test("Работает с вложенным объектом, который содержит нулевые ключи", function(assert) {
        const result = compressObject({
            a: {
                A: null,
                B: undefined,
                C: "",
                D: "Квас"
            },
            b: "Компот",
        });

        const expected = {
            a: {
                A: null,
                B: undefined,
                C: "",
                D: "Квас"
            },
            b: "Компот"
        }

        assert.deepEqual(result, expected, "Вложенный объект не должен изменить своё содержимое.")
    });

    QUnit.test("Не влияет на пары ключ-значение, где значение может быть интерпретировано как false.", function(assert) {
        const result = compressObject({
            a: false,
            b: 0,
            c: -0,
            d: 0n,
            e: NaN
        });

        const expected = {
            a: false,
            b: 0,
            c: -0,
            d: 0n,
            e: NaN
        };

        assert.deepEqual(result, expected, "Другие false-интерпретируемые значения не удаляются из объекта.")
    });

    QUnit.test("Работает с числом.", function(assert) {
        const result = compressObject(42);
        const expected = {};

        assert.deepEqual(result, expected, "Вернёт пустой объект.")
    });

    QUnit.test("Работает со строкой.", function(assert) {
        const result = compressObject("The meaning of life");
        const expected = {};

        assert.deepEqual(result, expected, "Вернёт пустой объект.")
    });

    QUnit.test("Работает с массивом.", function(assert) {
        const result = compressObject([1, 3, 5]);
        const expected = {};

        assert.deepEqual(result, expected, "Вернёт пустой объект.")
    });

});
