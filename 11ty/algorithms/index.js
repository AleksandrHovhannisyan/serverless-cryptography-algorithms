const generateAtbashCipher = require('./atbashCipher/atbashCipher');
const generateBookCipher = require('./bookCipher/bookCipher');
const generateCaesarCipher = require('./caesarCipher/caesarCipher');
const generateVigenereCipher = require('./vigenereCipher/vigenereCipher');

module.exports = {
  generateAtbashCipher,
  generateBookCipher,
  generateCaesarCipher,
  generateVigenereCipher,
};
