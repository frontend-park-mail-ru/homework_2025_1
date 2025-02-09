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
    const data = {};

    const fetchUrl = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network error');
            }

            return await response.json();
        } catch (e) {
            return {};
        }
    }

    const mergeData = (data, newData) => {
        Object.entries(newData).forEach(([key, value]) => {
            if (!data[key]) {
                data[key] = [];
            }
            if (!data[key].includes(value)) {
                data[key].push(value);
            }
        });
    }

    for (const url of urls) {
        const newData = await fetchUrl(url);
        mergeData(data, newData);
    }

    return data;
}
