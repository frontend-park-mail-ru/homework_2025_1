"use strict";

QUnit.module("Тестируем функцию filterObjectByKeys", () => {
  QUnit.test("Работает правильно с простыми объектами", (assert) => {
    const originalObject = { a: 1, b: 2, c: 3 };
    const keysToFilter = ["a", "c"];
    const result = filterObjectByKeys(originalObject, keysToFilter);

    assert.deepEqual(
      result,
      { a: 1, c: 3 },
      "Объект должен содержать только указанные ключи"
    );
  });

  QUnit.test("Работает правильно с вложенными объектами", (assert) => {
    const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
    const keysToFilter = ["b", "e"];
    const result = filterObjectByKeys(originalObject, keysToFilter);

    assert.deepEqual(
      result,
      { b: { c: 2, d: 3 }, e: 4 },
      "Вложенные объекты должны быть скопированы"
    );
  });

  QUnit.test("Работает правильно отсутствующими ключами", (assert) => {
    const originalObject = { a: 1, b: 2 };
    const keysToFilter = ["a", "c"]; // 'c' отсутствует
    const result = filterObjectByKeys(originalObject, keysToFilter);

    assert.deepEqual(
      result,
      { a: 1 },
      "Отсутствующие ключи должны быть проигнорированы"
    );
  });

  // Дальше идут собственные тесты
  QUnit.test("Работает с пустым массивом ключей", (assert) => {
    const originalObject = { a: 1, b: 2 };
    const keysToFilter = [];
    const result = filterObjectByKeys(originalObject, keysToFilter);
    assert.deepEqual(
      result,
      {},
      "Если массив ключей пуст, результат должен быть пустым объектом"
    );
  });

  QUnit.test("Работает, если все ключи отсутствуют", (assert) => {
    const originalObject = { x: 10, y: 20 };
    const keysToFilter = ["a", "b", "c"];
    const result = filterObjectByKeys(originalObject, keysToFilter);
    assert.deepEqual(
      result,
      {},
      "Если все ключи отсутствуют, результат должен быть пустым объектом"
    );
  });

  QUnit.test(
    "Работает правильно с вложенными и далее измененными объектами",
    (assert) => {
      const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
      const keysToFilter = ["b", "e"];

      const result = filterObjectByKeys(originalObject, keysToFilter);
      originalObject.b.c = 666;

      assert.deepEqual(
        result,
        { b: { c: 2, d: 3 }, e: 4 },
        "Вложенные объекты должны быть скопированы"
      );
    }
  );

  QUnit.test("Работает, если keysToFilter = null", (assert) => {
    const originalObject = { x: 10, y: 20 };
    const keysToFilter = null;

    assert.throws(
      () => filterObjectByKeys(originalObject, keysToFilter),
      TypeError,
      "Вызывает ошибку, если передать не массив ключей"
    );
  });

  QUnit.test("Работает, если originalObject = null", (assert) => {
    const originalObject = null;
    const keysToFilter = ["a", "b", "c"];
    assert.throws(
      () => filterObjectByKeys(originalObject, keysToFilter),
      TypeError,
      "Вызывает ошибку, если передать не объект"
    );
  });

  QUnit.test("Работает, если originalObject = undefined", (assert) => {
    let originalObject;
    const keysToFilter = ["a", "b", "c"];
    assert.throws(
      () => filterObjectByKeys(originalObject, keysToFilter),
      TypeError,
      "Вызывает ошибку, если передать не объект"
    );
  });

  QUnit.test("Работает, если keysToFilter = undefined", (assert) => {
    const originalObject = { x: 10, y: 20 };
    let keysToFilter;
    assert.throws(
      () => filterObjectByKeys(originalObject, keysToFilter),
      TypeError,
      "Вызывает ошибку, если передать не массив ключей"
    );
  });

  QUnit.test("Работает, если originalObject не объект", (assert) => {
    const originalObject = 123;
    const keysToFilter = ["a", "b", "c"];
    assert.throws(
      () => filterObjectByKeys(originalObject, keysToFilter),
      TypeError,
      "Вызывает ошибку, если передать не объект"
    );
  });

  QUnit.test("Работает, если originalObject не объект (part 2)", (assert) => {
    const originalObject = "Hello world!";
    const keysToFilter = ["a", "b", "c"];
    assert.throws(
      () => filterObjectByKeys(originalObject, keysToFilter),
      TypeError,
      "Вызывает ошибку, если передать не объект"
    );
  });

  QUnit.test("Работает, если keysToFilter не массив", (assert) => {
    const originalObject = { x: 10, y: 20 };
    const keysToFilter = 123;
    assert.throws(
      () => filterObjectByKeys(originalObject, keysToFilter),
      TypeError,
      "Вызывает ошибку, если передать не массив ключей"
    );
  });

  QUnit.test(
    "Работает, если keysToFilter массив, но не со строками",
    (assert) => {
      const originalObject = { x: 10, y: 20 };
      const keysToFilter = ["a", 10, "c"];
      assert.throws(
        () => filterObjectByKeys(originalObject, keysToFilter),
        TypeError,
        "Вызывает ошибку, если передать не массив ключей"
      );
    }
  );
});
