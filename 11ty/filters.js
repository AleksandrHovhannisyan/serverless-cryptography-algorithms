const CleanCSS = require('clean-css');
const {
  generateCaesarCipher,
  generateAtbashCipher,
  generateVigenereCipher,
  generateBookCipher,
} = require('./algorithms');

const toISOString = (dateString) => dateString.toISOString();

const keylength = (obj) => Object.keys(obj ?? {}).length;

const toSentenceCase = (str) => {
  const [first, ...rest] = str.split('');
  return `${first.toUpperCase()}${rest.join('')}`;
};

const cssminify = (css) => new CleanCSS({}).minify(css).styles;

/**
 * Returns the result of interpreting the query parameters under a specific cryptography algorithm.
 * @param {Record<string, string>} query URL query parameters supplied by the user.
 * @param {string} algorithm A unique string identifying the algorithm to be used.
 * @returns
 */
const makeCipherFilter = (query, algorithm) => {
  switch (algorithm) {
    case 'caesar': {
      const algorithm = generateCaesarCipher(query.shift, query.alphabet, query.key);
      const operation = algorithm[query.operation];
      return {
        alphabet: algorithm.cipherAlphabet,
        message: operation?.(query.message),
      };
    }
    case 'atbash': {
      const algorithm = generateAtbashCipher(query.alphabet);
      const operation = algorithm[query.operation];
      return {
        alphabet: algorithm.cipherAlphabet,
        message: operation?.(query.message),
      };
    }
    case 'vigenere': {
      const algorithm = generateVigenereCipher(query.alphabet, query.key);
      const operation = algorithm[query.operation];
      return {
        square: algorithm.square,
        message: operation?.(query.message),
      };
    }
    case 'book': {
      const algorithm = generateBookCipher(query.bookText);
      const operation = algorithm[query.operation];
      return {
        alphabet: query.operation === 'encipher' ? algorithm.alphabets.cipher : algorithm.alphabets.plain,
        message: operation?.(query.message),
      };
    }
    default: {
      throw new Error('Unrecognized algorithm');
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
