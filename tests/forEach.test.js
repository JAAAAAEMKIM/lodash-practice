import { expect, it } from '@jest/globals';
// import {forEach} from 'lodash';
import { forEach } from '../index';

describe('forEach', () => {
  let res;
  beforeEach(() => {
    res = [];
  });
  describe('Array', () => {
    it('should iterate over an array', () => {
      forEach([1, 2, 3], (val) => res.push(val * 2));
      expect(res).toEqual([2, 4, 6]);
    });
    it('should pass "(value, key, original)" to callback', () => {
      const input = ['1', 2, 'a'];
      forEach(input, (value, key, original) =>
        res.push([value, key, original])
      );
      expect(res).toEqual([
        ['1', 0, input],
        [2, 1, input],
        ['a', 2, input],
      ]);
    });
    it('should do nothing when an empty array is passed', () => {
      forEach([], () => res.push(0));
      expect(res).toEqual([]);
    });
    it('should stop iteration when the callback returns false', () => {
      const input = [1, 2, 3];

      forEach(input, (val) => {
        res.push(val);
        return val < 2;
      });
      expect(res).toEqual([1, 2]);
    });

    describe('change input during iteration', () => {
      let input, iterCount;
      beforeEach(() => {
        input = [1, 2, 3, 4];
        iterCount = 0;
      });
      it('should reflect element value change', () => {
        forEach(input, (val, idx) => {
          input[(idx + 1) % 4] = val;
          res.push(val);
        });
        expect(res).toEqual([1, 1, 1, 1]);
      });
      it('should not change input length when element deleted during iteration', () => {
        forEach(input, () => {
          input.pop();
          iterCount += 1;
        });
        expect(iterCount).toEqual(4);
      });
      it('should not change input length when element pushed during iteration', () => {
        forEach(input, () => {
          input.push(1);
          iterCount += 1;
        });
        expect(iterCount).toEqual(4);
      });
    });
  });

  describe('Object', () => {
    let input, iterCount;
    beforeEach(() => {
      input = { a: 1, b: 2, c: 3 };
      iterCount = 0;
    });
    it('should iterate over an object', () => {
      forEach(input, (val) => res.push(val * 2));
      expect(res).toEqual([2, 4, 6]);
    });
    it('should pass "(value, key, original)" to callback', () => {
      forEach(input, (value, key, original) =>
        res.push([value, key, original])
      );
      expect(res).toEqual([
        [1, 'a', input],
        [2, 'b', input],
        [3, 'c', input],
      ]);
    });
    it('should do nothing when an empty object is passed', () => {
      forEach({}, () => res.push(0));
      expect(res).toEqual([]);
    });
    it('should stop iteration when the callback returns false', () => {
      forEach(input, (val) => {
        res.push(val);
        return val < 2;
      });
      expect(res).toEqual([1, 2]);
    });

    describe('change input during iteration', () => {
      it('should reflect element value change', () => {
        forEach(input, (val, key) => {
          input.b = 1;
          res.push(val);
        });
        expect(res).toEqual([1, 1, 3]);
      });
      it('should not change input length when element deleted during iteration', () => {
        forEach(input, () => {
          delete input.c;
          iterCount += 1;
        });
        expect(iterCount).toEqual(3);
      });
      it('should not change input length when element pushed during iteration', () => {
        forEach(input, () => {
          input.d = 4;
          iterCount += 1;
        });
        expect(iterCount).toEqual(3);
      });
    });
  });

  describe('String', () => {
    it('should iterate over a string', () => {
      forEach('123', (val) => res.push(val * 2));
      expect(res).toEqual([2, 4, 6]);
    });
    it('should pass "(value, key, original)" to callback', () => {
      const resultString = new String('abc');
      forEach('abc', (value, key, original) =>
        res.push([value, key, original])
      );
      expect(res).toEqual([
        ['a', 0, resultString],
        ['b', 1, resultString],
        ['c', 2, resultString],
      ]);
    });
    it('should do nothing when an empty string is passed', () => {
      forEach('', () => res.push(0));
      expect(res).toEqual([]);
    });

    it('should stop iteration when the callback returns false', () => {
      const input = '123';

      forEach(input, (val) => {
        res.push(val);
        return val < '2';
      });
      expect(res).toEqual(['1', '2']);
    });
  });

  it('should return its first argument', () => {
    const input = ['', undefined, null, NaN, , {}, [], Symbol()];
    forEach(input, (val) => {
      res = forEach(val, () => {});
      expect(res).toEqual(val);
    });
  });

  it('should iterate over an arguments object', () => {
    const input = [1, 2, 3];
    function func() {
      forEach(arguments, (val) => res.push(val));
    }
    func(...input);
    expect(res).toEqual(input);
  });

  it('should iterate over an function object', () => {
    const input = [1, 2, 3];
    function func() {}
    func.a = 1;
    func.b = 2;
    func.c = 3;
    forEach(func, (val) => {
      res.push(val);
    });
    expect(res).toEqual(input);
  });
});
