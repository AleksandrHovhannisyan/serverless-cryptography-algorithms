/**
 * Returns the given string without whitespace/punctuation.
 * @param {string} string
 */
const transformString = (string) => {
  return string.toLowerCase().replace(/[\s\.,'"\?\!\:;&@#\$\*\+\(\)\{\}\[\]\u2013\u2014\-\^\/]/g, "");
};

/**
 * @param {string} alphabet
 */
const transformAlphabet = (alphabet) => {
  return alphabet.toLocaleLowerCase().split("");
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
}

/**
 * @param {string} value
 */
const transformNumber = (value) => Number(value);

module.exports = {
  transformString,
  transformAlphabet,
  transformNumber,
  transformQueryParams,
};
