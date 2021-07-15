import { Collection } from "./types";

function forEach(collection: Collection, callback: (value: any, key: any, original: Collection) => any): any {
  if (!collection) {
    
  } else if (typeof collection === 'string') {
    const _string = new String(collection);
    const length = _string.length;
    for(let i = 0; i < length; i++) {
      callback(collection[i], i, _string);
    }
  } else if (collection.hasOwnProperty('length')) {
    const arr = collection as Array<any>;
    const length = arr.length;
    for(let i = 0; i < length; i++) {
      callback(collection[i], i, collection);
    }
  } else {
    const keys = Object.keys(collection);
    for(let i = 0; i < keys.length; i++) {
      callback(collection[keys[i]], keys[i], collection);
    }
  }
  return collection;
}

export default forEach;