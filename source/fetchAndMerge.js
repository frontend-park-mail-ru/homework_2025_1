'use strict';
/** 
 * Функция, принимающая массив URL-адресов, загружающая данные с этих адресов (JSON), и возвращающая объединенный объект, содержащий все уникальные ключи загруженных данных.  
 * 
 * @param {Array<String>} urls - массив URL-адресов  
 * 
 * @throws {TypeError} - если аргумент не является массивом  
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
 * @returns {Object} - объединенный объект с уникальными ключами и значениями  
 */
const fetchAndMergeData = async (urls) => { 
    if (!Array.isArray(urls)) { 
        throw new TypeError('invalid function argument type, array expected'); 
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

