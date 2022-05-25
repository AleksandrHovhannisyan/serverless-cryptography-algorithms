const { normalizeString } = require('../../transforms');
const { getIndexMap, chunk } = require('../../utils');

const adfgvx = 'adfgvx';

/**
 * @param {string} alphabetString
 * @param {string} key
 * @param {string} paddingCharacter
 */
const generateADFGVXCipher = (alphabetString, key, paddingCharacter = 'x') => {
  // Normalize inputs
  alphabetString = normalizeString(alphabetString);
  key = normalizeString(key);

  // { "a": 0, "d": 1, "f": 2, "g": 3, "v": 4, "x": 5 }, for easy lookups
  const adfgvxIndexMap = getIndexMap(adfgvx.split(''));
  // Do the same thing for the alphabet string and the key; we'll want quick index lookups later
  const alphabetIndexMap = getIndexMap(alphabetString.split(''));
  const keyIndexMap = getIndexMap(key.split(''));

  /**
   * Enciphers the given message using the provided alphabet.
   * @param {string} plaintext
   */
  const encipher = (plaintext) => {
    // Normalize message
    plaintext = normalizeString(plaintext);

    // Step 1: Map each plaintext symbol to its digram (pair) from the alphabet square
    const digrams = plaintext
      .split('')
      .map((symbol) => {
        const symbolIndex = alphabetIndexMap.get(symbol);
        const row = Math.floor(symbolIndex / adfgvx.length);
        const column = alphabetIndexMap.get(symbol) % adfgvx.length;
        return [adfgvx[row], adfgvx[column]];
      })
      .flat();

    // Step 2: create the key square
    // Round up rowsPerCol; we'll fill in missing cells with `paddingCharacter`
    const rowsPerCol = Math.ceil(digrams.length / key.length);
    let keySquare = [];
    // Go left to right, column by column
    for (let col = 0; col < key.length; col++) {
      const columnArray = [];
      // In each column, go top down by row
      for (let row = 0; row < rowsPerCol; row++) {
        const index = row * key.length + col;
        const cipherSymbol = digrams[index] ?? paddingCharacter;
        columnArray.push(cipherSymbol);
      }
      keySquare.push({ symbol: key[col], columnArray });
    }

    // Step 3: Sort the key square alphabetically by key symbol (e.g., mark => akmr)
    keySquare = keySquare.sort((column1, column2) => column1.symbol.localeCompare(column2.symbol));

    // Step 4: Read the key square down each column, left to right
    return (
      keySquare
        // Map each column to its symbols (top down)
        .map((columnEntry) => columnEntry.columnArray)
        // Flatten the columns
        .flat()
        // Join all the symbols
        .join('')
        // Uppercase
        .toUpperCase()
    );
  };

  /**
   * @param {string} ciphertext
   */
  const decipher = (ciphertext) => {
    // Normalize ciphertext
    ciphertext = normalizeString(ciphertext);

    // Each column has the same number of rows. The ciphertext is expected to have been padded so its length is a multiple of key.length
    const rowsPerCol = Math.ceil(ciphertext.length / key.length);

    // Step 1: Sort the key. This was the last step in enciphering, so now it's the first step.
    const presortedKey = key.split('').sort((a, b) => a.localeCompare(b));

    // Step 2: Build the key square in reverse, going down each sorted column one by one.
    const keySquare = [];
    for (let col = 0; col < presortedKey.length; col++) {
      const keySymbol = presortedKey[col];
      // In the current column, go down all the rows and populate them with the ciphertext char by char
      const columnArray = [];
      for (let row = 0; row < rowsPerCol; row++) {
        const index = col * rowsPerCol + row;
        const cipherSymbol = ciphertext[index] ?? paddingCharacter;
        columnArray.push(cipherSymbol);
      }
      keySquare.push({ symbol: keySymbol, columnArray });
    }

    // Step 3: Unsort the key square using the original indices of the key symbols.
    keySquare.sort((col1, col2) => {
      const originalIndex1 = keyIndexMap.get(col1.symbol);
      const originalIndex2 = keyIndexMap.get(col2.symbol);
      return originalIndex1 - originalIndex2;
    });

    // In stage 1 of enciphering, we arranged the digrams row by row, column by column.
    // To reverse that process, we need to unwind the columns by row.
    let stage1Digrams = [];
    for (let row = 0; row < rowsPerCol; row++) {
      for (let col = 0; col < keySquare.length; col++) {
        const column = keySquare[col].columnArray;
        stage1Digrams.push(column[row]);
      }
    }

    // Chunk the resulting array of symbols to get the digrams.
    // Recall that mapping the plaintext to its digrams was the very first step in enciphering.
    stage1Digrams = chunk(stage1Digrams, 2);

    // Step 4: Finaly, use those digrams to look up the corresponding symbol in the alphabet.
    const plaintext = stage1Digrams
      .map(([rowSymbol, colSymbol]) => {
        const rowIndex = adfgvxIndexMap.get(rowSymbol);
        const colIndex = adfgvxIndexMap.get(colSymbol);
        const index = rowIndex * adfgvx.length + colIndex;
        return alphabetString[index];
      })
      .join('');

    return plaintext;
  };

  return { encipher, decipher };
};

module.exports = generateADFGVXCipher;
