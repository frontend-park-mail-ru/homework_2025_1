'use strict';

/**
 * Функция должна заменять в шаблоне все вхождения переменных, заключённых в фигурные скобки, на соответствующие значения из объекта данных.
 * @param {String} template - шаблон с фигурными скобками (строка)
 * @param {Object} data - объект данных
 * @example
 * // returns "Мне 42 года"
 * "Мне {{age}} года"
 * { age: "42"}
 * @returns {String}
 */
function templateEngine(template, data) {

    const regex = /{{([^}]+)}}/g; // регулярка для получения содержимого внутри фигурных скобок
    const matchesIterator = template.matchAll(regex); // итератор, хранящий все совпадения по регулярке

    for (const match of matchesIterator) {
        var tmp = data;
        match[1].split(".").forEach(item => (tmp = tmp[item])); // с помощью цикла проваливаюсь по уровням объекта до нужной переменной
        template = template.replace(match[0], typeof tmp === "undefined" ? "" : tmp); // произвожу соответствующую замену в строке с проверкой 
    }
    return template;
}

