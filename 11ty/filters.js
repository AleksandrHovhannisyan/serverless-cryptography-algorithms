const generateCaesarCipher = require("./algorithms/caesarCipher");

const keylength = (obj) => Object.keys(obj).length;

const toSentenceCase = (str) => {
  const [first, ...rest] = str.split('');
  return `${first.toUpperCase()}${rest.join('')}`
}

const outputFilter = (query) => {
  switch (query.algorithm) {
    case "caesar": {
      const caesarShift = generateCaesarCipher(
        Number(query.shift),
        query.alphabet.split("")
      );
      const transform = caesarShift[query.operation];
      return {
        alphabet: caesarShift.cipherAlphabet,
        output: transform(query.message),
      };
    }
    default: {
      return;
    }
  }
};

module.exports = {
  keylength,
  toSentenceCase,
  outputFilter,
};
