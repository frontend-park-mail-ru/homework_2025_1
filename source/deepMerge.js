/**
 * Объединяет два объекта в один.
 * Если оба объекта содержат одинаковые ключи, и значения по этим ключам являются объектами,
 * то они должны быть объединены рекурсивно. Если значения не являются объектами,
 * то значение из второго объекта должно перезаписывать значение из первого.
 * @param {Object} obj1 - первый
 * @param {Object} obj2 - второй
 * @returns {Object} - объединенный объект
 */
const deepMerge = (obj1, obj2) => {
    const result = {...obj1 };
  
    Object.keys(obj2).forEach(key => {
      if (typeof obj2[key] === 'object' && obj2[key]!== null) {
        if (typeof obj1[key] === 'object' && obj1[key]!== null) {
          result[key] = deepMerge(obj1[key], obj2[key]);
        } else {
          result[key] = obj2[key];
        }
      } else {
        result[key] = obj2[key];
      }
    });
  
    return result;
  };
