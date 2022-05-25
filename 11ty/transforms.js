const { removePunctuation, removeWhitespace } = require('./utils');

/**
 * @param {string} string
 */
const normalizeString = (string) => removePunctuation(removeWhitespace(string.toLowerCase()));

/**
 * @param {string} alphabet
 */
const transformAlphabet = (alphabet) => {
  return alphabet.toLocaleLowerCase().split('');
};

/**
 * @param {string} value
 */
const transformNumber = (value) => Number(value);

module.exports = {
  normalizeString,
  transformAlphabet,
  transformNumber,
};
