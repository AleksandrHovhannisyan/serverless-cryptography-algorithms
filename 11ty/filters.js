const CleanCSS = require('clean-css');
const { generateAtbashCipher } = require("./algorithms/atbashCipher");
const generateCaesarCipher = require("./algorithms/caesarCipher");
const { generateVigenereCipher } = require("./algorithms/vigenereCipher");

const toISOString = (dateString) => dateString.toISOString();

const keylength = (obj) => Object.keys(obj ?? {}).length;

const toSentenceCase = (str) => {
  const [first, ...rest] = str.split("");
  return `${first.toUpperCase()}${rest.join("")}`;
};

const cssminify = (css) => new CleanCSS({}).minify(css).styles;

/**
 * Returns the result of interpreting the query parameters under a specific cryptography algorithm.
 * @param {Record<string, string>} query URL query parameters supplied by the user. 
 * @param {string} algorithm A unique string identifying the algorithm to be used.
 * @returns 
 */
const makeCipherFilter = (query, algorithm) => {
  const message = query.message.replace(/[\s\.,\?\!\:;&@#\$\*\+]/g, '');
  switch (algorithm) {
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
      throw new Error("Unrecognized algorithm");
    }
  }
};

module.exports = {
  cssminify,
  toISOString,
  keylength,
  toSentenceCase,
  makeCipherFilter,
};
