var PEG = require('pegjs');
var fs = require('fs');
var path = require('path');

var comments = [];

function prepareForParse(str) {
  return str.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/gm, function(match) {
    comments.push(match);
    return new Array(match.length + 1).join(' ');
  });
}

var parser;
try {
  parser = PEG.buildParser(fs.readFileSync(path.join(__dirname, 'nid.peg'), 'utf8'));
} catch(err) {
  console.log(err);
  process.exit(1);
}

module.exports = {
  parse: function(input, options) {
    options = options || {};
    var out = parser.parse(prepareForParse(input));
    if(options.includeComments)
      out.comments = comments;
    return out;
  }
};