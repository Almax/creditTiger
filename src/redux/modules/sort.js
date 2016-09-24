const OVERALL = 'OVERALL';

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
    default:
      return state;
  }
}

export function sortOverall() {
  return {
    type: OVERALL
  }
}

export function sortOverall() {
  return {
    type: OVERALL
  }
}

