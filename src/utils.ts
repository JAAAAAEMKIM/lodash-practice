import { Collection } from './types';

export const getKey = (index: number, keys?: Array<string>): string | number => {
  return keys ? keys[index] : index; 
};

// TODO: Collection의 전처리를 mixin 형태로 만들어서 다른데서도 사용할 수 있도록 하면 어떨까?
export const preIterate = (collection: Collection): [Collection, number, Array<string>?] => {
  if (!collection) {
    return [collection, 0];
  } else if(Array.isArray(collection)) {
    return [collection, collection.length];
  } else if (typeof collection === 'string') {
    return [new String(collection), collection.length];
  } else {
    const keys = Object.keys(collection)
    return [collection, keys.length, keys];
  }
}