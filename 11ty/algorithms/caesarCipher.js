const generateCaesarCipher = (shift, plaintextAlphabet, key = "") => {
  // Example: HELLO => HELO
  const keyedAlphabet = new Set(key.toLowerCase().split(""));

  // Example: If shift = 13 and key = HELLO, then we get helrstuvwxyzabcdfgijkmnpq
  const cipherAlphabet = Array.from(keyedAlphabet)
    .concat(
      plaintextAlphabet
        // Example: abcdfgijkmnpqrstuvwxyz
        .filter((symbol) => {
          return !keyedAlphabet.has(symbol);
        })
    )
    // Shift the keyed alphabet to the right
    .map((_symbol, index, alphabet) => {
      const newIndex = (index + shift) % alphabet.length;
      return alphabet[newIndex].toLowerCase();
    });

  const makeTranslator = (sourceAlphabet, targetAlphabet) => (message) => {
    return message
      .split("")
      .map((letter) => {
        const index = sourceAlphabet.indexOf(letter.toLowerCase());
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
