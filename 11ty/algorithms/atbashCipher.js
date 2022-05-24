/**
 * @param {string[]} plaintextAlphabet The plaintext alphabet that exhaustively lists all symbols that may or may not be used in a plaintext message.
 */
const generateAtbashCipher = (plaintextAlphabet) => {
  const cipherAlphabet = plaintextAlphabet.map((symbol) => symbol.toLowerCase()).reverse();

  /**
   * @param {string} plaintext The plaintext message to encipher.
   */
  const encipher = (plaintext) => {
    const symbols = plaintext.toLowerCase().split('');
    return symbols
      .map((symbol) => {
        const index = plaintextAlphabet.indexOf(symbol);
        return cipherAlphabet[index];
      })
      .join('')
      .toUpperCase();
  };

  /**
   *
   * @param {string} ciphertext The ciphertext to decipher.
   */
  const decipher = (ciphertext) => {
    const symbols = ciphertext.toLowerCase().split('');
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
