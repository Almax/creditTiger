var fs = require('fs-extra');
var parse = require('csv-parse/lib/sync');
var JSON3 = require('json3');

var INPUT_CSV = './scripts/pointMap/point_map.csv';

var OUTPUT_JSON = './src/data/point_program_map.json';
var csvFile = fs.readFileSync(INPUT_CSV, 'utf8');
var records = parse(csvFile, {columns: true});

var pointPrograms = {};

records.forEach((row, index) => {
  var pointKey = row['pointKey'];
  pointPrograms[pointKey] = row;
});

savedPointProgramsJson = JSON3.stringify(pointPrograms, null, 2);

fs.outputFileSync(OUTPUT_JSON, savedPointProgramsJson);
