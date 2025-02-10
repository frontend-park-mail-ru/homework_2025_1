/**
 * Объединяет два объекта в один.
 * Если оба объекта содержат одинаковые ключи, и значения по этим ключам являются объектами,
 * то они должны быть объединены рекурсивно. Если значения не являются объектами,
 * то значение из второго объекта должно перезаписывать значение из первого.
 * @param {Object} obj1 - первый объект
 * @param {Object} obj2 - второй объект
 * 
 * @example
 * // returns { a: 1, b: 2, c: 3 }
 * deepMerge({ a: 1 }, { b: 2, c: 3 });
 * 
 * @returns {Object} - объединенный объект
 */
const deepMerge = (obj1, obj2) => {
  if (typeof obj1!== 'object' || obj1 === null) {
    throw new Error('Первый параметр должен быть объектом');
  }

  if (typeof obj2!== 'object' || obj2 === null) {
    return {...obj1 };
  }

  const result = {...obj1 };

  for (const key in obj2) {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      const value1 = result[key];
      const value2 = obj2[key];
      
      if (Array.isArray(value2)) {
        result[key] = value2;
      } else if (typeof value1 === 'object' && value1!== null && typeof value2 === 'object' && value2!== null) {
        result[key] = deepMerge(value1, value2);
      } else {
        result[key] = value2; 
      }
    }
  }

  return result;
};
