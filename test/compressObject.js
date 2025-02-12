'use strict';

QUnit.module("Тестируем функцию compressObject", function() {
    QUnit.test("Сжатие объекта с null, undefined и пустыми строками", function(assert) {
        const result = compressObject({
            name: "Андрей",
            age: null,
            city: "",
            country: "Россия",
            occupation: undefined
        });

        assert.deepEqual(result, { name: "Андрей", country: "Россия" }, "Должны остаться только ключи с ненулевыми значениями.");
    });

    QUnit.test("Работает с объектом без ненулевых значений", function(assert) {
        const result = compressObject({
            a: null,
            b: undefined,
            c: "",
        });

        assert.deepEqual(result, {}, "Объект без ненулевых значений должен вернуть пустой объект.");
    });

    QUnit.test("Работает с пустым объектом", function(assert) {
        const result = compressObject({});

        assert.deepEqual(result, {}, "Пустой объект должен вернуть пустой объект.");
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

    QUnit.test("Корректно отвечает на число.", function(assert) {
        assert.throws(
            function () { compressObject(42); },
            function (error) {
                return error.name === "TypeError";
            },
            "Выкидывает исключение."
        );
    });

    QUnit.test("Корректно отвечает на строку.", function(assert) {
        assert.throws(
            function () { compressObject("The meaning of life"); },
            function (error) {
                return error.name === "TypeError";
            },
            "Выкидывает исключение."
        );
    });

    QUnit.test("Корректно отвечает на массив.", function(assert) {
        assert.throws(
            function () { compressObject([1, 3, 5]); },
            function (error) {
                return error.name === "TypeError";
            },
            "Выкидывает исключение."
        );
    });

});
