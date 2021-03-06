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
  key: {},
  alphabet: {
    validate: (value) => {
      throwIfMissing(value, 'alphabet');
    },
  },
  shift: {
    validate: (value) => {
      throwIf(typeof value === 'undefined', 'shift is required.');
      throwIf(!Number.isInteger(+value), 'shift must be an integer.');
    },
  },
  operation: {
    validate: (value) => {
      throwIfMissing(value, 'operation');
      throwIfInvalidCipherOperation(value);
    },
  },
};

exports.handler = makeServerlessFunction('caesar', queryParamConfig);
