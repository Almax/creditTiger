const initialState = [
  {
    issuer: 'AMEX',
    cardName: 'Gold Delta',
    currentBonus: 30000,
    AFWaived: true,
    fte: 0.0
  },
  {
    issuer: 'AMEX',
    cardName: 'Platinum',
    currentBonus: 40000,
    AFWaived: false,
    fte: 0.0
  },
  {
    issuer: 'AMEX',
    cardName: 'Starwood Preferred Guest',
    currentBonus: 25000,
    AFWaived: true,
    fte: 0.0
  },
    {
    issuer: 'AMEX',
    cardName: 'HHonors',
    currentBonus: 50000,
    AFWaived: true,
    fte: 0.027
  },
  {
    issuer: 'Bank of America',
    cardName: 'Alaska',
    currentBonus: 25000,
    AFWaived: false,
    fte: 0.03
  },
  {
    issuer: 'Bank of America',
    cardName: 'Alaska',
    currentBonus: 25000,
    AFWaived: false,
    fte: 0.03
  },
  {
    issuer: 'Barclays',
    cardName: 'Arrival +',
    currentBonus: 40000,
    AFWaived: true,
    fte: 0.0
  },
  {
    issuer: 'Chase',
    cardName: 'Sapphire Preferred',
    currentBonus: 55000,
    AFWaived: true,
    fte: 0.0
  },
  {
    issuer: 'Chase',
    cardName: 'Southwest Preferred',
    currentBonus: 50000,
    AFWaived: false,
    fte: 0.0
  },
  {
    issuer: 'Citi',
    cardName: 'AAdvantage Platinum',
    currentBonus: 50000,
    AFWaived: true,
    fte: 0.03
  }
];

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
