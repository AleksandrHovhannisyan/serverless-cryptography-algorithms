const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
const { keylength, toSentenceCase, toISOString, cssminify, makeCipherFilter } = require("./11ty/filters");
const { formShortcode, outputShortcode } = require("./11ty/shortcodes");

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter('cssminify', cssminify);
  eleventyConfig.addFilter('toIsoString', toISOString);
  eleventyConfig.addFilter('keylength', keylength);
  eleventyConfig.addFilter('toSentenceCase', toSentenceCase);
  eleventyConfig.addFilter('makeCipher', makeCipherFilter);
  eleventyConfig.addPairedShortcode('form', formShortcode);
  eleventyConfig.addPairedShortcode('output', outputShortcode);
  
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
