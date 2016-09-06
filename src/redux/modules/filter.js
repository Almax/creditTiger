const initialState = {
  pointMinimumFilter: 0,
  noFteOnly: false
};

const POINT_FILTER = 'SET_POINT_FILTER';
const FTE_FILTER = 'SET_FTE_FILTER';

export default function reducer(state = initialState, action = {}) {
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
    default:
      return state;
  }
}

export function sliderValueChange(value) {
  return {
    type: POINT_FILTER,
    value: value
  };
}

export function fteBoxChange(bool) {
  return {
    type: FTE_FILTER,
    bool: bool
  };
}
