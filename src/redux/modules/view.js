const FILTER_MENU = 'SET_SHOW_FILTER_MENU';

const initialState = {
  showFilterMenu: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FILTER_MENU:
      return {
        ...state,
        showFilterMenu: action.bool
      };
    default:
      return state;
  }
}

export function toggleFilterMenu(bool) {
  return {
    type: FILTER_MENU,
    bool
  };
}
