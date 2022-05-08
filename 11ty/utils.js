/** Shifts the given array by `shift` spaces. If `shift` is positive, the array is shifted to the right. If it's negative, it is shifted to the left. */
const shiftArray = (array, shift) => {
  return array.map((_symbol, index) => {
    const newIndex = (index + shift) % array.length;
    return array[newIndex].toLowerCase();
  });
};

module.exports = {
  shiftArray,
};
