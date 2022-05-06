module.exports = {
  english: Array.from({ length: 26 }, (_n, index) =>
    String.fromCharCode(97 + index)
  ).join(""),
};
