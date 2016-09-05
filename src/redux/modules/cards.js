const initialState = [
  {
    issuer: 'AMEX',
    cardName: 'Platinum',
    currentBonus: '40000',
    AFWaived: false
  },
  {
    issuer: 'AMEX',
    cardName: 'Gold Delta',
    currentBonus: '30000',
    AFWaived: true
  },
  {
    issuer: 'Bank of America',
    cardName: 'Alaska',
    currentBonus: '25000',
    AFWaived: false
  }
];

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
