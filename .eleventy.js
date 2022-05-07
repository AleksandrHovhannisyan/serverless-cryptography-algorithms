const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

const generateCaesarCipher = (shift, plaintextAlphabet) => {
  if (shift === 0 || shift === plaintextAlphabet.length) {
    throw new Error(
      `Invalid caesar shift. Valid values range from ${1} through ${
        plaintextAlphabet.length - 1
      }.`
    );
  }

  const cipherAlphabet = plaintextAlphabet.map((_symbol, index) => {
    const newIndex = (index + shift) % plaintextAlphabet.length;
    return plaintextAlphabet[newIndex].toLowerCase();
  });

  const encipher = (message) => {
    const letters = message.split("");
    return letters
      .map((letter) => {
        const index = plaintextAlphabet.indexOf(letter.toLowerCase());
        return cipherAlphabet[index];
      })
      .join("");
  };

  const decipher = (message) => {
    const letters = message.split("");
    return letters
      .map((letter) => {
        const index = cipherAlphabet.indexOf(letter.toLowerCase());
        return plaintextAlphabet[index];
      })
      .join("");
  };

  return { encipher, decipher };
};

const outputShortcode = (query) => {
  switch (query.algorithm) {
    case 'caesar': {
      const caesarShift = generateCaesarCipher(Number(query.shift), query.alphabet.split(''));
      const transform = caesarShift[query.operation];
      return transform(query.message);
    }
    default: {
      return;
    }
  }
}

module.exports = (eleventyConfig) => {
  eleventyConfig.addShortcode('output', outputShortcode);
  
  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "onrequest",
    functionsDir: "./netlify/functions/",
  });

  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "liquid",
    templateFormats: ["html", "md", "liquid"],
  };
};
