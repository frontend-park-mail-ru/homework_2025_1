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

    QUnit.test("Работает правильно с шаблоном с вложенными переменными разного уровня", function(assert) {
        const template = "Команда {{Liverpool.number}} выиграла с составом: {{Liverpool.team.base.atk.left}}, {{Liverpool.team.base.mid.center}}, {{Liverpool.team.base.def.right}} у команды {{Chelsea.number}} с составом: {{Chelsea.team.base.atk.center}}, {{Chelsea.team.reserve.mid.left}}, {{Chelsea.team.reserve.def.left}}";
        const data = { 
            Liverpool: { number: "10", team: {base: {atk: {left: "LBLA", center: "LBCA", right: "LBRA"}, 
                                    mid: {left: "LBLM", center: "LBCM", right: "LBRM"}, 
                                    def: {left: "LBLD", center: "LBCD", right: "LBRD"}}, 
                        reserve: {atk: {left: "LRLA", center: "LRCA", right: "LRRA"}, 
                                    mid: {left: "LRLM", center: "LRCM", right: "LRRM"}, 
                                    def: {left: "LRLM", center: "LRCM", right: "LRRM"}}, } }, 
            Chelsea: { number: "20", team: { base: {atk: {left: "CBLA", center: "CBCA", right: "CBRA"}, 
                                    mid: {left: "CBLM", center: "CBCM", right: "CBRM"}, 
                                    def: {left: "CBLD", center: "CBCD", right: "CBRD"}}, 
                        reserve: {atk: {left: "CRLA", center: "CRCA", right: "CRRA"}, 
                                    mid: {left: "CRLM", center: "CRCM", right: "CRRM"}, 
                                    def: {left: "CRLD", center: "CRCD", right: "CRRD"}}, } }
        };
        const result = templateEngine(template, data);

        assert.equal(result, "Команда 10 выиграла с составом: LBLA, LBCM, LBRD у команды 20 с составом: CBCA, CRLM, CRLD");
    });

    QUnit.test("Работает правильно с пустым объектом данных", function(assert) {
        const template = "{{one}}1{{two}}2{{three}}3";
        const data = {};
        const result = templateEngine(template, data);

        assert.equal(result, "123");
    });
});

