const { throwIf } = require('../../../11ty/utils.js');
const { throwIfMissing, throwIfInvalidCipherOperation } = require('../../../11ty/validators.js');
const makeServerlessFunction = require('../../makeServerlessFunction.js');
require('./eleventy-bundler-modules.js');

const queryParamConfig = {
  message: {
    validate: (value) => {
      throwIfMissing(value, 'message');
    },
  },
  key: {
    validate: (value) => {
      throwIfMissing(value, 'key');
      const length = value.length;
      throwIf(!length, 'key must be a non-empty string.');
      const uniqueKeySymbols = new Set(value.split(''));
      throwIf(length !== uniqueKeySymbols.size, 'key cannot contain duplicate symbols.');
    },
  },
  alphabet: {
    validate: (value) => {
      throwIfMissing(value, 'alphabet');
      throwIf(value.length !== 36, 'alphabet must be exactly 36 characters long.');
    },
  },
  operation: {
    validate: (value) => {
      throwIfMissing(value, 'operation');
      throwIfInvalidCipherOperation(value);
    },
  },
};

exports.handler = makeServerlessFunction('adfgvx', queryParamConfig);
