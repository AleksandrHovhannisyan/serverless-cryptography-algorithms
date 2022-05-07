const generateAtbashCipher = (plaintextAlphabet) => {
  const cipherAlphabet = plaintextAlphabet
    .map((symbol) => symbol.toLowerCase())
    .reverse();

  const encipher = (message) => {
    const symbols = message.split("").toLowerCase();
    return symbols
      .map((symbol) => {
        const index = plaintextAlphabet.indexOf(symbol);
        return cipherAlphabet[index];
      })
      .join("");
  };

  const decipher = (message) => {
    const symbols = message.split("").toLowerCase();
    return symbols
      .map((symbol) => {
        const index = cipherAlphabet.indexOf(symbol);
        return plaintextAlphabet[index];
      })
      .join("");
  };

  return { cipherAlphabet, encipher, decipher };
};

module.exports = { generateAtbashCipher };
