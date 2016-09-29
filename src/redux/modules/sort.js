const OVERALL = 'SET_OVERALL';
const COUNTRY = 'SET_COUNTRY';

const countryRoutes = require('../../data/country_award_routes.json'); // json-loader

const countryList = Object.keys(countryRoutes);

const initialState = {
  sortType: OVERALL,
  countryList
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case OVERALL:
      return {
        ...state,
        sortType: OVERALL
      };
    case COUNTRY:
      return {
        ...state,
        sortType: COUNTRY,
        countryName: action.countryName
      };
    default:
      return state;
  }
}

export function sortOverall() {
  return {
    type: OVERALL
  };
}

export function sortCountry(country, bool) {
  return {
    type: COUNTRY,
    countryName: country,
    bool
  };
}

export function unsortCountry() {
  return {
    type: OVERALL
  };
}
