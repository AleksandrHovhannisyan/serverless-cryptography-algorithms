const { throwIf } = require('./utils');

const throwIfMissing = (value, queryParamName) => throwIf(!value, `${queryParamName} is required.`);

const throwIfInvalidCipherOperation = (value) =>
  throwIf(!['encipher', 'decipher'].includes(value), `${value} is not a valid operation.`);

/**
 * Validates query params according to the supplied config.
 * @param {Record<string, string>} query User-supplied query params.
 * @param {Record<string, string>} queryParamConfig A config with validator functions for each param.
 */
const validateQueryParams = (query, queryParamConfig) => {
  Object.keys(queryParamConfig).forEach((paramName) => {
    const userSuppliedValue = query[paramName];
    const config = queryParamConfig[paramName];
    config.validate?.(userSuppliedValue);
  });
};

module.exports = {
  throwIfMissing,
  throwIfInvalidCipherOperation,
  validateQueryParams,
};
