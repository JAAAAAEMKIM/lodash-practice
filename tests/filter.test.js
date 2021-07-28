import { expect, it } from '@jest/globals';
import { filter } from '../index';
// import { filter } from 'lodash';

const largerThan2 = item => item > 2;

describe('filter', () => {
  let res, input;
  beforeEach(() => {
    res = [];
  });
  describe('Array', () => {
    it('should pass "(value, key, original)" to callback', () => {
      input = ['1', 2, 'a'];
      filter(input, (value, key, original) =>
        res.push([value, key, original])
      );
      expect(res).toEqual([
        ['1', 0, input],
        [2, 1, input],
        ['a', 2, input],
      ]);
    });
    
    it('should filter items by predicate', () => {
      input = [1, 2, 3];
      res = filter(input, largerThan2);
      expect(res).toEqual([3]);
    });
  });
  describe('String', () => {
    beforeEach(() => {
      input = '24cd';
    });
    it('should pass "(value, key, original)" to callback', () => {
      filter(input, (value, key, original) =>
        res.push([value, key, original])
      );
      const resultString = new String(input);
      expect(res).toEqual([
        ['2', 0, resultString],
        ['4', 1, resultString],
        ['c', 2, resultString],
        ['d', 3, resultString],
      ]);
    });
    
    it('should filter each item to the callback', () => {
      res = filter(input, largerThan2);
      expect(res).toEqual(["4"]);
    });
  });
  describe('Object', () => {
    beforeEach(() => {
      input = {a: 1, b: 2, c: 3, d: 4};
    });
    it('should pass "(value, key, original)" to callback', () => {
      filter(input, (value, key, original) =>
        res.push([value, key, original])
      );
      expect(res).toEqual([
        [1, 'a', input],
        [2, 'b', input],
        [3, 'c', input],
        [4, 'd', input],
      ]);
    });
    
    it('should filter each item to the callback', () => {
      res = filter(input, largerThan2);
      expect(res).toEqual([3, 4]);
    });
  });
});