function filterByKeys(obj, keys) {
  const NewObj = {};

  for(let i of Object.keys(obj)) {
    if (keys.includes(i)) {
      NewObj[i] = obj[i];
  };
  };
  return NewObj;

};

