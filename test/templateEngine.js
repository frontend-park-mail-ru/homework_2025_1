'use strict';

QUnit.module("Тестируем функцию templateEngine", function() {
    QUnit.test("Работает правильно с простым шаблоном с одной переменной", function(assert) {
        const template = "Привет, {{name}}!";
        const data = { name: "Технопарк" };
        const result = templateEngine(template, data);

        assert.equal(result, "Привет, Технопарк!");
    });

    QUnit.test("Работает правильно с шаблоном с отсутствующими переменными", function(assert) {
        const template = "Привет, {{name}}! Тебе {{age}} лет.";
        const data = { name: "Технопарк" };
        const result = templateEngine(template, data);

        assert.equal(result, "Привет, Технопарк! Тебе  лет."); // Возраст не найден, заменён на пустую строку
    });

    QUnit.test("Работает правильно с шаблоном с вложенными переменными", function(assert) {
        const template = "Город: {{address.city}}, Улица: {{address.street}}";
        const data = { address: { city: "Москва", street: "2-я Бауманская" } };
        const result = templateEngine(template, data);

        assert.equal(result, "Город: Москва, Улица: 2-я Бауманская");
    });

    QUnit.test("Работает правильно с шаблоном с \"неправильной\" скобочной последовательностью", function(assert) {
        const template = "Город: {{{address.city}, Улица: {{address.street}}";
        const data = { address: { city: "Москва", street: "2-я Бауманская" } };
        const result = templateEngine(template, data);

        assert.equal(result, "Город: {{{address.city}, Улица: 2-я Бауманская");
    });

    QUnit.test("Работает правильно с шаблоном с \"неправильной\" скобочной последовательностью", function(assert) {
        const template = "Город: {{address.city}}}, Улица: {{address.street}}";
        const data = { address: { city: "Москва", street: "2-я Бауманская" } };
        const result = templateEngine(template, data);

        assert.equal(result, "Город: {{address.city}}}, Улица: 2-я Бауманская");
    });

    QUnit.test("Работает правильно с шаблоном с большим количеством скобок", function(assert) {
        const template = "Город: {{{{{address.city}}}}}, Улица: {{address.street}}";
        const data = { address: { city: "Москва", street: "2-я Бауманская" } };
        const result = templateEngine(template, data);

        assert.equal(result, "Город: Москва, Улица: 2-я Бауманская");
    });
});

