module.exports = (eleventyConfig) => {
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "liquid",
    templateFormats: ["html", "md", "liquid"],
  };
};
