const { removePunctuation, removeWhitespace } = require('../utils');

/**
 * @param {string} plaintext
 * @param {string} text
 */
const generateBookCipher = (text, separator = ' ') => {
  const alphabets = removePunctuation(text.toLowerCase())
    .split(separator)
    .map((word) => word[0])
    .reduce(
      (alphabets, symbol, i) => {
        const value = i + 1;
        if (!alphabets.cipher[symbol]) {
          alphabets.cipher[symbol] = [];
        }
        if (!alphabets.plain[value]) {
          alphabets.plain[value] = [];
        }
        alphabets.cipher[symbol].push(value);
        alphabets.plain[value].push(symbol);
        return alphabets;
      },
      { cipher: {}, plain: {} }
    );

  /**
   * Enciphers the given plaintext using the book cipher.
   * @param {string} plaintext
   */
  const encipher = (plaintext) => {
    return removeWhitespace(removePunctuation(plaintext.toLowerCase()))
      .split('')
      .map((symbol) => {
        const candidateSymbols = alphabets.cipher[symbol];
        // if the sample text is not sufficiently large, there may not be a word that starts with that letter
        if (!candidateSymbols) return symbol;
        const index = Math.floor(Math.random() * candidateSymbols.length);
        return candidateSymbols[index];
      })
      .join(separator);
  };

  /**
   * Deciphers the given ciphertext using the book cipher.
   * @param {string} ciphertext
   */
  const decipher = (ciphertext) => {
    return ciphertext
      .toLowerCase()
      .split(separator)
      .map((symbol) => alphabets.plain[symbol] ?? symbol)
      .join('');
  };

  return {
    alphabets,
    encipher,
    decipher,
  };
};

module.exports = generateBookCipher;
