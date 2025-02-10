"use strict"

// Выполнил: Ларин И. А. WEB-22

/**
 * Функция принимает строку, представляющую выражение в польской нотации (префиксной нотации), и возвращает результат вычисления этого выражения.
 * Поддерживает базовые арифметические операторы: +, -, *, /. Операнды могут быть целыми числами.
 * @param {string} input  Принимает строку, представляющую выражение в польской нотации (префиксной нотации).
 * 
 * @example
 * // returns 3
 * polishNotationEvaluator("+ 1 2");
 * 
 * @returns {(number|NaN)}  Возвращает результат вычисления или NaN, если выражение некорректно.
 */
function polishNotationEvaluator(input) {
    if (!input.trim()) return NaN;  // Если строка пустая или из пробелов
    // Будем идти с конца строки и если встретился оператор, то применяем его к первым двум числам
    // Для хранения будем использовать стек
    input = input.split(' ');
    const stack = [];

    while (input.length > 0) {
        const current = input.pop();
        if (!isNaN(Number(current))) {  // Если число
            stack.push(Number(current));
        } else if (['+', '-', '*', '/'].includes(current)) {  // Если оператор
            if (stack.length < 2) return NaN;  // Проверка на строки вида "+ + 1 2"  
            const left = stack.pop();  // Левый операнд
            const right = stack.pop();  // Правый операнд
            switch (current) {
                case '+':
                    stack.push(left + right);
                    break;
                case '-':
                    stack.push(left - right);
                    break;
                case '*':
                    stack.push(left * right);
                    break;
                case '/':
                    if (right === 0) return NaN;  // Проверка на деление на ноль
                    stack.push(left / right);
                    break;
            }
        } else {
            return NaN;  // Некорректный ввод
        }
    }
    if (stack.length === 1) { // Проверка на строки вида "+ 1 2 3"
        return stack.pop();
    } else {
        return NaN; // Некорректный ввод
    }
}