import { expect, it } from '@jest/globals';
import { reduce } from '../index';
// import { reduce } from 'lodash';

const add = (acc, item) => acc + item;

describe('reduce', () => {
  let res, input;
  beforeEach(() => {
    res = [];
  });
  describe('Array', () => {
    it('should pass "(acc, value, key, original)" to callback', () => {
      input = ['1', 2, 'a'];
      reduce(input, (acc, value, key, original) => {
        res.push([acc, value, key, original])
      });
      expect(res).toEqual([
        ['1', 2, 1, input],
        [undefined, 'a', 2, input],
      ]);
    });
    
    it('should reduce each item to the callback', () => {
      input = [1, 2, 3];
      res = reduce(input, add);
      expect(res).toEqual(6);
    });
  });
  describe('String', () => {
    beforeEach(() => {
      input = '12cd';
    });
    it('should pass "(acc, value, key, original)" to callback', () => {
      reduce(input, (acc, value, key, original) =>
        res.push([acc, value, key, original])
      );
      const resultString = new String(input);
      expect(res).toEqual([
        ['1', '2', 1, resultString],
        [1, 'c', 2, resultString],
        [2, 'd', 3, resultString],
      ]);
    });
    
    it('should reduce each item to the callback', () => {
      res = reduce(input, add);
      expect(res).toEqual('12cd');
    });
  });
  describe('Object', () => {
    beforeEach(() => {
      input = {a: 3, b: 2, c: 1, d: 4};
    });
    it('should pass "(acc, value, key, original)" to callback', () => {
      reduce(input, (acc, value, key, original) =>
        res.push([acc, value, key, original])
      );
      expect(res).toEqual([
        [3, 2, 'b', input],
        [1, 1, 'c', input],
        [2, 4, 'd', input],
      ]);
    });
    
    it('should reduce each item to the callback', () => {
      res = reduce(input, add);
      expect(res).toEqual(10);
    });
  });

  describe('with initial value', () => {
    it('should reduce each item to the callback', () => {
      input = [1, 2, 3];
      res = reduce(input, add, 100);
      expect(res).toEqual(106);
    });
    it('should reduce each item to the callback', () => {
      input = '12cd';
      res = reduce(input, add, 'abcd');
      expect(res).toEqual('abcd12cd');
    });
    it('should reduce each item to the callback', () => {
      input = {a: 3, b: 2, c: 1, d: 4};
      res = reduce(input, (acc, val) => ({
        ...acc,
        [val]: val
      }), { 0: 0, e: 1 });
      expect(res).toEqual({ 0: 0, e: 1, 1: 1, 2: 2, 3: 3, 4: 4 });
    });
  })
});

//TODO: with init value