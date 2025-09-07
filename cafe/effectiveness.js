const checkEffectivenessName = (inputName) => {
  return !inputName;
};
const checkEffectivenessNumber = (inputNumber) => {
  return !inputNumber || inputNumber < 0 || isNaN(inputNumber);
};
const checkEffectivenessKcal = (inputKcal) => {
  return !inputKcal || inputKcal < 0 || isNaN(inputKcal);
};
const isInclude = (text, positions) => {
  return !positions.includes(text);
};
module.exports = {
  checkEffectivenessName,
  checkEffectivenessNumber,
  checkEffectivenessKcal,
  isInclude,
};
