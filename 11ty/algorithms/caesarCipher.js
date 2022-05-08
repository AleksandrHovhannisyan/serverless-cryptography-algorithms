const { shiftArray } = require("../utils");

const generateCaesarCipher = (shift, plaintextAlphabet, key = "") => {
  // Example: HELLO => HELO
  const uniqueKeySymbols = new Set(key.toLowerCase().split(""));

  // Example: abcdfgijkmnpqrstuvwxyz
  const unusedAlphabetSymbols = plaintextAlphabet.filter(
    (symbol) => !uniqueKeySymbols.has(symbol)
  );

  // Example: If shift = 13 and key = HELLO, we get mnpqrstuvwxyzheloabcdfgijk
  const cipherAlphabet = shiftArray(
    Array.from(uniqueKeySymbols).concat(unusedAlphabetSymbols),
    shift
  );

  const makeTranslator = (sourceAlphabet, targetAlphabet) => (message) => {
    return message
      .toLowerCase()
      .split("")
      .map((symbol) => {
        const index = sourceAlphabet.indexOf(symbol);
        return targetAlphabet[index];
      })
      .join("");
  };

  return {
    cipherAlphabet,
    encipher: makeTranslator(plaintextAlphabet, cipherAlphabet),
    decipher: makeTranslator(cipherAlphabet, plaintextAlphabet),
  };
};

module.exports = generateCaesarCipher;
