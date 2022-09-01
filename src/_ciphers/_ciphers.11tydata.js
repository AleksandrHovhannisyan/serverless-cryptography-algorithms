module.exports = {
  layout: 'algorithm',
  tags: ['algorithms', 'ciphers'],
  // eleventyComputed needed for data to be non-nullish
  eleventyComputed: {
    permalink: (data) => {
      return {
        build: `/ciphers/${data.page.fileSlug}/`,
        [data.id]: `/ciphers/${data.page.fileSlug}/output/`,
      };
    },
  },
};
