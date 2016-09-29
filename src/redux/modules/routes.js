const countryAwardRoutes = require('../../data/country_award_routes.json'); // json-loader
const countryCashRoutes = require('../../data/country_cash_routes.json'); // json-loader
const continentsWithCountries = require('../../data/continents_with_countries.json'); // json-loader

const initialState = {
  countryAwardRoutes,
  countryCashRoutes,
  continentsWithCountries
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
