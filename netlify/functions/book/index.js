const { throwIfMissing, throwIfInvalidCipherOperation } = require('../../../11ty/validators.js');
const makeServerlessFunction = require('../../makeServerlessFunction.js');
require('./eleventy-bundler-modules.js');

const queryParamConfig = {
  bookText: {
    validate: (value) => {
      throwIfMissing(value, 'bookText');
    },
  },
  message: {
    validate: (value) => {
      throwIfMissing(value, 'message');
    },
  },
  operation: {
    validate: (value) => {
      throwIfMissing(value, 'operation');
      throwIfInvalidCipherOperation(value);
    },
  },
};

exports.handler = makeServerlessFunction('book', queryParamConfig);
