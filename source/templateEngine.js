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
const templateEngine = (template, data) => {
    if (typeof template !== "string" || typeof data !== "object")
        return "Неверный тип вводимых данных!"
    /**
     * Функция для получения объекта, где ключ - выражение для замены из исходного шаблона, а значение - то же выражение без фигурных скобок, и валидации скобок внутри строки.
     * @param {String} str - строка с фигурными скобками 
     * @example
     * // returns {"{{age}}": "age"}
     * "Мне {{age}} года"
     * @returns {Object}
     */
    const bracketsValidation = (str) => {
        const open = '{',
            close = '}',
            chars = str.split(''),
            res = {};
        let stack = [],
            start,
            end,
            afterClose = false,
            resWord;
            
    
        // Проходимся по строке
        chars.forEach(function(item, i) {
            if (open === item) {
                if (stack.length === 0 && afterClose) {
                    res[str.slice(start, end + 1)] = resWord;
                } else if (stack.length !== 0 && afterClose) {
                    stack = []
                }
                // Нашли открывающую скобку
                stack.push(i);
                afterClose = false;
            } else if (close === item) {
                // Нашли закрывающую скобку
                start = stack.pop();
                end = i;
                if (!afterClose) {
                    resWord = str.slice(start + 1, end);
                    afterClose = true;
                }
            }
        });
    
        if (stack.length === 0 && afterClose) {
            res[str.slice(start, end + 1)] = resWord;
        }
    
        return res;
    };

    let resObj = bracketsValidation(template);
    for (let key in resObj) {
        let tmp = data;
        resObj[key].split(".").forEach(item => (tmp = tmp[item])); // с помощью цикла проваливаюсь по уровням объекта до нужной переменной
        template = template.replaceAll(key, typeof tmp === "undefined" ? "" : tmp); // произвожу соответствующую замену в строке с проверкой 
    }
    return template;
};

