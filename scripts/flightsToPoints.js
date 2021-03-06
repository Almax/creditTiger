var fs = require('fs-extra');
var parse = require('csv-parse/lib/sync');
var _R = require('ramda');
var JSON3 = require('json3');

var FLIGHTS_TO_POINTS_DIR = './scripts/flightsToPoints/';

var AIRPORT_MAP_CSV = FLIGHTS_TO_POINTS_DIR + 'airport_map.csv';
var POINT_CONV_MAP_CSV = FLIGHTS_TO_POINTS_DIR + 'point_conv_map.csv';
var ROUTE_POINT_LIST_CSV = FLIGHTS_TO_POINTS_DIR + 'route_point_list.csv';

var OUTPUT_COUNTRY_AWARD_ROUTE_JSON = './src/data/country_award_routes.json';
var OUTPUT_COUNTRY_CASH_ROUTE_JSON = './src/data/country_cash_routes.json';
var OUTPUT_CONTINENTS_WITH_COUNTRIES_JSON = './src/data/continents_with_countries.json';

var NUM_AWARD_ROUTE_PER_COUNTRY = 3;
var NUM_CASH_ROUTE_PER_COUNTRY = 3;

var airportMapCsv = fs.readFileSync(AIRPORT_MAP_CSV, 'utf8');
var airportMapRecords = parse(airportMapCsv, {columns: true});

var airportMap = {};

airportMapRecords.forEach((row, index) => {
  var ticker = row['airportTicker'];
  airportMap[ticker] = row;
});

var pointConvMapCsv= fs.readFileSync(POINT_CONV_MAP_CSV, 'utf8');
var pointConvMapRecords = parse(pointConvMapCsv, {columns: true});

var pointConv = {};

pointConvMapRecords.forEach((row, index) => {
  var transfersToType = row['transfersToType'];
  var originalType = row['originalType'];

  pointConv[transfersToType] = Object.assign({}, pointConv[transfersToType], {
    [originalType]: row
  });
});

var routePointListCsv= fs.readFileSync(ROUTE_POINT_LIST_CSV, 'utf8');
var routePointListRecords = parse(routePointListCsv, {columns: true});

var routePointList = [];
var routeCashList = [];
var continentsWithCountries = {};

routePointListRecords.forEach((row, index) => {
  var numberOfPointsReq = Number(row['numberOfPointsReq']);
  var cashReq = Number(row['cashReq']);
  var arrivingAirportTicker = row['arrivingAirportTicker'];
  var arrivingAirportDetails = airportMap[arrivingAirportTicker];
  var originalPointType = row['pointType'];
  var isCashRoute = row['isCashRoute'] === 'TRUE';
  var roundTripReq = row['roundTripReq'] === 'TRUE';
  var converted = false;
  var route = Object.assign({}, row, {
    numberOfPointsReq,
    cashReq,
    arrivingAirportDetails,
    originalPointType,
    isCashRoute,
    roundTripReq,
    converted
  });

  var continentName = route['arrivingAirportDetails']['continentName'];
  var countryName = route['arrivingAirportDetails']['countryName'];
  if (!continentsWithCountries[continentName]) {
    continentsWithCountries[continentName] = [];
  }
  continentsWithCountries[continentName].push(countryName);

  if (originalPointType === 'Cash') {
    routeCashList.push(route);
  } else {
    routePointList.push(route);
  }
});

for (var continentName in continentsWithCountries) {
  continentsWithCountries[continentName] = _R.uniq(continentsWithCountries[continentName]);
  continentsWithCountries[continentName].sort();
}

var routePointListWithConversions = [];

// might not need to recurse through multiple levels. i think they will only ever convert one level.

routePointList.forEach((row, index) => {
  var pointType = row['pointType'];

  var alternatePointTypes = pointConv[pointType];

  if (alternatePointTypes && Object.keys(alternatePointTypes).length) {
    for (var key in alternatePointTypes) {
      var pointConversion = alternatePointTypes[key]

      // old original type is now the current pointType
      var pointType = pointConversion['originalType'];
      var conversionRate = pointConversion['rate'];
      var numberOfPointsReq = row['numberOfPointsReq'] / conversionRate;
      var converted = true;

      var newRoute = Object.assign({}, row, {
        pointConversion,
        pointType,
        converted,
        numberOfPointsReq
      });

      routePointListWithConversions.push(newRoute);
    }
  }
});

routePointListWithConversions = _R.concat(routePointListWithConversions, routePointList);

var routePointByCountry = {};

routePointListWithConversions.forEach((route, index) => {
  var country = route['arrivingAirportDetails']['countryName'];
  var pointType = route['pointType'];

  // FIX THIS
  if (!routePointByCountry[country]) {
    routePointByCountry[country] = {};
  }

  // FIX THIS
  if (!routePointByCountry[country][pointType]) {
    routePointByCountry[country][pointType] = []
  }

  routePointByCountry[country][pointType].push(route);
});

for (var country in routePointByCountry) {
  for (var pointType in routePointByCountry[country]) {
    routePointByCountry[country][pointType].sort((ca, cb) => { return (ca.numberOfPointsReq - cb.numberOfPointsReq);});
    routePointByCountry[country][pointType].splice(NUM_AWARD_ROUTE_PER_COUNTRY);
  }
  // console.log(routePointByCountry[country]);
}

var routeCashByCountry = {};

routeCashList.forEach((route, index) => {
  var country = route['arrivingAirportDetails']['countryName'];

  // FIX THIS
  if (!routeCashByCountry[country]) {
    routeCashByCountry[country] = [];
  }

  routeCashByCountry[country].push(route);
});

for (var country in routeCashByCountry) {
  routeCashByCountry[country].sort((ca, cb) => { return (ca.cashReq - cb.cashReq);});
  routeCashByCountry[country].splice(NUM_CASH_ROUTE_PER_COUNTRY);
}

savedRoutesPointsJson = JSON3.stringify(routePointByCountry, null, 2);
savedRoutesCashJson = JSON3.stringify(routeCashByCountry, null, 2);
savedContinentsWithCountries = JSON3.stringify(continentsWithCountries, null, 2);

fs.outputFileSync(OUTPUT_COUNTRY_AWARD_ROUTE_JSON, savedRoutesPointsJson);
fs.outputFileSync(OUTPUT_COUNTRY_CASH_ROUTE_JSON, savedRoutesCashJson);
fs.outputFileSync(OUTPUT_CONTINENTS_WITH_COUNTRIES_JSON, savedContinentsWithCountries);

