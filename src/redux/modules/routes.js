const continentAwardRoutes = require('../../data/continent_award_routes.json'); // json-loader
const continentCashRoutes = require('../../data/continent_cash_routes.json'); // json-loader

const initialState = {
  continentAwardRoutes,
  continentCashRoutes
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
