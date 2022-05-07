const generateCaesarCipher = (shift, plaintextAlphabet) => {
  if (shift === 0 || shift === plaintextAlphabet.length) {
    throw new Error(
      `Invalid caesar shift. Valid values range from ${1} through ${
        plaintextAlphabet.length - 1
      }.`
    );
  }

  const cipherAlphabet = plaintextAlphabet.map((_symbol, index) => {
    const newIndex = (index + shift) % plaintextAlphabet.length;
    return plaintextAlphabet[newIndex].toLowerCase();
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

  return { encipher, decipher };
};

module.exports = generateCaesarCipher;
