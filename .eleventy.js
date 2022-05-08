const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
const { outputFilter, keylength, toSentenceCase, toISOString, cssminify } = require("./11ty/filters");

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter('cssminify', cssminify);
  eleventyConfig.addFilter('toIsoString', toISOString);
  eleventyConfig.addFilter('keylength', keylength);
  eleventyConfig.addFilter('toSentenceCase', toSentenceCase);
  eleventyConfig.addFilter('output', outputFilter);
  
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
