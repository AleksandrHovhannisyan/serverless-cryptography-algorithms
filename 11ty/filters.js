const { generateAtbashCipher } = require("./algorithms/atbashCipher");
const generateCaesarCipher = require("./algorithms/caesarCipher");

const keylength = (obj) => Object.keys(obj).length;

const toSentenceCase = (str) => {
  const [first, ...rest] = str.split("");
  return `${first.toUpperCase()}${rest.join("")}`;
};

const outputFilter = (query) => {
  switch (query.algorithm) {
    case "caesar": {
      const algorithm = generateCaesarCipher(
        Number(query.shift),
        query.alphabet.split(""),
        query.key
      );
      const transform = algorithm[query.operation];
      return {
        alphabet: algorithm.cipherAlphabet,
        output: transform(query.message),
      };
    }
    case "atbash": {
      const algorithm = generateAtbashCipher(query.alphabet.split(""));
      const transform = algorithm[query.operation];
      return {
        alphabet: algorithm.cipherAlphabet,
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
