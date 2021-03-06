function isObjectValid(obj) {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]] === undefined) {
      console.log("object is contains undefined");
      return false;
    }
  }
  return true;
}

function getLastIndex(arr) {
  return arr.length - 1;
}

function newId(products, lastIndex) {
  return products[getLastIndex(products)].id + 1;
}

export { isObjectValid, newId };
