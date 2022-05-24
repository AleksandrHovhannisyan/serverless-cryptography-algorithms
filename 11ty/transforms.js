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
 * Transforms each query param's raw value to its final value according to the supplied config.
 * @param {Record<string, string>} query User-supplied query params.
 * @param {Record<string, string>} queryParamConfig A config with transformation functions for each param.
 */
const transformQueryParams = (query, queryParamConfig) => {
  return Object.keys(queryParamConfig).reduce((transformedQuery, paramName) => {
    const userSuppliedValue = query[paramName] ?? '';
    const config = queryParamConfig[paramName];
    transformedQuery[paramName] = config.transform?.(userSuppliedValue) ?? userSuppliedValue;
    return transformedQuery;
  }, {});
};

/**
 * @param {string} value
 */
const transformNumber = (value) => Number(value);

module.exports = {
  normalizeString,
  transformAlphabet,
  transformNumber,
  transformQueryParams,
};
