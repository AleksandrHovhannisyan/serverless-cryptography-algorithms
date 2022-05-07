const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
const { outputFilter, keylength, toSentenceCase } = require("./11ty/filters");

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter('output', outputFilter);
  eleventyConfig.addFilter('keylength', keylength);
  eleventyConfig.addFilter('toSentenceCase', toSentenceCase);
  
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
