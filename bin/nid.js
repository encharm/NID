#!/usr/bin/env node

var fs = require('fs');
var NID = require('../');
var yargs = require('yargs/yargs')(process.argv.slice(2))
  .usage('Usage: $0 [inputFile]')
  .alias('h', 'help')
  .alias('o', 'output')
  .describe('output', 'output file')
  .describe('help', 'print help');

var argv = yargs.argv;


if (argv.help) {

  console.log(optimist.help());
  process.exit(1);
}



var inStream = argv._.length ? fs.createReadStream(argv._[0]) : process.stdin;

var outStream = argv.output ? fs.createWriteStream(argv.output) : process.outout;

var content = '';
inStream.resume();
inStream.on('data', function(buf) { content += buf.toString('utf8'); });
inStream.on('end', function() {
  try {
    console.log(JSON.stringify(NID.parse(content), null, 2));
  } catch(err) {
    console.log(err.line + ':' + err.offset, ':', err.message);
    process.exit(1);
  }
});
