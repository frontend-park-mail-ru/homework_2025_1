'use strict'

/**
 * Функция, использующая паттерн посетитель, рекурсивно применяет функцию, данную как второй аргумент, ко всем элементам объекта
 * @param {object} obj - объект, который нужно рекурсивно пройти и изменить
 * @param {function} transformFn - функция, которая применяется ко всем значениям в объекте
 * 
 * @example
 * //returns { a: 2, b: { c: 3, d: 4 }, e: 5 }
 * transform({ a: 1, b: { c: 2, d: 3 }, e: 4 }, (val) => {return val + 1;})
 * 
 * @returns {object}
 */

const transform = (obj, transformFn) => {
  if (obj === null || (typeof transformFn !== 'function')) {
    return obj;
  }

  if (typeof obj !== 'object') {
    return transformFn(obj);
  }

  if (obj instanceof Boolean) {
    return transformFn(obj.valueOf());
  }

  const bufferStack = [obj];
  while (bufferStack && bufferStack.length > 0) {
    const currentObj = bufferStack.pop();
    Object.keys(currentObj).forEach(currentObjKey => {
      if (currentObj[currentObjKey] instanceof Boolean) {
        currentObj[currentObjKey] =  transformFn(currentObj[currentObjKey].valueOf());
      } else if (typeof currentObj[currentObjKey] === 'object' && currentObj[currentObjKey] !== null) {
        bufferStack.push(currentObj[currentObjKey]);
      } else {
        currentObj[currentObjKey] = currentObj[currentObjKey] !== null ? transformFn(currentObj[currentObjKey]) : null;
      }
    });
  }
  return obj;
}
