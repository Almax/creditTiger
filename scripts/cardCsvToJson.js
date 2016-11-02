var fs = require('fs-extra');
var parse = require('csv-parse/lib/sync');
var _R = require('ramda');
var JSON3 = require('json3');
var _C = require('./helpers/converters.js');

var INPUT_CSV = './scripts/cardCsvToJson/credit_card_list.csv';
var OUTPUT_JSON = './src/data/credit_card_list.json';
var csvFile = fs.readFileSync(INPUT_CSV, 'utf8');
var records = parse(csvFile, {columns: true});

var cardKeyFormats = [
  {
    fieldName: 'cardName',
    fieldTypeFn: String
  },
  {
    fieldName: 'issuerName',
    fieldTypeFn: String
  },
  {
    fieldName: 'rewardProvider',
    fieldTypeFn: String
  },
  {
    fieldName: 'curBonusPts',
    fieldTypeFn: Number
  },
  {
    fieldName: 'centValueOfPoint',
    fieldTypeFn: _C.convertFloat
  },
  {
    fieldName: 'curPointBonusVal',
    fieldTypeFn: Number
  },
  {
    fieldName: 'curBonusVal',
    fieldTypeFn: Number
  },
  {
    fieldName: 'travelConvRate',
    fieldTypeFn: Number
  },
  {
    fieldName: 'otherPerks',
    fieldTypeFn: String
  },
  {
    fieldName: 'otherPerksTravelCashVal',
    fieldTypeFn: Number
  },
  {
    fieldName: 'minSpendVal',
    fieldTypeFn: Number
  },
  {
    fieldName: 'minSpendMonths',
    fieldTypeFn: Number
  },
  {
    fieldName: 'annualFee',
    fieldTypeFn: Number
  },
  {
    fieldName: 'annualFeeWaived',
    fieldTypeFn: _C.convertBool
  },
  {
    fieldName: 'personalOrBiz',
    fieldTypeFn: String
  },
  {
    fieldName: 'ftf',
    fieldTypeFn: _C.convertFloat
  },
  {
    fieldName: 'signupUrl',
    fieldTypeFn: String
  },  {
    fieldName: 'useOnCt',
    fieldTypeFn: String
  },
  {
    fieldName: 'curBonusPrctl',
    fieldTypeFn: Number
  },
  {
    fieldName: 'minSpendPrctl',
    fieldTypeFn: Number
  },
  {
    fieldName: 'annualFeePrctl',
    fieldTypeFn: Number
  },
  {
    fieldName: 'overallRank',
    fieldTypeFn: Number
  }
];

var issuerAbbv = {
  'Amex': 'amex',
  'Bank of America': 'boa',
  'Barclays': 'barc',
  'BBVA Compass': 'bbva',
  'Capital One': 'capital_one',
  'Chase': 'chase',
  'Citi': 'citi',
  'Comenity Capital': 'comenity',
  'Discover': 'discover',
  'TD bank': 'td',
  'US Bank': 'us_bank',
  'Wells Fargo': 'wells_fargo'
};

var personalOrBizAbbv = {
  'Personal': 'per',
  'Business': 'biz'
}

var validateNumberOfKeys = (formats, card) => {
  if (formats.length !== _R.keys(card).length) {
    throw new Error('Wrong number of keys');
  }
}

var convertType = (value, convertTo) => {
  return convertTo(value);
}

var createCardKey = (card) => {
  var issuer = card['issuerName'];
  var issuerKey = issuerAbbv[issuer];

  var personalOrBiz = card['personalOrBiz'];
  var personalOrBizKey = personalOrBizAbbv[personalOrBiz];

  var cardName = card['cardName'];
  var cardNameKey = cardName.replace(/ /g , '_').toLowerCase();

  var cardKeyList = [issuerKey, personalOrBizKey, cardNameKey];

  return cardKeyList.join('_');
}

var cleanCard = (card) => {
  var cleanedCard = {};

  try {
    validateNumberOfKeys(cardKeyFormats, card);
  } catch(err) {
    console.log('Error validating number of keys');
    console.log(err);
  }

  try {
    cardKeyFormats.forEach((cardPair) => {
      var fieldName = cardPair['fieldName'];
      var fieldTypeFn = cardPair['fieldTypeFn'];

      var newVal = fieldTypeFn(card[fieldName]);

      if (newVal !== newVal || newVal === undefined) {
        throw new Error('Error on field ' + fieldName);
      }

      cleanedCard[fieldName] = newVal;
    });

    var cardKey = createCardKey(cleanedCard);
    cleanedCard['cardKey'] = cardKey;
    cleanedCard['canConvToCash'] = cleanedCard['travelConvRate'] > 0;
  } catch(err) {
    console.log('Error converting type for card', card);
    console.log(err);
  }

  return cleanedCard;
}

var savedCards = [];

records.forEach((row, index) => {
  if (row['useOnCt'] === 'Yes') {
    var cleanedCard = cleanCard(row);
    savedCards.push(cleanedCard);
  }
});

savedCardsJson = JSON3.stringify(savedCards, null, 2);

fs.outputFileSync(OUTPUT_JSON, savedCardsJson);
