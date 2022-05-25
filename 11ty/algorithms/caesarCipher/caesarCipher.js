const { normalizeString } = require('../../transforms');
const { rotate } = require('../../utils');

/**
 * @param {number} shift The rightward shift to apply to the keyed alphabet.
 * @param {string} plaintextAlphabet The plaintext alphabet that exhaustively lists all symbols that may or may not be used in a plaintext message.
 * @param {string} key A key with which to seed the cipher alphabet, introducing noise.
 */
const generateCaesarCipher = (shift, plaintextAlphabet, key = '') => {
  key = normalizeString(key);
  plaintextAlphabet = normalizeString(plaintextAlphabet);

  // Example: HELLO => HELO
  const uniqueKeySymbols = new Set(key.split(''));

  // Example: abcdfgijkmnpqrstuvwxyz
  const unusedAlphabetSymbols = plaintextAlphabet
    .split('')
    .filter((symbol) => !uniqueKeySymbols.has(symbol))
    // Lowercase the alphabet symbols in case the user uppercased them
    .map((symbol) => symbol.toLowerCase());

  // Example: If shift = 13 and key = HELLO, we get mnpqrstuvwxyzheloabcdfgijk
  const cipherAlphabet = rotate(Array.from(uniqueKeySymbols).concat(unusedAlphabetSymbols), shift);

  const makeTranslator = (sourceAlphabet, targetAlphabet) => (message) => {
    return normalizeString(message)
      .split('')
      .map((symbol) => {
        const index = sourceAlphabet.indexOf(symbol);
        return targetAlphabet[index];
      })
      .join('');
  };

  return {
    cipherAlphabet,
    encipher: (message) => makeTranslator(plaintextAlphabet, cipherAlphabet)(message).toUpperCase(),
    decipher: makeTranslator(cipherAlphabet, plaintextAlphabet),
  };
};

module.exports = generateCaesarCipher;
