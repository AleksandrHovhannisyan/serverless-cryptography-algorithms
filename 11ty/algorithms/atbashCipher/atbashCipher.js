const { normalizeString } = require('../../transforms');

/**
 * @param {string} plaintextAlphabet The plaintext alphabet that exhaustively lists all symbols that may or may not be used in a plaintext message.
 */
const generateAtbashCipher = (plaintextAlphabet) => {
  plaintextAlphabet = normalizeString(plaintextAlphabet);

  const cipherAlphabet = plaintextAlphabet
    .split('')
    .map((symbol) => symbol.toLowerCase())
    .reverse();

  /**
   * @param {string} plaintext The plaintext message to encipher.
   */
  const encipher = (plaintext) => {
    const symbols = normalizeString(plaintext).split('');
    return symbols
      .map((symbol) => {
        const index = plaintextAlphabet.indexOf(symbol);
        return cipherAlphabet[index];
      })
      .join('');
  };

  /**
   *
   * @param {string} ciphertext The ciphertext to decipher.
   */
  const decipher = (ciphertext) => {
    const symbols = normalizeString(ciphertext).split('');
    return symbols
      .map((symbol) => {
        const index = cipherAlphabet.indexOf(symbol);
        return plaintextAlphabet[index];
      })
      .join('');
  };

  return { cipherAlphabet, encipher, decipher };
};

module.exports = generateAtbashCipher;
