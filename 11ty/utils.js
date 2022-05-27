/**
 * Removes all whitespace from the given string.
 * @param {string} string
 */
const removeWhitespace = (string) => string.replace(/\s/g, '');

/** Removes all tabs, newlines, and multiple consecutive spaces from the given string, replacing them with a single space.
 * @param {string} string
 */
const collapseConsecutiveWhitespace = (string) => string.replace(/\s+/g, ' ');

/**
 * Removes all punctuation from the given string, preserving words.
 * @param {string} string
 */
const removePunctuation = (string) => {
  return string.replace(/[.,'"?!:;&@#$*+(){}[\]^/]/g, '').replace(/[-\u2013\u2014]/g, ' ');
};

/** Rotates the given array by `shift` spaces. If `shift` is positive, the array is rotated to the right. If it's negative, it is rotated to the left.
 * @param {any[]} array
 * @param {number} rotation
 * @example rotate(['a', 'b', 'c', 'd'], 3) returns ['b', 'c', 'd', 'a'].
 */
const rotate = (array, shift) => {
  // Wraps very large negative rotations around to a smaller positive rotation. Does not affect positive rotations.
  // Example 1: ['a', 'b', 'c', 'd', 'e'] and shift of -8 is the same as a shift of (-8 % 5) + 5 = -3 + 5 = 2.
  const correctedShift = (shift % array.length) + array.length;
  return (
    array
      // map each element to its new index
      .map((element, index) => {
        // Modulo to wrap around
        const newIndex = (index + correctedShift) % array.length;
        return { element, newIndex };
      })
      // Sort by index in ascending order
      .sort((a, b) => a.newIndex - b.newIndex)
      // Map back to the elements themselves
      .map((el) => el.element)
  );
};

/**
 * Loops a string from start to end to make a string of length `n`. Throws an error if `n < str.length`.
 * @param {string} str The string to loop.
 * @param {number} targetLength The number of desired characters in the final string.
 */
const loopString = (str, targetLength) => {
  if (targetLength <= str.length) {
    return str;
  }
  return Array.from({ length: targetLength }, (_v, index) => str[index % str.length]).join('');
};

/** Throws the given error message if the condition is true.
 * @param {boolean} condition The condition to test.
 * @param {string} message The error message to throw.
 */
const throwIf = (condition, message) => {
  if (condition) {
    throw new Error(message);
  }
};

/**
 * Maps each array entry to its index.
 * @param {any[]} arr
 * @returns {Map<any, number>}
 */
const getIndexMap = (arr) => {
  return arr.reduce((map, entry, i) => {
    map.set(entry, i);
    return map;
  }, new Map());
};

/**
 * Split an array into even chunks. If step is not a multiple of the array length, the last few chunks may be shorter.
 * @param {any[]} arr
 * @param {number} step
 */
const chunk = (arr, step) => {
  const chunked = [];
  for (let i = 0; i < arr.length; i += step) {
    chunked.push(arr.slice(i, i + step));
  }
  return chunked;
};

module.exports = {
  rotate,
  throwIf,
  loopString,
  removeWhitespace,
  collapseConsecutiveWhitespace,
  removePunctuation,
  chunk,
  getIndexMap,
};
