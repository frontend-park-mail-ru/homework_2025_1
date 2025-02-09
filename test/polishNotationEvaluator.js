'use strict';

QUnit.module("Тестируем функцию polishNotationEvaluator", function() {
    QUnit.test("Правильно вычисляет простое выражения", function(assert) {
        const input = "+ 3 4"; // 3 + 4
        const result = polishNotationEvaluator(input);

        assert.equal(result, 7);
    });

    QUnit.test("Правильно вычисляет выражение с несколькими операциями", function(assert) {
        const input = "* + 2 3 4"; // (2 + 3) * 4
        const result = polishNotationEvaluator(input);

        assert.equal(result, 20);
    });

    QUnit.test("Правильно вычисляет выражение с отрицательными числами", function(assert) {
        const input = "- 5 + 3 2"; // 5 - (3 + 2)
        const result = polishNotationEvaluator(input);

        assert.equal(result, 0);
    });

    QUnit.test("Правильно вычисляет пустое выражение", function(assert) {
        const input = "";
        const result = polishNotationEvaluator(input);

        assert.equal(isNaN(result), true);
    });

    // Дополнительные тесты
    QUnit.test("Правильно вычисляет выражение с делением", function(assert) {
        const input = "/ 8 2"; // 8 / 2
        const result = polishNotationEvaluator(input);

        assert.equal(result, 4);
    });

    QUnit.test("Правильно вычисляет выражение с несколькими операциями и отрицательными числами", function(assert) {
        const input = "+ -3 * 2 -4"; // -3 + (2 * -4)
        const result = polishNotationEvaluator(input);

        assert.equal(result, -11);
    });

    QUnit.test("Правильно вычисляет выражение с несколькими пробелами", function(assert) {
        const input = "+   3    4"; // 3 + 4
        const result = polishNotationEvaluator(input);

        assert.equal(result, 7);
    });

    QUnit.test("Выбрасывает исключение, если входной параметр не является строкой", function(assert) {
        assert.throws(() => polishNotationEvaluator(123), TypeError, 'Input must be a string.');
    });

    QUnit.test("Выбрасывает исключение, если входная строка содержит недопустимые символы", function(assert) {
        assert.throws(() => polishNotationEvaluator("1 a b"), Error, 'Invalid input.');
    });

    QUnit.test("Выбрасывает исключение, если входная строка содержит неверное количество операндов", function(assert) {
        assert.throws(() => polishNotationEvaluator("+ 1"), Error, 'Invalid input.');
    });

    QUnit.test("Выбрасывает исключение, если входная строка содержит недопустимое количество операндов", function(assert) {
        assert.throws(() => polishNotationEvaluator("+ 1 2 3"), Error, 'Invalid input.');
    });
});
