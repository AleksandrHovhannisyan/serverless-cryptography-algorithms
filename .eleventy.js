const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
const { outputShortcode } = require("./11ty/shortcodes");

module.exports = (eleventyConfig) => {
  eleventyConfig.addShortcode('output', outputShortcode);
  eleventyConfig.addFilter('keylength', (obj) => Object.keys(obj).length);
  
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
