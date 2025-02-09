/* eslint-disable require-jsdoc */

'use strict';

QUnit.module("Тестируем функцию fetchAndMerge", function() {
    QUnit.test("Возвращает объект при полученных данных", async function(assert) {
        const urls = [
            'https://vk.example.com/vkid',
            'https://mailru.example.com/mailid',
        ];
        const expected = {
            "age": [25, 22],
            "id": [1, 2],
            "name": ["Олег", "Мария"],
            "surname": ["Петров", "Иванова"],
            "status": ["Дуров, верни стену!"],
        };
        
        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/vkid': { "id": 1, "name": "Олег", "surname": "Петров", "age": 25, "status": "Дуров, верни стену!" },
                'https://mailru.example.com/mailid': { "id": 2, "name": "Мария", "surname": "Иванова", "age": 22 },
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, expected, "Должно правильно объединять данные с разных URL");
    });

    QUnit.test("Работает правильно при ошибках fetch", async function(assert) {
        const urls = [
            'https://vk.example.com/mailru',
            'https://vk.example.com/byte'
        ];

        window.fetch = () => Promise.reject(new Error("Network error"));

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, {}, "Должно возвращать пустой объект при ошибке fetch");
    });

    // Авторские тесты)

    QUnit.test("Работает правильно при пустом массиве URL", async function(assert) {
        const urls = [];
        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, {}, "Должно возвращать пустой объект при пустом массиве URL");
    });

    QUnit.test("Работает правильно при дублирующихся значениях (повторяющийся URL)", async function(assert) {
        const urls = [
            'https://vk.example.com/vkid',
            'https://vk.example.com/vkid',
        ];
        const expected = {
            "age": [25],
            "id": [1],
            "name": ["Олег"],
            "surname": ["Петров"],
            "status": ["Дуров, верни стену!"],
        };
        
        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/vkid': { "id": 1, "name": "Олег", "surname": "Петров", "age": 25, "status": "Дуров, верни стену!" },
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, expected, "Должно добавлять уникальные значения по полю");
    });

    QUnit.test("Работает правильно при дублирующихся значениях (разные URL)", async function(assert) {
        const urls = [
            'https://vk.example.com/vkid',
            'https://vk.example.com/byte',
            'https://vk.example.com/mailru',
        ];
        const expected = {
            "age": [25, 26],
            "id": [1, 2, 3],
            "name": ["Олег", "Мария"],
            "surname": ["Петров", "Иванова", "Дуров"],
            "status": ["Дуров, верни стену!", "Дуров, верни стену?"],
        };
        
        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/vkid': { "id": 1, "name": "Олег", "surname": "Петров", "age": 25, "status": "Дуров, верни стену!" },
                'https://vk.example.com/byte': { "id": 2, "name": "Мария", "surname": "Иванова", "age": 26, "status": "Дуров, верни стену!" },
                'https://vk.example.com/mailru': { "id": 3, "name": "Олег", "surname": "Дуров", "age": 25, "status": "Дуров, верни стену?" },

            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, expected, "Должно добавлять уникальные значения по полю");
    });

    QUnit.test("Пропускает недоступные URL", async function(assert) {
        const urls = [
            'https://vk.example.com/vkid',
            'badurl',
        ];
        const expected = {
            "age": [25],
            "id": [1],
            "name": ["Олег"],
            "surname": ["Петров"],
            "status": ["Дуров, верни стену!"],
        };
        
        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/vkid': { "id": 1, "name": "Олег", "surname": "Петров", "age": 25, "status": "Дуров, верни стену!" },
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, expected, "Должно пропускать недоступные URL");
    });

    QUnit.test("Работает правильно при передаче не массива в качестве аргумента", async function(assert) {
        const urls = 'https://vk.example.com/vkid';
        
        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/vkid': { "id": 1, "name": "Олег", "surname": "Петров", "age": 25, "status": "Дуров, верни стену!" },
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        await assert.rejects(
            fetchAndMergeData(urls),
            new TypeError('Invalid argument: "urls" should be an array'),
            "Должно выбрасывать исключение при передаче не массива в качестве аргумента"
        )
    });
});

