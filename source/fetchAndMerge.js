'use strict';

/**
 * Функция, принимающая массив URL-адресов, загружающая данные с этих адресов (JSON), и возвращающая объединенный объект, содержащий все уникальные ключи загруженных данных
 * @param {Array<String>} urls - массив URL-адресов
 * 
 * @example
 * // returns {
 *          "age": [25, 22],
 *          "id": [1, 2],
 *          "name": ["Олег", "Мария"],
 *          "surname": ["Петров", "Иванова"],
 *          "status": ["Дуров, верни стену!"],
 *     }
 * fetchAndMergeData(['https://vk.example.com/vkid', 'https://mailru.example.com/mailid'])
 * 
 * @returns {Object}
 */
const fetchAndMergeData = async (urls) => {
    if (!Array.isArray(urls)) {
        throw new TypeError('Invalid argument: "urls" should be an array');
    }

    const data = {};

    for (const url of urls) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network error');
            }

            const newData = await response.json();

            Object.entries(newData).forEach(([key, value]) => {
                if (!data[key]) {
                    data[key] = new Set();
                }
                data[key].add(value);
            });
        } catch (e) {
            continue;
        }
    }

    const result = {};
    Object.entries(data).forEach(([key, value]) => {
        result[key] = Array.from(value);
    });

    return result;
}
