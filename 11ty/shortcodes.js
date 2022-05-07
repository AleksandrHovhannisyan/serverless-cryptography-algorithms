const generateCaesarCipher = require("./algorithms/caesarCipher");

const outputShortcode = (query) => {
  switch (query.algorithm) {
    case "caesar": {
      const caesarShift = generateCaesarCipher(
        Number(query.shift),
        query.alphabet.split("")
      );
      const transform = caesarShift[query.operation];
      return transform(query.message);
    }
    default: {
      return;
    }
  }
};

module.exports = {
  outputShortcode,
};
