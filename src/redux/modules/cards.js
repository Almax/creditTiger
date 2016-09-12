const _R = require('ramda');

const creditCardList = require('../../data/creditCardList.json'); // json-loader

const issuerFn = ca => ca.issuerName;
const issuerList = _R.map(issuerFn, creditCardList);
const issuers = _R.uniq(issuerList);

const initialState = {
  'all': creditCardList,
  issuers
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
