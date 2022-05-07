const generateCaesarCipher = (shift, plaintextAlphabet, key = "") => {
  if (shift === 0 || shift === plaintextAlphabet.length) {
    throw new Error(
      `Invalid caesar shift. Valid values range from ${1} through ${
        plaintextAlphabet.length - 1
      }.`
    );
  }

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

  const encipher = (message) => {
    const letters = message.split("");
    return letters
      .map((letter) => {
        const index = plaintextAlphabet.indexOf(letter.toLowerCase());
        return cipherAlphabet[index];
      })
      .join("");
  };

  const decipher = (message) => {
    const letters = message.split("");
    return letters
      .map((letter) => {
        const index = cipherAlphabet.indexOf(letter.toLowerCase());
        return plaintextAlphabet[index];
      })
      .join("");
  };

  return { cipherAlphabet, encipher, decipher };
};

module.exports = generateCaesarCipher;
