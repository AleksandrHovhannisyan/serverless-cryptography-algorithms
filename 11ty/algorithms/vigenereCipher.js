const generateCaesarCipher = require("./caesarCipher");

/**
 *
 * @param {string[]} plaintextAlphabet
 * @param {string} key
 */
const generateVigenereCipher = (plaintextAlphabet, key) => {
  const n = plaintextAlphabet.length;
  const keySymbols = key.toLocaleLowerCase().split("");

  const vigenereSquare = Array.from({ length: n }, (_v, index) =>
    generateCaesarCipher(index + 1, plaintextAlphabet)
  );

  const makeTranslator = (getOperation) => (message) => {
    const headerRow = Array.from(
      { length: message.length },
      (_v, index) => keySymbols[index % keySymbols.length]
    );

    return message
      .toLocaleLowerCase()
      .split("")
      .map((symbol, index) => {
        const headerKey = headerRow[index];
        const caesarCipher = vigenereSquare.filter(
          (row) => row.cipherAlphabet[0] === headerKey
        )[0];
        const operation = getOperation(caesarCipher);
        return operation(symbol);
      })
      .join("");
  };

  return {
    square: vigenereSquare,
    encipher: makeTranslator((caesarCipher) => caesarCipher.encipher),
    decipher: makeTranslator((caesarCipher) => caesarCipher.decipher),
  };
};

module.exports = {
  generateVigenereCipher,
};
