const generateCaesarCipher = (shift, plaintextAlphabet, key = "") => {
  // Example: HELLO => HELO
  const uniqueKeySymbols = new Set(key.toLowerCase().split(""));

  // Example: abcdfgijkmnpqrstuvwxyz
  const unusedAlphabetSymbols = plaintextAlphabet.filter(
    (symbol) => !uniqueKeySymbols.has(symbol)
  );

  // Example: If shift = 13 and key = HELLO, we get mnpqrstuvwxyzheloabcdfgijk
  const cipherAlphabet = Array.from(uniqueKeySymbols)
    .concat(unusedAlphabetSymbols)
    // Shift the keyed alphabet to the right
    .map((_symbol, index, alphabet) => {
      const newIndex = (index + shift) % alphabet.length;
      return alphabet[newIndex].toLowerCase();
    });

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
