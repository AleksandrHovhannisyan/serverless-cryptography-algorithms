/** Shifts the given array by `shift` spaces. If `shift` is positive, the array is shifted to the right. If it's negative, it is shifted to the left. */
const shiftArray = (array, shift) => {
  return array.map((_symbol, index) => {
    const newIndex = (index + shift) % array.length;
    return array[newIndex].toLowerCase();
  });
};

/** Throws the given error message if the condition is true.
 * @param {boolean} condition The condition to test.
 * @param {string} message The error message to throw.
 */
const throwIf = (condition, message) => {
  if (condition) {
    throw new Error(message);
  }
}

module.exports = {
  shiftArray,
  throwIf,
};
