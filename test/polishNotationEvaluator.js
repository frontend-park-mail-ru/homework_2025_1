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
});
