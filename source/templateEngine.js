'use strict'

/**
 * Функция, заменяющая в строке шаблона все вхождения переменных, 
 * заключенных в фигурные скобки, на соответствующие значения из объекта данных.
 * 
 * @param {String} template - строка шаблона
 * @param {Object} data     - объект данных
 * 
 * @example
 * // returns "Город: Москва, Улица: 2-я Бауманская"
 * templateEngine("Город: {{address.city}}, Улица: {{address.street}}",
 *               { address: { city: "Москва", street: "2-я Бауманская" } })
 * 
 * @returns {String}
 */
const templateEngine = (template, data) => {
    const stack           = []
    const properties      = {}
    // bracketsCounter - число скобок в правильной последовательности
    let bracketsCounter   = 0
    let isSequenceOpen    = false
    let startOfSequence   = 0,
          endOfSequence   = 0;

    // Итерация по символам строки
    for (let i = 0; i < template.length; i++) {

        //Нашли '{'
        if (template[i] == '{') {
            // Если до этого была ситуация, при которой количество открывающих скобок было больше количества закрывающих
            if (stack.length != 0 && !isSequenceOpen) {
                bracketsCounter = 0
                stack.length = 0
            }
            // Запоминаем индекс первой открывающей скобки
            if (!isSequenceOpen) {
                isSequenceOpen = true
                startOfSequence = i
            }
            bracketsCounter++;
            stack.push('{')
        }
        // Нашли '}'
        else if (template[i] == '}') {
            // Если произошла ситуация, когда количество закрывающих скобок больше количества открывающих
            if (!stack.length) {
                bracketsCounter = 0
            }
            else {
                stack.pop()
                endOfSequence = i
            }
            isSequenceOpen = false
        }
        /* Условие "правильности" скобочной последовательности
        *  Если стэк пуст, то количество открывающих скобок совпадает с количеством закрывающих
        *  Если bracketsCounter не обнуляется во время проверок на "неправильность" скобочной последовательности
        */
        else if (bracketsCounter != 0 && !stack.length) {
            // Формируем словарь: {...{property}..} : property
            properties[template.substring(startOfSequence, endOfSequence + 1)] = template.substring(
                startOfSequence + bracketsCounter, endOfSequence - bracketsCounter + 1
            );
            bracketsCounter = 0
            isSequenceOpen = false
        }
    }
    
    // Нужно для ситуации, когда в конце строки стоит '}', так как в цикле последовательность не обработается
    if (bracketsCounter != 0 && !stack.length) {
        properties[template.substring(startOfSequence, endOfSequence + 1)] = template.substring(
            startOfSequence + bracketsCounter, endOfSequence - bracketsCounter + 1
        );
    }

    // Подмена правильной скобочной последовательности на значение из data
    for (const key in properties) {
        const path = properties[key].split('.')
        const value = path.reduce((obj, key) => obj?.[key], data) 

        template = template.replaceAll(key, value ?? "")
    }
    return template
}



