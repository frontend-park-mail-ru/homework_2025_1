/**
 * @param {Array<object>} arr1 Первый массив объектов.
 * @param {Array<object>} arr2 Второй массив объектов.
 * @param {string} key Ключ, по которому нужно объединить объекты.
 * @returns {Array<object>} Новый массив объединенных объектов.
 */

function mergeBy(arr1, arr2, key) {
    const merged = {};
  
    const mergeObjects = (target, source) => {
      for (const prop in source) {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
          if (Object.prototype.hasOwnProperty.call(target, prop)) {
            if (Array.isArray(target[prop]) && Array.isArray(source[prop])) {
              target[prop] = [...new Set([...target[prop], ...source[prop]])];
            }
          } else {
            target[prop] = source[prop];
          }
        }
      }
    };
  
    for (const obj1 of arr1) {
      if (!Object.prototype.hasOwnProperty.call(obj1, key)) { 
        continue; 
      }
      const keyValue = obj1[key];
      if (!merged[keyValue]) {
        merged[keyValue] = { ...obj1 };
      } else {
        mergeObjects(merged[keyValue], obj1);
      }
    }
    for (const obj2 of arr2) {
      if (!Object.prototype.hasOwnProperty.call(obj2, key)) { 
        continue; 
      }
      const keyValue = obj2[key];
      if (!merged[keyValue]) {
        merged[keyValue] = { ...obj2 };
      } else {
        mergeObjects(merged[keyValue], obj2);
      }
    }
  
    return Object.values(merged);
  }