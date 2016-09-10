var fs = require('fs-extra');
var csv = require('fast-csv');
var parse = require('csv-parse/lib/sync');
var _R = require('ramda');

var inputCsv = './scripts/creditCardList.csv';
var csvFile = fs.readFileSync(inputCsv, 'utf8');
var records = parse(csvFile, {columns: true});

var savedCards = [];

var cleanCard = (card) => {
}

records.forEach((row, index) => {
  if (row['useOnCt'] === '1') {
    savedCards.push(row);
  }
});

console.log(savedCards);