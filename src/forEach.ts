import { Collection, Iterator } from './types';
import { getKey, preIterate } from './utils';

function _forEach(collection: Collection, length: number, callback: Iterator, keys?: Array<any>): void  {
  for(let i = 0; i < length; i++) {
    let key = getKey(i, keys);
    if(callback(collection[key], key, collection) === false) {
      break;
    }
  }
}

function forEach(collection: Collection, callback: Iterator): Collection {
  const [iteratee, length, keys] = preIterate(collection);
  _forEach(iteratee, length, callback, keys);
  return collection;
}

export default forEach;