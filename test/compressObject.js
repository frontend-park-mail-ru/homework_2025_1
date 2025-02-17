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

    QUnit.test("Объект без null, undefined и пустых строк не изменяется", function(assert) {
        const result = compressObject({
            name: "Иван",
            age: 25,
            city: "Москва"
        });

        assert.deepEqual(result, { name: "Иван", age: 25, city: "Москва" }, "Объект без пустых значений должен остаться неизменным.");
    });

    QUnit.test("Не удаляет вложенные объекты", function(assert) {
        const result = compressObject({
            user: { name: "Андрей", age: 30 },
            city: "",
            country: "Россия"
        });

        assert.deepEqual(result, { user: { name: "Андрей", age: 30 }, country: "Россия" }, "Вложенные объекты не должны удаляться.");
    });

    QUnit.test("Работает с пустым объектом", function(assert) {
        const result = compressObject({});

        assert.deepEqual(result, {}, "Пустой объект должен вернуть пустой объект.");
    });

    QUnit.test("Выбрасывает ошибку при передаче массива", function(assert) {
        assert.throws(
            () => compressObject(["a", "b", "c"]),
            TypeError,
            "Передача массива должна вызвать TypeError."
        );
    });

    QUnit.test("Выбрасывает ошибку при передаче строки", function(assert) {
        assert.throws(
            () => compressObject("hello"),
            TypeError,
            "Передача строки должна вызвать TypeError."
        );
    });
});
