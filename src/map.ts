
import { Collection, Iterator } from './types';
import { getKey, preIterate } from './utils';

function _map(collection: Collection, length: number, callback: Iterator, keys?: Array<any>): Array<any> {
  const res = [];
  for(let i = 0; i < length; i++) {
    let key = getKey(i, keys);
    res.push(callback(collection[key], key, collection));
  }

  return res;
}

function map(collection: Collection, callback: Iterator): Array<any> {
  const [iteratee, length, keys] = preIterate(collection);
  return _map(iteratee, length, callback, keys);
}

export default map;
