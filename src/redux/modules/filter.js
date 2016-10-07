const initialState = {
  pointMinimumFilter: 0,
  noFteOnly: false,
  onlyShowIssuer: {},
  hiddenCardKeys: {},
  annualFeeWaivedOnly: false,
  annualFeeLess100Only: false,
  annualFee100MoreOnly: false
};

const POINT_FILTER = 'SET_POINT_FILTER';
const FTE_FILTER = 'SET_FTE_FILTER';
const ANNUAL_FEE_WAIVED_CHANGE = 'SET_ANNUAL_FEE_WAIVED_FILTER';
const ANNUAL_FEE_LESS_100_CHANGE = 'SET_ANNUAL_FEE_LESS_100_FILTER';
const ANNUAL_FEE_100_MORE_CHANGE = 'SET_ANNUAL_FEE_100_MORE_FILTER';
const ONLY_SHOW_ISSUER_FILTER = 'SET_ONLY_SHOW_ISSUER_FILTER';
const HIDE_CARD = 'HIDE_CARD';

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
    case ANNUAL_FEE_WAIVED_CHANGE:
      return {
        ...state,
        annualFeeWaivedOnly: action.bool
      };
    case ANNUAL_FEE_LESS_100_CHANGE:
      return {
        ...state,
        annualFeeLess100Only: action.bool
      };
    case ANNUAL_FEE_100_MORE_CHANGE:
      return {
        ...state,
        annualFee100MoreOnly: action.bool
      };
    case ONLY_SHOW_ISSUER_FILTER:
      const newIssuerFilter = Object.assign({}, state.onlyShowIssuer, {
        [issuerName]: action.bool
      });
      return {
        ...state,
        onlyShowIssuer: newIssuerFilter
      };
    case HIDE_CARD:
      const cardKey = action.cardKey;
      const newHiddenCardKeys = Object.assign({}, state.hiddenCardKeys, {
        [cardKey]: true
      });
      return {
        ...state,
        hiddenCardKeys: newHiddenCardKeys
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

export function annualFeeWaivedChange(bool) {
  console.log('annualFeeWaivedChange');
  return {
    type: ANNUAL_FEE_WAIVED_CHANGE,
    bool
  };
}

export function annualFeeLess100Change(bool) {
  return {
    type: ANNUAL_FEE_LESS_100_CHANGE,
    bool
  };
}

export function annualFee100MoreChange(bool) {
  return {
    type: ANNUAL_FEE_100_MORE_CHANGE,
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

export function hideCard(cardKey) {
  return {
    type: HIDE_CARD,
    cardKey
  };
}
