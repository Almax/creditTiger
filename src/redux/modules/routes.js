const countryAwardRoutes = require('../../data/country_award_routes.json'); // json-loader
const countryCashRoutes = require('../../data/country_cash_routes.json'); // json-loader

const initialState = {
  countryAwardRoutes,
  countryCashRoutes
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
