const alphabets = require('../../../src/_data/alphabets');
const generateVigenereCipher = require('./vigenereCipher');

describe('vigenere cipher', () => {
  it('correctly enciphers a plaintext message and deciphers it back to the original', () => {
    // From The Code Book pages 68-69
    const vigenere = generateVigenereCipher(alphabets.english, 'KING');
    const ciphertext = vigenere.encipher('The Sun and the Man in the Moon');
    expect(ciphertext).toStrictEqual('DPRYEVNTNBUKWIAOXBUKWWBT');
    expect(vigenere.decipher(ciphertext)).toStrictEqual('thesunandthemaninthemoon');
  });
  it('supports keys that are longer than the length of the plaintext message', () => {
    const vigenere = generateVigenereCipher(alphabets.english, 'goodbye');
    const ciphertext = vigenere.encipher('hello');
    expect(ciphertext).toStrictEqual('NSZOP');
    expect(vigenere.decipher(ciphertext)).toStrictEqual('hello');
  });
});
