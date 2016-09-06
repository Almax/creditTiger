const initialState = {
  pointMinimumFilter: 0
};

const FILTER = 'SET_FILTER';

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FILTER:
      console.log('assigning filter');
      return Object.assign({}, state, {
        pointMinimumFilter: action.value
      });
    default:
      console.log('reduced');
      return state;
  }
}

export function sliderValueChange(value) {
  console.log('sliderValueChange', value);
  return {
    type: FILTER,
    value: value
  };
}
