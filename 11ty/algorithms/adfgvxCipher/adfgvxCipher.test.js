const generateADFGVXCipher = require('./adfgvxCipher');

const alphabet = `8p3d1nlt4oah7kbc5zju6wgmxsvir29ey0fq`;

describe('adfgvx cipher', () => {
  it(`enciphers "attack at 10 pm" to "VDGVVDDVDDGXDDFDAADDFDXG" and deciphers to "attackat10pm"`, () => {
    // From The Code Book
    const adfgvx = generateADFGVXCipher(alphabet, 'mark');
    const ciphertext = adfgvx.encipher('attack at 10 pm');
    expect(ciphertext).toStrictEqual('VDGVVDDVDDGXDDFDAADDFDXG');
    expect(adfgvx.decipher(ciphertext)).toStrictEqual('attackat10pm');
  });

  it(`enciphers "hello, world!" to "XAGGADAGVGDDDDDXDGVA" and deciphers to "helloworld"`, () => {
    const adfgvx = generateADFGVXCipher(alphabet, 'mark');
    const ciphertext = adfgvx.encipher('hello, world!');
    expect(ciphertext).toStrictEqual('XAGGADAGVGDDDDDXDGVA');
    expect(adfgvx.decipher(ciphertext)).toStrictEqual('helloworld');
  });

  it(`enciphers "World War 1" to "GVGVVGAGVXGVADADDGVX" and deciphers to "worldwar1q"`, () => {
    const adfgvx = generateADFGVXCipher(alphabet, 'mark');
    const ciphertext = adfgvx.encipher('World War 1');
    expect(ciphertext).toStrictEqual('GVGVVGAGVXGVADADDGVX');
    expect(adfgvx.decipher(ciphertext)).toStrictEqual('worldwar1q');
  });

  it(`enciphers "I love 11ty" to "GXDGAXDVXAAFVFDDDXVVX" and deciphers to "ilove11tyq"`, () => {
    const adfgvx = generateADFGVXCipher(alphabet, 'netlify');
    const ciphertext = adfgvx.encipher('I love 11ty');
    expect(ciphertext).toStrictEqual('GXDGAXDVXAAFVFDDDXVVX');
    expect(adfgvx.decipher(ciphertext)).toStrictEqual('ilove11tyq');
  });
});
