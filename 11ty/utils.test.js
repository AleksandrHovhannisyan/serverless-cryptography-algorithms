const { removePunctuation, rotate, loopString, collapseConsecutiveWhitespace, chunk, getIndexMap } = require('./utils');

describe('utils', () => {
  describe('removePunctuation', () => {
    it('removes common punctuation from text', () => {
      const result = removePunctuation(
        `Hey, how's it going?! Testing—I'm testing (testing...). You owe me $5; abc@domain.com.`
      );
      expect(result).toStrictEqual(`Hey hows it going Testing Im testing testing You owe me 5 abcdomaincom`);
    });
  });

  describe('collapseConsecutiveWhitespace', () => {
    it('removes newlines, tabs, and multiple spaces', () => {
      const text = `Hello
      
      
      world       this    is    some
      
          abnormal text`;
      expect(collapseConsecutiveWhitespace(text)).toStrictEqual(`Hello world this is some abnormal text`);
    });
  });

  describe('rotate', () => {
    it('respects positive rotations', () => {
      const result = rotate(['a', 'b', 'c', 'd', 'e'], 2);
      // 0 1 2 3 4
      // a b c d e
      // e a b c d  1
      // d e a b c  2
      expect(result).toStrictEqual(['d', 'e', 'a', 'b', 'c']);
    });
    it('respects negative rotations', () => {
      const result = rotate(['a', 'b', 'c', 'd', 'e'], -2);
      // 0 1 2 3 4
      // a b c d e
      // b c d e a  -1
      // c d e a b  -2
      expect(result).toStrictEqual(['c', 'd', 'e', 'a', 'b']);
    });
    it('returns the same result for multiple rotations of (-s - n), given an array of length n', () => {
      expect(rotate(['a', 'b', 'c', 'd', 'e'], -3)).toStrictEqual(['d', 'e', 'a', 'b', 'c']);
      expect(rotate(['a', 'b', 'c', 'd', 'e'], -8)).toStrictEqual(['d', 'e', 'a', 'b', 'c']);
      expect(rotate(['a', 'b', 'c', 'd', 'e'], -13)).toStrictEqual(['d', 'e', 'a', 'b', 'c']);
    });
  });

  describe('loopString', () => {
    it('returns the original string if the target length is less than the string length', () => {
      expect(loopString('hello', 2)).toStrictEqual('hello');
    });
    it('returns the original string if the target length matches its length', () => {
      expect(loopString('hello', 5)).toStrictEqual('hello');
    });
    it('wraps around to the start when it runs out of characters', () => {
      expect(loopString('hello', 12)).toStrictEqual('hellohellohe');
    });
  });

  describe('getIndexMap', () => {
    it('generates an index map', () => {
      const indexMap = getIndexMap(['a', 'd', 'f', 'g', 'v', 'x']);
      expect(indexMap.get('a')).toStrictEqual(0);
      expect(indexMap.get('d')).toStrictEqual(1);
      expect(indexMap.get('f')).toStrictEqual(2);
      expect(indexMap.get('g')).toStrictEqual(3);
      expect(indexMap.get('v')).toStrictEqual(4);
      expect(indexMap.get('x')).toStrictEqual(5);
    });
  });

  describe('chunk', () => {
    it('chunks an array evenly', () => {
      expect(chunk(['a', 'b', 'c', 'd'], 2)).toStrictEqual([
        ['a', 'b'],
        ['c', 'd'],
      ]);
    });
    it('handles uneven chunks', () => {
      expect(chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 2)).toStrictEqual([['a', 'b'], ['c', 'd'], ['e', 'f'], ['g']]);
    });
  });
});
