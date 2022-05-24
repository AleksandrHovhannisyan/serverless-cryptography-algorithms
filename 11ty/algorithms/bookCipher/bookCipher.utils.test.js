const { getBookCipherAlphabets } = require('./bookCipher.utils');

describe('book cipher utils', () => {
  it(`returns the correct plaintext and cipher alphabets`, () => {
    const alphabets = getBookCipherAlphabets(`Hello, world! This is some text. It contains words.`);
    expect(alphabets.cipher).toStrictEqual({ h: [1], w: [2, 9], t: [3, 6], i: [4, 7], s: [5], c: [8] });
    expect(alphabets.plain).toStrictEqual({ 1: 'h', 2: 'w', 3: 't', 4: 'i', 5: 's', 6: 't', 7: 'i', 8: 'c', 9: 'w' });
  });
  it(`handles more complex book text`, () => {
    const alphabets =
      getBookCipherAlphabets(`According to all known laws of aviation, there is no way a bee should be able to fly.
    Its wings are too small to get its fat little body off the ground.
    The bee, of course, flies anyway because bees don't care what humans think is impossible.`);
    expect(alphabets.cipher).toStrictEqual({
      a: [1, 3, 7, 12, 16, 21, 38],
      t: [2, 8, 17, 22, 24, 31, 33, 45],
      k: [4],
      l: [5, 28],
      o: [6, 30, 35],
      i: [9, 19, 26, 46, 47],
      n: [10],
      w: [11, 20, 43],
      b: [13, 15, 29, 34, 39, 40],
      s: [14, 23],
      f: [18, 27, 37],
      g: [25, 32],
      c: [36, 42],
      d: [41],
      h: [44],
    });
    expect(alphabets.plain).toStrictEqual({
      1: 'a',
      2: 't',
      3: 'a',
      4: 'k',
      5: 'l',
      6: 'o',
      7: 'a',
      8: 't',
      9: 'i',
      10: 'n',
      11: 'w',
      12: 'a',
      13: 'b',
      14: 's',
      15: 'b',
      16: 'a',
      17: 't',
      18: 'f',
      19: 'i',
      20: 'w',
      21: 'a',
      22: 't',
      23: 's',
      24: 't',
      25: 'g',
      26: 'i',
      27: 'f',
      28: 'l',
      29: 'b',
      30: 'o',
      31: 't',
      32: 'g',
      33: 't',
      34: 'b',
      35: 'o',
      36: 'c',
      37: 'f',
      38: 'a',
      39: 'b',
      40: 'b',
      41: 'd',
      42: 'c',
      43: 'w',
      44: 'h',
      45: 't',
      46: 'i',
      47: 'i',
    });
  });
});
