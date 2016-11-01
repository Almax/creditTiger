const pointPrograms = require('../../data/point_program_map.json'); // json-loader

const initialState = {
  pointPrograms
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
