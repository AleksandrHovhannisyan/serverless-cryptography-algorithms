const { loopString, removePunctuation, removeWhitespace } = require('../../utils');
const generateCaesarCipher = require('../caesarCipher/caesarCipher');

/**
 *
 * @param {string[]} plaintextAlphabet An alphabet exhaustively listing all of the symbols that can be found in the plaintext message.
 * @param {string} key A key with which to seed the Vigenere generator.
 */
const generateVigenereCipher = (plaintextAlphabet, key) => {
  const n = plaintextAlphabet.length;
  key = removePunctuation(key.toLowerCase());

  // Create n Caesar Cipher rows, where each row uses a shift of +1 from the previous (starting at 1)
  const vigenereSquare = Array.from({ length: n }, (_v, index) =>
    generateCaesarCipher(-(index + 1), plaintextAlphabet)
  );

  /**
   * @param {'encipher' | 'decipher'} operation
   * @returns {(message: string) => string}
   */
  const makeTranslator = (operation) => (message) => {
    // Clean message
    message = removeWhitespace(removePunctuation(message.toLowerCase()));

    // Take the key and repeat it for the length of the message, wrapping around to the start of the key when you run out of symbols.
    const headerRow = loopString(key, message.length);
    return message
      .toLowerCase()
      .split('')
      .map((symbol, index) => {
        const headerSymbol = headerRow[index];
        // Find the first Caesar cipher whose alphabet begins with the header key symbol we're looking at
        const caesarCipher = vigenereSquare.filter((row) => row.cipherAlphabet[0] === headerSymbol)[0];
        // And translate the current symbol using that Caesar alphabet
        return caesarCipher[operation](symbol);
      })
      .join('');
  };

  return {
    square: vigenereSquare,
    encipher: (message) => makeTranslator('encipher')(message).toUpperCase(),
    decipher: makeTranslator('decipher'),
  };
};

module.exports = generateVigenereCipher;
