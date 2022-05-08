/** Shifts the given array by `shift` spaces. If `shift` is positive, the array is shifted to the right. If it's negative, it is shifted to the left. */
const shiftArray = (array, shift) => {
  return array.map((_symbol, index) => {
    const newIndex = (index + shift) % array.length;
    return array[newIndex].toLowerCase();
  });
};

const throwIf = (condition, message) => {
  if (condition) {
    throw new Error(message);
  }
}

/**
 * Validates query params according to the supplied config.
 * @param {Record<string, string>} query User-supplied query params.
 * @param {Record<string, string>} queryParamConfig A config with validator functions for each param.
 */
const validateQueryParams = (query, queryParamConfig) => {
  Object.keys(queryParamConfig).forEach((paramName) => {
    const userSuppliedValue = query[paramName];
    const config = queryParamConfig[paramName];
    config.validate(userSuppliedValue);
  });
}

module.exports = {
  shiftArray,
  throwIf,
  validateQueryParams,
};
