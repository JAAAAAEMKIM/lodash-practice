import { Collection, Iterator } from './types';
import { getKey, preIterate } from './utils';

function _reduce(collection: Collection, start: number, end: number, callback, acc: any, keys?: Array<any>): void  {
  for(let i = start; i < end; i++) {
    let key = getKey(i, keys);
    acc = callback(acc, collection[key], key, collection)
  }
  return acc;
}

function reduce(collection: Collection, callback: Iterator, initial) {
  const [iteratee, length, keys] = preIterate(collection);
  return initial 
    ? _reduce(iteratee, 0, length, callback, initial , keys)
    : _reduce(iteratee, 1, length, callback, collection[getKey(0, keys)], keys);
}

export default reduce;