const OVERALL = 'SET_OVERALL';
const CONTINENT = 'SET_CONTINENT';

const continentRoutes = require('../../data/continent_award_routes.json'); // json-loader

const continentList = Object.keys(continentRoutes);

const initialState = {
  sortType: OVERALL,
  continentList
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case OVERALL:
      return {
        ...state,
        sortType: OVERALL
      };
    case CONTINENT:
      return {
        ...state,
        sortType: CONTINENT,
        continentName: action.continentName
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

export function sortContinent(continent, bool) {
  return {
    type: CONTINENT,
    continentName: continent,
    bool
  };
}

export function unsortContinent() {
  return {
    type: OVERALL
  };
}
