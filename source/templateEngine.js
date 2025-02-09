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
    let bracketsValidation = (str) => {
        var chars = str.split(''),
            stack = [],
            open = '{',
            close = '}',
            start,
            end,
            afterClose = false,
            resWord,
            res = {};
    
        // Проходимся по строке
        for (var i = 0; i < chars.length; i++) {
            if (open === chars[i]) {
                if (stack.length !== 0 && afterClose === true) {
                    return false;
                } else if (afterClose === true) {
                    res[str.slice(start, end + 1)] = resWord;
                }
                // Нашли открывающую скобку
                stack.push(i);
                afterClose = false;
            } else if (close === chars[i]) {
                // Нашли закрывающую скобку
                start = stack.pop();
                end = i;
                if (start === undefined) {
                    return false;
                }
                
                if (afterClose === false) {
                    resWord = str.slice(start + 1, end);
                    afterClose = true;
                }
            }
        }
    
        if (stack.length !== 0 && afterClose === true) {
            return false;
        } else if (afterClose === true) {
            res[str.slice(start, end + 1)] = resWord;
        }
    
        return res;
    };

    var resObj = bracketsValidation(template);
    if (resObj === false)
        return "Ошибка в вводе шаблона!";
    
    console.log(resObj)
    for (var key in resObj) {
        var tmp = data;
        resObj[key].split(".").forEach(item => (tmp = tmp[item])); // с помощью цикла проваливаюсь по уровням объекта до нужной переменной
        template = template.replace(key, typeof tmp === "undefined" ? "" : tmp); // произвожу соответствующую замену в строке с проверкой 
    }
    return template;
}


