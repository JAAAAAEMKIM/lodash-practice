import { Collection, Iterator } from './types';
import { getKey, preIterate } from './utils';

function _filter(collection: Collection, length: number, callback: Iterator, keys?: Array<any>): Array<any>  {
  const res = [];
  for(let i = 0; i < length; i++) {
    let key = getKey(i, keys);
    if(callback(collection[key], key, collection)) {
      res.push(collection[key]);
    }
  }
  return res;
}

function filter(collection: Collection, callback: Iterator): Collection {
  const [iteratee, length, keys] = preIterate(collection);
  return _filter(iteratee, length, callback, keys);
}

export default filter;