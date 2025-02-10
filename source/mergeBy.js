/**
 * Объединяет два объекта, объединяя массивы с уникальными значениями.
 *
 * @param {Object} obj1 - Первый объект.
 * @param {Object} obj2 - Второй объект.
 * @returns {Object} - Объединенный объект.
 */
const mergeObjects = (obj1, obj2) => {
  const result = { ...obj1, ...obj2 };

  for (const prop in obj1) {
    if (Array.isArray(obj1[prop]) && Array.isArray(obj2[prop])) {
      result[prop] = [...new Set([...obj1[prop], ...obj2[prop]])];
    }
  }
  return result;
}

/**
 * Объединяет два массива объектов на основе общего ключа.
 * Если у объектов совпадают ключи, их свойства объединяются.
 * Массивы внутри объектов объединяются с уникальными значениями.
 *
 * @param {Object[]} arr1 - Первый массив объектов.
 * @param {Object[]} arr2 - Второй массив объектов.
 * @param {string} key - Ключ, используемый для объединения объектов.
 * @returns {Object[]} - Объединенный массив объектов.
 */
 const mergeBy = (arr1, arr2, key) => {
     if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
         throw new TypeError('Оба входных параметра должны быть массивами.')
     }
     if (typeof key !== 'string') {
         throw new TypeError('Ключ для объединения должен быть строкой.')
     }
  const mergedMap = new Map();

  for (const obj of arr1) {
    if (key in obj) {
      mergedMap.set(obj[key], obj);
    }
  }

  for (const obj of arr2) {
    if (key in obj) {
      if (mergedMap.has(obj[key])) {
        mergedMap.set(obj[key], mergeObjects(mergedMap.get(obj[key]), obj));
      } else {
        mergedMap.set(obj[key], obj);
      }
    }
  }

  return Array.from(mergedMap.values());
}
