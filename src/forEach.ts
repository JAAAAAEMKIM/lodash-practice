import { Collection } from "./types";

function forEach(collection: Collection, callback: (value: any, key: any, original: Collection) => any): any {
  let res: any;

  if (!collection) {
    
  } else if (typeof collection === 'string') {
    const _string = new String(collection);
    const length = _string.length;
    for(let i = 0; i < length; i++) {
      res = callback(collection[i], i, _string);
      if(res === false) {
        break;
      }
    }
  } else if (Array.isArray(collection)) {
    const arr = collection as Array<any>;
    const length = arr.length;
    for(let i = 0; i < length; i++) {
      res = callback(collection[i], i, collection);
      if(res === false) {
        break;
      }
    }
  } else {
    const keys = Object.keys(collection);
    for(let i = 0; i < keys.length; i++) {
      res = callback(collection[keys[i]], keys[i], collection);
      if(res === false) {
        break;
      }
    }
  }
  return collection;
}

export default forEach;