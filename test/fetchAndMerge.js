/* eslint-disable require-jsdoc */

'use strict';

QUnit.module("Тестируем функцию fetchAndMerge", function () {
    QUnit.test("Возвращает объект при полученных данных", async function (assert) {
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
                'https://vk.example.com/vkid': {
                    "id": 1,
                    "name": "Олег",
                    "surname": "Петров",
                    "age": 25,
                    "status": "Дуров, верни стену!"
                },
                'https://mailru.example.com/mailid': {"id": 2, "name": "Мария", "surname": "Иванова", "age": 22},
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, expected, "Должно правильно объединять данные с разных URL");
    });

    QUnit.test("Работает правильно при ошибках fetch", async function (assert) {
        const urls = [
            'https://vk.example.com/mailru',
            'https://vk.example.com/byte'
        ];

        window.fetch = () => Promise.reject(new Error("Network error"));

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, {}, "Должно возвращать пустой объект при ошибке fetch");
    });

    QUnit.test("Работает правильно при пустых ответах fetch", async function (assert) {
        const urls = [
            'https://vk.example.com/vkid',
            'https://mailru.example.com/mailid'
        ];

        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/vkid': {},
                'https://mailru.example.com/mailid': {},
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, {}, "Должно возвращать пустой объект");
    });

    QUnit.test("Работает правильно при комбинации resolve и reject", async function (assert) {
        const urls = [
            'https://vk.example.com/vkid',
            'https://mailru.example.com/mailid'
        ];
        const expected = {
            "age": [25],
            "id": [1],
            "name": ["Олег"],
            "surname": ["Петров"],
            "status": ["Дуров, верни стену!"]
        };

        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/vkid': {
                    "id": 1,
                    "name": "Олег",
                    "surname": "Петров",
                    "age": 25,
                    "status": "Дуров, верни стену!"
                },
                'https://mailru.example.com/mailid': {"id": 2, "name": "Мария", "surname": "Иванова", "age": 22},
            };

            if (url === 'https://vk.example.com/vkid') {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(data[url]),
                });
            } else {
                return Promise.reject(new Error("Network error"));
            }

        };

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, expected, "Должно возвращать только один ответ");
    });
});

