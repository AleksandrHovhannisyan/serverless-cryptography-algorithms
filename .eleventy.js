const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
const {
  keylength,
  toSentenceCase,
  toISOString,
  cssminify,
  makeCipherFilter,
} = require("./11ty/filters");
const { formShortcode, outputShortcode } = require("./11ty/shortcodes");

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter("keys", Object.keys);
  eleventyConfig.addFilter("cssminify", cssminify);
  eleventyConfig.addFilter("toIsoString", toISOString);
  eleventyConfig.addFilter("keylength", keylength);
  eleventyConfig.addFilter("toSentenceCase", toSentenceCase);
  eleventyConfig.addFilter("makeCipher", makeCipherFilter);
  eleventyConfig.addPairedShortcode("form", formShortcode);
  eleventyConfig.addPairedShortcode("output", outputShortcode);

  const createServerlessRoute = (name) => {
    eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
      name,
      functionsDir: "./netlify/functions/",
    });
  };

  // Ciphers
  createServerlessRoute("atbash");
  createServerlessRoute("caesar");
  createServerlessRoute("vigenere");
  createServerlessRoute("book");

  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "liquid",
    templateFormats: ["html", "md", "liquid"],
  };
};
