import _R from 'ramda';

const countryNameToKey = (country) => {
  console.log('converting', _R.replace(/\s/g, '_', country));
};

module.exports = Object.assign({
  countryNameToKey
});
