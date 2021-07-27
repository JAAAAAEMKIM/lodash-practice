
import { Collection, Iterator } from './types';
import { getKey } from './utils';

// TODO: Collection의 전처리를 mixin 형태로 만들어서 다른데서도 사용할 수 있도록 하면 어떨까?
function prepareMap(collection: Collection): [Collection, number, Array<string>?] {
  if(Array.isArray(collection)) {
    return [collection, collection.length];
  } else if (typeof collection === 'string') {
    return [new String(collection), collection.length];
  } else {
    const keys = Object.keys(collection)
    return [collection, keys.length, keys];
  }
}

function _map(collection: Collection, length: number, callback: Iterator, keys?: Array<any>): Array<any> {
  const res = [];
  for(let i = 0; i < length; i++) {
    let key = getKey(i, keys);
    res.push(callback(collection[key], key, collection));
  }

  return res;
}

function map(collection: Collection, callback: Iterator): Array<any> {
  const [iteratee, length, keys] = prepareMap(collection);
  return _map(iteratee, length, callback, keys);
}

export default map;
