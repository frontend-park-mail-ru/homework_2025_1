'use strict';

/**
 * Создание результирующего json на основе массива с данными о пользователях.
 *
 * @param {Object} data - Массив с данными, хранящий json.
 */
const merge = (data) => {
    const result = {};
    data.forEach(element => {
        Object.entries(element).forEach(([key, value]) => {
            if (result[key] === undefined) {
                result[key] = [value];
            } else {
                result[key].push(value);
            }
        });
    })
    return result;
}

/**
 * Пробег по всем url адресам из массива urls и склеивание ответов в один единый объект.
 *
 * После пробега по всем адресам, склеиваем успешные функцией {@link merge}.
 * Перед вызовом функции {@link merge} массив с ответами фильтруется таким образом,
 * чтобы из него убрать undefined элементы, дабы в функции {@link merge} не было вызвано
 * исключение в использование Array.prototype.forEach().
 *
 * @param {Array<string>} urls - массив url адресов для выполнения запросов.
 * @returns {Object} - результирующий объект.
 */
const fetchAndMergeData = (urls) => {
    const promises = [];
    urls.forEach((url) => {
        promises.push(
            fetch(url)
                .then(response => response.json())
                .catch(error => {
                    console.log(error);
                    return {};
                })
        )
    });
    return Promise.all(promises).then(users => merge(users.filter(element => element !== undefined)));
}