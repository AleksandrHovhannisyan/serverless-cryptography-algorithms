const generateCaesarCipher = require('./caesarCipher');
const alphabets = require('../../../src/_data/alphabets');

describe('caesar cipher', () => {
  it('correctly implements unkeyed rot13', () => {
    const rot13 = generateCaesarCipher(13, alphabets.english.split(''));
    const ciphertext = rot13.encipher('We are discovered! Flee at once.');
    expect(ciphertext).toStrictEqual(`JRNERQVFPBIRERQSYRRNGBAPR`);
    // ROT13 is symmetric
    expect(rot13.decipher(ciphertext)).toStrictEqual('wearediscoveredfleeatonce');
    expect(rot13.encipher(ciphertext)).toStrictEqual('WEAREDISCOVEREDFLEEATONCE');
  });
  it('correctly implements keyed caesar cipher', () => {
    // abcdefghijklmnopqrstuvwxyz
    // yzjulisabcdefghkmnopqrtvwx
    // Message:    wearediscoveredfleeatonce
    // Ciphertext: TLYNLUBOJHRLNLUIELLYPHGJL
    const rot2 = generateCaesarCipher(2, alphabets.english.split(''), 'JULIUS');
    const ciphertext = rot2.encipher('We are discovered! Flee at once.');
    expect(ciphertext).toStrictEqual(`TLYNLUBOJHRLNLUIELLYPHGJL`);
    expect(rot2.decipher(ciphertext)).toStrictEqual('wearediscoveredfleeatonce');
  });
  it('implements shift=s and s-26 symmetrically', () => {
    const rot2 = generateCaesarCipher(2, alphabets.english.split(''), 'JULIUS');
    const rot24 = generateCaesarCipher(-24, alphabets.english.split(''), 'JULIUS');
    const message = 'We are discovered! Flee at once.';
    expect(rot2.encipher(message)).toStrictEqual(rot24.encipher(message));
    expect(rot24.decipher(rot2.encipher(message))).toStrictEqual('wearediscoveredfleeatonce');
  });
});
