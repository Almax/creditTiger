import { countryNameToUrlName } from './Format';

const homeUrl = 'http://www.freetravelguy.com';

const flightsToUrl = (countryName = '') => {
  const urlCouName = countryNameToUrlName(countryName);
  return `/Best-Credit-Card-Offers-for-Flights-to-${urlCouName}`;
};

module.exports = Object.assign({
  homeUrl,
  flightsToUrl
});
