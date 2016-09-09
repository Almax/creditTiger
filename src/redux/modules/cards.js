const _R = require('ramda');

const all = [
  {
    cardKey: 'amex_per_gd',
    imageFullName: 'amex_per_gd.png',
    issuerName: 'AMEX',
    cardName: 'Gold Delta',
    currentBonus: 30000,
    annualFeeWaived: true,
    fte: 0.0,
    annualFee: 95.0,
    bonusRewardValuePerc: 48,
    minSpendPerc: 73,
    annualFeePerc: 80
  },
  {
    cardKey: 'amex_per_plat',
    imageFullName: 'amex_per_plat.jpg',
    issuerName: 'AMEX',
    cardName: 'Platinum',
    currentBonus: 40000,
    annualFeeWaived: false,
    fte: 0.0,
    annualFee: 450.0,
    bonusRewardValuePerc: 100,
    minSpendPerc: 20,
    annualFeePerc: 5
  },
  {
    cardKey: 'amex_per_spg',
    imageFullName: 'amex_per_spg.png',
    issuerName: 'AMEX',
    cardName: 'Starwood Preferred Guest',
    currentBonus: 25000,
    annualFeeWaived: true,
    fte: 0.0,
    annualFee: 95.0,
    bonusRewardValuePerc: 82,
    minSpendPerc: 20,
    annualFeePerc: 80
  },
  {
    cardKey: 'amex_per_hhonors',
    imageFullName: 'amex_per_hhonors.png',
    issuerName: 'AMEX',
    cardName: 'HHonors',
    currentBonus: 50000,
    annualFeeWaived: true,
    fte: 0.027,
    annualFee: 0.0,
    bonusRewardValuePerc: 33,
    minSpendPerc: 73,
    annualFeePerc: 100
  },
  {
    cardKey: 'boa_per_alaska',
    imageFullName: 'boa_per_alaska.png',
    issuerName: 'Bank of America',
    cardName: 'Alaska',
    currentBonus: 25000,
    annualFeeWaived: false,
    fte: 0.03,
    annualFee: 75.0,
    bonusRewardValuePerc: 72,
    minSpendPerc: 73,
    annualFeePerc: 84
  },
  {
    cardKey: 'barc_per_arrivalplus',
    imageFullName: 'barc_per_arrivalplus.png',
    issuerName: 'Barclays',
    cardName: 'Arrival +',
    currentBonus: 40000,
    annualFeeWaived: true,
    fte: 0.0,
    annualFee: 89.0,
    bonusRewardValuePerc: 53,
    minSpendPerc: 20,
    annualFeePerc: 81
  },
  {
    cardKey: 'chase_per_freedom',
    imageFullName: 'chase_per_freedom.png',
    issuerName: 'Chase',
    cardName: 'Freedom',
    currentBonus: 30000,
    annualFeeWaived: true,
    fte: 0.0,
    annualFee: 0.0,
    bonusRewardValuePerc: 41,
    minSpendPerc: 87,
    annualFeePerc: 100
  },
  {
    cardKey: 'chase_per_saphpref',
    imageFullName: 'chase_per_saphpref.jpg',
    issuerName: 'Chase',
    cardName: 'Sapphire Preferred',
    currentBonus: 55000,
    annualFeeWaived: true,
    fte: 0.0,
    annualFee: 95.0,
    bonusRewardValuePerc: 100,
    minSpendPerc: 0,
    annualFeePerc: 80
  },
  {
    cardKey: 'chase_per_swpref',
    imageFullName: 'chase_per_swpref.png',
    issuerName: 'Chase',
    cardName: 'Southwest Preferred',
    currentBonus: 50000,
    annualFeeWaived: false,
    fte: 0.0,
    annualFee: 99.0,
    bonusRewardValuePerc: 99,
    minSpendPerc: 47,
    annualFeePerc: 79
  },
  {
    cardKey: 'citi_per_aadvanplat',
    imageFullName: 'citi_per_aadvanplat.jpg',
    issuerName: 'Citi',
    cardName: 'AAdvantage Platinum',
    currentBonus: 50000,
    annualFeeWaived: true,
    fte: 0.03,
    annualFee: 95.0,
    bonusRewardValuePerc: 99,
    minSpendPerc: 20,
    annualFeePerc: 80
  },
  {
    cardKey: 'citi_per_prestige',
    imageFullName: 'citi_per_prestige.jpg',
    issuerName: 'Citi',
    cardName: 'Prestige',
    currentBonus: 50000,
    annualFeeWaived: false,
    fte: 0.00,
    annualFee: 450.0,
    bonusRewardValuePerc: 100,
    minSpendPerc: 47,
    annualFeePerc: 5
  },
  {
    cardKey: 'usbank_per_clubcarlson',
    imageFullName: 'usbank_per_clubcarlson.jpg',
    issuerName: 'US Bank',
    cardName: 'Club Carlson',
    currentBonus: 60000,
    annualFeeWaived: false,
    fte: 0.03,
    annualFee: 50.0,
    bonusRewardValuePerc: 32,
    minSpendPerc: 60,
    annualFeePerc: 89
  }
];

const issuerFn = ca => ca.issuerName;
const issuerList = _R.map(issuerFn, all);
const issuers = _R.uniq(issuerList);

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
