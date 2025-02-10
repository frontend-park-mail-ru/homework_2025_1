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

    QUnit.test("Работает с пустым вложенным объектом", function(assert) {
        const result = compressObject({
            a: {}
        });

        assert.deepEqual(result, { a: {} }, "Вложенный объект должен сохраниться.")
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

        assert.deepEqual(result, { a: { A: null, B: undefined, C: "", D: "Квас" }, b: "Компот" }, "Вложенный объект не должен изменить своё содержимое.")
    });

});
