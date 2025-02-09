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
        if (source.hasOwnProperty(prop)) {
          if (target.hasOwnProperty(prop)) {
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
      if (!obj1.hasOwnProperty(key)) { 
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
      if (!obj2.hasOwnProperty(key)) { 
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