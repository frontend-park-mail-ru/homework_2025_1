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
        throw new TypeError('bad argument'); 
    } 

    const data = {}; 

    const fetchPromises = urls.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            return data;
        }
        return response.json();
    })

    const results = await Promise.allSettled(fetchPromises);

    results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value) {
            const newData = result.value;
            Object.entries(newData).forEach(([key, value]) => {
                if (!data[key]) {
                    data[key] = new Set();
                }
                data[key].add(value);
            });
        }
    });

    const result = {};
    Object.entries(data).forEach(([key, value]) => {
        result[key] = Array.from(value);
    });

    return result; 
}
