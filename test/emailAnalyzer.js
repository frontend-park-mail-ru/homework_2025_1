'use strict';

QUnit.module("Тестируем функцию emailAnalyzer", function() {
    QUnit.test("Работает правильно со строкой с одним email", function(assert) {
        const input = "Мой email: user@example.com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 1,
            uniqueEmails: ["user@example.com"],
            mostFrequentEmail: "user@example.com"
        });
    });

    QUnit.test("Работает правильно со строкой с разными регистрами email", function(assert) {
        const input = "Контакты: User@Example.com и user@example.com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 2,
            uniqueEmails: ["user@example.com"],
            mostFrequentEmail: "user@example.com"
        });
    });

    QUnit.test("Работает правильно со строкой с некорректными email", function(assert) {
        const input = "Некорректные email: user@, @example.com, user@domain..com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 0,
            uniqueEmails: [],
            mostFrequentEmail: ""
        });
    });

    QUnit.test("Работает правильно со строкой с повторяющимися email", function(assert) {
        const input = "Повторяющиеся email: user@example.com, user@example.com, user@example.com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 3,
            uniqueEmails: [],
            mostFrequentEmail: "user@example.com"
        });
    });

    QUnit.test("Работает правильно со строкой с email в разных частях строки", function(assert) {
        const input = "Первый email: first@example.com. Второй email: second@example.com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 2,
            uniqueEmails: ["first@example.com", "second@example.com"],
            mostFrequentEmail: "first@example.com"
        });
    });

    QUnit.test("Работает правильно со строкой без email", function(assert) {
        const input = "В этой строке нет email.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 0,
            uniqueEmails: [],
            mostFrequentEmail: ""
        });
    });

    QUnit.test("Работает правильно со строкой с несколькими разными email", function(assert) {
        const input = "Emails: first@example.com, second@example.com, third@example.com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 3,
            uniqueEmails: ["first@example.com", "second@example.com", "third@example.com"],
            mostFrequentEmail: "first@example.com"
        });
    });

    QUnit.test("Работает правильно со строкой с email и другими символами", function(assert) {
        const input = "Email: user@example.com! Другой текст.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 1,
            uniqueEmails: ["user@example.com"],
            mostFrequentEmail: "user@example.com"
        });
    });

    QUnit.test("Работает правильно с пустой строкой", function(assert) {
        const input = "";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 0,
            uniqueEmails: [],
            mostFrequentEmail: ""
        });
    });
});
