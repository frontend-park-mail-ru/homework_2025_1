`use strict`;

/**
 * Функция, считающая количество адресов эл. почты, 
 * количество уникальных почт и самую часто встречающаюся почту
 * @param {String} str - строка с почтами
 * 
 * 
 * @returns {Object}
 * @property {number} emailCount - количество адресов в строке
 * @property {string[]} uniqueEmails - уникальные адреса
 * @property  {string} mostFrequentEmail - самый частый адрес
 */
function emailAnalyzer(str) {
    const email_map = new Map();

    var emailCount = 0;

    const emailRegex = /\b(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

    const emails = str.match(emailRegex);

    // заполняем хеш-мапу адресами и количеством повторений
    if (emails) {
        for (const email of emails) {
            // так как нашли адрес, увеличиваем счетчик
            emailCount++;

            // если адреса еще не было, ставим значение ключа-адреса в единицу
            if (!email_map.has(email)) {
                email_map.set(email, 1);
            }
            else {
                // если адрес уже был, увеличиваем значение на единичку
                email_map.set(email, email_map.get(email) + 1);
            }
        }
    }

    let uniqueEmails = [];
    let mostFrequentEmail = "";
    let mostFrequentEmail_repeats = 0;

    // прогоняемся по мапе, находим самую частую почту и
    // уникальные адреса
    for (const key of email_map.keys()) {
        let key_value = email_map.get(key);

        // если адрес уникальный (значение ключа - единица), то
        // проверяем, что его еще нет в массиве уникальных адресов
        if (key_value == 1) {
            if (!uniqueEmails.includes(key.toLowerCase())) {
                uniqueEmails.push(key.toLowerCase());
            }
        }

        // если переменная самого частого адреса пустая,
        // задаем ей первый встретившийся адрес
        if (mostFrequentEmail == "") {
            mostFrequentEmail = key.toLowerCase();
            mostFrequentEmail_repeats = key_value;
        }

        // самое главное условие: если какой-либо адрес
        // встречается большее кол-во раз, чем текущий в переменной,
        // то меняем
        if (key_value > mostFrequentEmail_repeats) {
            mostFrequentEmail = key.toLowerCase();
            mostFrequentEmail_repeats = key_value;
        }
    }

    return {
        emailCount,
        uniqueEmails,
        mostFrequentEmail,
    };
};