const {
  normalizeString,
  transformAlphabet,
  transformNumber,
} = require("../../../11ty/transforms.js");
const { throwIf } = require("../../../11ty/utils.js");
const {
  throwIfMissing,
  throwIfInvalidCipherOperation,
} = require("../../../11ty/validators.js");
const makeServerlessFunction = require("../../makeServerlessFunction.js");
require("./eleventy-bundler-modules.js");

const queryParamConfig = {
  message: {
    transform: normalizeString,
    validate: (value) => {
      throwIfMissing(value, "message");
    },
  },
  key: {
    transform: normalizeString,
  },
  alphabet: {
    transform: transformAlphabet,
    validate: (value) => {
      throwIfMissing(value, "alphabet");
    },
  },
  shift: {
    transform: transformNumber,
    validate: (value) => {
      throwIf(typeof value === "undefined", "shift is required.");
      throwIf(!Number.isInteger(+value), "shift must be an integer.");
    },
  },
  operation: {
    validate: (value) => {
      throwIfMissing(value, "operation");
      throwIfInvalidCipherOperation(value);
    },
  },
};

exports.handler = makeServerlessFunction("caesar", queryParamConfig);
