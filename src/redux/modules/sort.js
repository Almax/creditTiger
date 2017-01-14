const OVERALL = 'SET_OVERALL';
const COUNTRY = 'SET_COUNTRY';

const initialState = {
  sortType: COUNTRY,
  currentCountryName: '',
  currentNumCards: 0
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
        currentCountryName: action.currentCountryName
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
    currentCountryName: country,
    bool
  };
}

export function unsortCountry() {
  return {
    type: OVERALL
  };
}
