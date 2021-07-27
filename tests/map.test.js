import { expect, it } from '@jest/globals';
import { map } from '../index';
// import { map } from 'lodash';

const mul = item => item * 2;

describe('map', () => {
  let res, input;
  beforeEach(() => {
    res = [];
  });
  describe('Array', () => {
    it('should pass "(value, key, original)" to callback', () => {
      input = ['1', 2, 'a'];
      map(input, (value, key, original) =>
        res.push([value, key, original])
      );
      expect(res).toEqual([
        ['1', 0, input],
        [2, 1, input],
        ['a', 2, input],
      ]);
    });
    
    it('should map each item to the callback', () => {
      input = [1, 2, 3];
      res = map(input, mul);
      expect(res).toEqual([2, 4, 6]);
    });
  });
  describe('String', () => {
    beforeEach(() => {
      input = '12cd';
    });
    it('should pass "(value, key, original)" to callback', () => {
      map(input, (value, key, original) =>
        res.push([value, key, original])
      );
      const resultString = new String(input);
      expect(res).toEqual([
        ['1', 0, resultString],
        ['2', 1, resultString],
        ['c', 2, resultString],
        ['d', 3, resultString],
      ]);
    });
    
    it('should map each item to the callback', () => {
      res = map(input, mul);
      expect(res).toEqual([2, 4, NaN, NaN]);
    });
  });
  describe('Object', () => {
    beforeEach(() => {
      input = {a: 1, b: 2, c: 3, d: 4};
    });
    it('should pass "(value, key, original)" to callback', () => {
      map(input, (value, key, original) =>
        res.push([value, key, original])
      );
      expect(res).toEqual([
        [1, 'a', input],
        [2, 'b', input],
        [3, 'c', input],
        [4, 'd', input],
      ]);
    });
    
    it('should map each item to the callback', () => {
      res = map(input, mul);
      expect(res).toEqual([2, 4, 6, 8]);
    });
  });
});