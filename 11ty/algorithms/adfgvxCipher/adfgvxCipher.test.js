const generateADFGVXCipher = require('./adfgvxCipher');

const alphabet = `8p3d1nlt4oah7kbc5zju6wgmxsvir29ey0fq`;
const key = 'mark';

describe('adfgvx cipher', () => {
  it(`enciphers "attack at 10 pm" to "VDGVVDDVDDGXDDFDAADDFDXG" and deciphers to "attackat10pm"`, () => {
    const adfgvx = generateADFGVXCipher(alphabet, key);
    const ciphertext = adfgvx.encipher('attack at 10 pm');
    expect(ciphertext).toEqual('VDGVVDDVDDGXDDFDAADDFDXG');
    expect(adfgvx.decipher(ciphertext)).toEqual('attackat10pm');
  });

  it(`enciphers "hello, world!" to "XAGGADAGVGDDDDDXDGVA" and deciphers to "helloworld"`, () => {
    const adfgvx = generateADFGVXCipher(alphabet, key);
    const ciphertext = adfgvx.encipher('hello, world!');
    expect(ciphertext).toEqual('XAGGADAGVGDDDDDXDGVA');
    expect(adfgvx.decipher(ciphertext)).toEqual('helloworld');
  });

  it(`enciphers "World War 1" to "GVGVVGAGVXGVADADDGVX" and deciphers to "worldwar1q"`, () => {
    const adfgvx = generateADFGVXCipher(alphabet, key);
    const ciphertext = adfgvx.encipher('World War 1');
    expect(ciphertext).toEqual('GVGVVGAGVXGVADADDGVX');
    expect(adfgvx.decipher(ciphertext)).toEqual('worldwar1q');
  });
});
