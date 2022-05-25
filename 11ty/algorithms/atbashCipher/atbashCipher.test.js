const generateAtbashCipher = require('./atbashCipher');
const alphabets = require('../../../src/_data/alphabets');

describe('atbash cipher', () => {
  it(`enciphers "Hello, World!" to "svooldliow" and back to "helloworld"`, () => {
    const cipher = generateAtbashCipher(alphabets.english);
    const ciphertext = cipher.encipher('Hello, World!');
    expect(ciphertext).toStrictEqual('svooldliow');
    expect(cipher.decipher(ciphertext)).toStrictEqual('helloworld');
  });
});
