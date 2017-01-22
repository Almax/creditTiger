import _R from 'ramda';

const countryNameToKey = (countryName) => {
  return _R.replace(/\s/g, '_', countryName).toLowerCase();
};

const keyToCountryName = (countryKey) => {
  const withSpaces = _R.replace(/_/g, ' ', countryKey);
  return withSpaces.replace(/\w\S*/g, (txt) => {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

const countryNameToUrlName = (countryName) => {
  return _R.replace(/\s/g, '-', countryName);
};

const urlNameToCountryName = (urlName) => {
  return _R.replace(/-/g, ' ', urlName);
};

module.exports = Object.assign({
  countryNameToKey,
  keyToCountryName,
  countryNameToUrlName,
  urlNameToCountryName
});
