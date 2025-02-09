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
 */
const polishNotationEvaluator = (input) => {
    const stack = [];
    const symbols = input.split(' ').reverse();

    for (const symbol of symbols) {
        if (['+', '-', '*', '/'].includes(symbol)) {
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
        else
            stack.push(parseInt(symbol));
    }
    return stack.pop();
}
