'use strict';

/**
 * Функция, которая осуществляет слияние двух объектов,
 * добавляя все данные из data в result.
 *
 * @param {Object} result - результирующий объект
 * @param {Object} data - объект, который добавляется в result
 */
function merge(result, data){
    for (const [key, value] of Object.entries(data)) {
        if (result[key] === undefined) {
            result[key] = [value];
        } else {
            result[key].push(value);
        }
    }
}

/**
 * Пробег по всем url адресам из массива urls и склеивание ответов в один единый объект.
 *
 * В случае успеха, вызываем функцию {@link merge}, в случае неудачи - игнорируем url.
 *
 * @param {Array<string>} urls - массив url адресов для выполнения запросов.
 * @returns {Promise<{}>} - результирующий массив.
 */
function fetchAndMergeData(urls) {
    let result = {};
    let promises = [];
    for (let url of urls) {
        promises.push(
            fetch(url)
            .then((response) => {
                response.json().then((data) => {
                    merge(result, data);
                });
            }, (_) => {})
        );
    }
    return Promise.all(promises).then((value) => { return result; });
}
