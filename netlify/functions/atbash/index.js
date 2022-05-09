const {
  transformString,
  transformAlphabet,
} = require("../../../11ty/transforms.js");
const {
  throwIfMissing,
  throwIfInvalidCipherOperation,
} = require("../../../11ty/validators.js");
const makeServerlessFunction = require("../../makeServerlessFunction.js");
require("./eleventy-bundler-modules.js");

const queryParamConfig = {
  message: {
    transform: transformString,
    validate: (value) => {
      throwIfMissing(value, "message");
    },
  },
  alphabet: {
    transform: transformAlphabet,
    validate: (value) => {
      throwIfMissing(value, "alphabet");
    },
  },
  operation: {
    validate: (value) => {
      throwIfMissing(value, "operation");
      throwIfInvalidCipherOperation(value);
    },
  },
};

exports.handler = makeServerlessFunction("atbash", queryParamConfig);