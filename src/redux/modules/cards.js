const all = [
  {
    key: 'amex_per_gd',
    imageFullName: 'amex_per_gd.png',
    issuer: 'AMEX',
    cardName: 'Gold Delta',
    currentBonus: 30000,
    annualFeeWaived: true,
    fte: 0.0,
    bonusRewardValuePerc: 48,
    minSpendPerc: 73,
    annualFeePerc: 80
  },
  {
    key: 'amex_per_plat',
    imageFullName: 'amex_per_plat.jpg',
    issuer: 'AMEX',
    cardName: 'Platinum',
    currentBonus: 40000,
    annualFeeWaived: false,
    fte: 0.0,
    bonusRewardValuePerc: 100,
    minSpendPerc: 20,
    annualFeePerc: 5
  },
  {
    key: 'amex_per_spg',
    imageFullName: 'amex_per_spg.png',
    issuer: 'AMEX',
    cardName: 'Starwood Preferred Guest',
    currentBonus: 25000,
    annualFeeWaived: true,
    fte: 0.0,
    bonusRewardValuePerc: 82,
    minSpendPerc: 20,
    annualFeePerc: 80
  },
  {
    key: 'amex_per_hhonors',
    imageFullName: 'amex_per_hhonors.png',
    issuer: 'AMEX',
    cardName: 'HHonors',
    currentBonus: 50000,
    annualFeeWaived: true,
    fte: 0.027,
    bonusRewardValuePerc: 33,
    minSpendPerc: 73,
    annualFeePerc: 100
  },
  {
    key: 'boa_per_alaska',
    imageFullName: 'boa_per_alaska.png',
    issuer: 'Bank of America',
    cardName: 'Alaska',
    currentBonus: 25000,
    annualFeeWaived: false,
    fte: 0.03,
    bonusRewardValuePerc: 72,
    minSpendPerc: 73,
    annualFeePerc: 84
  },
  {
    key: 'barc_per_arrivalplus',
    imageFullName: 'barc_per_arrivalplus.png',
    issuer: 'Barclays',
    cardName: 'Arrival +',
    currentBonus: 40000,
    annualFeeWaived: true,
    fte: 0.0,
    bonusRewardValuePerc: 53,
    minSpendPerc: 20,
    annualFeePerc: 81
  },
  {
    key: 'chase_per_saphpref',
    imageFullName: 'chase_per_saphpref.jpg',
    issuer: 'Chase',
    cardName: 'Sapphire Preferred',
    currentBonus: 55000,
    annualFeeWaived: true,
    fte: 0.0,
    bonusRewardValuePerc: 100,
    minSpendPerc: 0,
    annualFeePerc: 80
  },
  {
    key: 'chase_per_swpref',
    imageFullName: 'chase_per_swpref.png',
    issuer: 'Chase',
    cardName: 'Southwest Preferred',
    currentBonus: 50000,
    annualFeeWaived: false,
    fte: 0.0,
    bonusRewardValuePerc: 99,
    minSpendPerc: 47,
    annualFeePerc: 79
  },
  {
    key: 'citi_per_aadvanplat',
    imageFullName: 'citi_per_aadvanplat.jpg',
    issuer: 'Citi',
    cardName: 'AAdvantage Platinum',
    currentBonus: 50000,
    annualFeeWaived: true,
    fte: 0.03,
    bonusRewardValuePerc: 99,
    minSpendPerc: 20,
    annualFeePerc: 80
  }
];

const issuers = [];
all.forEach( (val, key) => {
  const issuer = val.issuer;
  if (all[key + 1] && issuer !== all[key + 1].issuer) {
    issuers.push(issuer);
  }
});

const initialState = {
  all,
  issuers
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
