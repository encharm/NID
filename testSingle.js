#!/usr/bin/env node
var NID = require('./');
var fs = require('fs');
var util = require('util');

console.log(util.inspect(NID.parse(fs.readFileSync(process.argv[2], 'utf8')), false, null));