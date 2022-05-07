const generateAtbashCipher = (plaintextAlphabet) => {
  const cipherAlphabet = plaintextAlphabet
    .map((symbol) => symbol.toLowerCase())
    .reverse();

  const encipher = (message) => {
    console.log(`enciphering`, message);
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

module.exports = { generateAtbashCipher };
