const { normalizeString } = require('../../transforms');
const { getBookCipherAlphabets } = require('./bookCipher.utils');

/**
 * @param {string} bookText
 */
const generateBookCipher = (bookText) => {
  const alphabets = getBookCipherAlphabets(bookText);

  /**
   * Enciphers the given plaintext using the book cipher.
   * @param {string} plaintext
   */
  const encipher = (plaintext) => {
    return normalizeString(plaintext)
      .split('')
      .map((symbol) => {
        const candidateSymbols = alphabets.cipher[symbol];
        // if the sample text is not sufficiently large, there may not be a word that starts with that letter
        if (!candidateSymbols) return symbol;
        const index = Math.floor(Math.random() * candidateSymbols.length);
        return candidateSymbols[index];
      })
      .join(' ')
      .toUpperCase();
  };

  /**
   * Deciphers the given ciphertext using the book cipher.
   * @param {string} ciphertext
   */
  const decipher = (ciphertext) => {
    return ciphertext
      .toLowerCase()
      .split(' ')
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
