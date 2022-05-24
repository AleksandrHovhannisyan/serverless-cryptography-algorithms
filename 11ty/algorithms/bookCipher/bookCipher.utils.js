const { removePunctuation, collapseConsecutiveWhitespace } = require('../../utils');

/**
 * Returns the plaintext and cipher lookup alphabets used by the book cipher.
 * The cipher alphabet maps each symbol of the plaintext to an array of valid index candidates (for enciphering).
 * The plaintext alphabet maps each index to its corresponding plaintext symbol (for deciphering).
 * @param {string} bookText
 * @returns {{ cipher: Record<string, number[]>; plain: Record<number, string> }}
 */
const getBookCipherAlphabets = (bookText) => {
  const alphabets = removePunctuation(collapseConsecutiveWhitespace(bookText))
    .toLowerCase()
    .split(' ')
    .map((word) => word[0])
    .reduce(
      (alphabets, symbol, i) => {
        const index = i + 1;
        if (!alphabets.cipher[symbol]) {
          alphabets.cipher[symbol] = [];
        }
        if (!alphabets.plain[index]) {
          alphabets.plain[index] = symbol;
        }
        alphabets.cipher[symbol].push(index);
        return alphabets;
      },
      { cipher: {}, plain: {} }
    );
  return alphabets;
};

module.exports = {
  getBookCipherAlphabets,
};
