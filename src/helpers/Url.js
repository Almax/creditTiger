import { countryNameToUrlName } from './Format';

const homeUrl = 'http://www.freetravelguy.com';

const flightsToUrl = (countryName = '') => {
  const urlCouName = countryNameToUrlName(countryName);
  return `/Best-Credit-Card-Offers-for-Flights-to-${urlCouName}`;
};

const howToSignUpBonus = () => {
  return '/how-do-sign-up-bonuses-work';
};

module.exports = Object.assign({
  homeUrl,
  flightsToUrl,
  howToSignUpBonus
});
