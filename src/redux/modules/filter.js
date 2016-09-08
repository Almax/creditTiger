const initialState = {
  pointMinimumFilter: 0,
  noFteOnly: false,
  onlyShowIssuer: {}
};

const POINT_FILTER = 'SET_POINT_FILTER';
const FTE_FILTER = 'SET_FTE_FILTER';
const ANNUAL_FEE_CHANGE = 'SET_ANNUAL_FEE_FILTER';
const ONLY_SHOW_ISSUER_FILTER = 'SET_ONLY_SHOW_ISSUER_FILTER';

export default function reducer(state = initialState, action = {}) {
  const issuerName = action.issuerName;
  switch (action.type) {
    case POINT_FILTER:
      return Object.assign({}, state, {
        pointMinimumFilter: action.value
      });
    case FTE_FILTER:
      return {
        ...state,
        noFteOnly: action.bool
      };
    case ANNUAL_FEE_CHANGE:
      return {
        ...state,
        noAnnualFeeOnly: action.bool
      };
    case ONLY_SHOW_ISSUER_FILTER:
      const newIssuerFilter = Object.assign({}, state.onlyShowIssuer, {
        [issuerName]: action.bool
      });
      return {
        ...state,
        onlyShowIssuer: newIssuerFilter
      };
    default:
      return state;
  }
}

export function sliderValueChange(value) {
  return {
    type: POINT_FILTER,
    value
  };
}

export function fteBoxChange(bool) {
  return {
    type: FTE_FILTER,
    bool
  };
}

export function annualFeeChange(bool) {
  return {
    type: ANNUAL_FEE_CHANGE,
    bool
  };
}

export function issuerBoxChange(issuerName, bool) {
  return {
    type: ONLY_SHOW_ISSUER_FILTER,
    issuerName,
    bool
  };
}
