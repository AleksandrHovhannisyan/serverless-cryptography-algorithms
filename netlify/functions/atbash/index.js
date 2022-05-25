const { throwIfMissing, throwIfInvalidCipherOperation } = require('../../../11ty/validators.js');
const makeServerlessFunction = require('../../makeServerlessFunction.js');
require('./eleventy-bundler-modules.js');

const queryParamConfig = {
  message: {
    validate: (value) => {
      throwIfMissing(value, 'message');
    },
  },
  alphabet: {
    validate: (value) => {
      throwIfMissing(value, 'alphabet');
    },
  },
  operation: {
    validate: (value) => {
      throwIfMissing(value, 'operation');
      throwIfInvalidCipherOperation(value);
    },
  },
};

exports.handler = makeServerlessFunction('atbash', queryParamConfig);
