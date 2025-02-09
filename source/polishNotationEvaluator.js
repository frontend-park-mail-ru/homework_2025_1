'use strict';

/**
 * Функция, вычисляющая выражение в польской нотации (префиксной нотации)
 * @param {string} input - математические выражение в польской нотации
 * 
 * @example
 * // returns 7
 * polishNotationEvaluator("+ 3 4");
 * 
 * @returns {Number}
 * @throws {TypeError} - если input не является строкой
 * @throws {Error} - если входная строка содержит недопустимые символы или неверное количество операндов
 */
const polishNotationEvaluator = (input) => {
    if (typeof input !== 'string' && !(input instanceof String)) {
        throw new TypeError('Input must be a string.');
    }
    
    const stack = [];
    const symbols = input.split(' ').filter(Boolean).reverse();

    for (const symbol of symbols) {
        if (['+', '-', '*', '/'].includes(symbol)) {
            if (stack.length < 2) {
                throw new Error('Invalid input.');
            }
            const a = stack.pop();
            const b = stack.pop();

            switch (symbol) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    stack.push(a / b);
                    break;
            }
        }
        else {
            const number = parseFloat(symbol);
            if (isNaN(number)) {
                throw new Error(`Invalid symbol ${symbol} in input.`);
            }
            stack.push(number);
        }
    }
    if (stack.length > 1) {
        throw new Error('Invalid input.');
    }
    return stack.pop();
}
