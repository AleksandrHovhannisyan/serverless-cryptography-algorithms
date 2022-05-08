const { generateAtbashCipher } = require("./algorithms/atbashCipher");
const generateCaesarCipher = require("./algorithms/caesarCipher");
const { generateVigenereCipher } = require("./algorithms/vigenereCipher");

const toISOString = (dateString) => dateString.toISOString();

const keylength = (obj) => Object.keys(obj).length;

const toSentenceCase = (str) => {
  const [first, ...rest] = str.split("");
  return `${first.toUpperCase()}${rest.join("")}`;
};

const outputFilter = (query) => {
  const message = query.message.replace(/[\s\.,\?\!\:;&@#\$\*\+]/g, '');
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
        message: transform(message),
      };
    }
    case "atbash": {
      const algorithm = generateAtbashCipher(query.alphabet.split(""));
      const transform = algorithm[query.operation];
      return {
        alphabet: algorithm.cipherAlphabet,
        message: transform(message),
      };
    }
    case "vigenere": {
      const algorithm = generateVigenereCipher(query.alphabet.split(""), query.key);
      const transform = algorithm[query.operation];
      return {
        square: algorithm.square,
        message: transform(message),
      };
    }
    default: {
      return;
    }
  }
};

module.exports = {
  toISOString,
  keylength,
  toSentenceCase,
  outputFilter,
};
