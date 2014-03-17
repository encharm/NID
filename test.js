var NID = require('./');
var fs = require('fs');
var path = require('path');

var assert = require('chai').assert;
var jsYaml = require('js-yaml');

assert.deepEqualIgnoreOrder = function(actual, expected, message) {
  var sortObjectKeys = function(unsortedObject) {
    if (typeof unsortedObject !== 'object') {
      return unsortedObject;
    }
    var sortedObject = {};
    Object.keys(unsortedObject).sort().forEach(function(k) {
      sortedObject[k] = sortObjectKeys(unsortedObject[k]);
    });
    return sortedObject;
  };

  assert.deepEqual(sortObjectKeys(actual), sortObjectKeys(expected), message);
};

describe('parser', function() {

  var files = fs.readdirSync('tests');
  files.forEach(function(file) {
    if(!file.match(/\.nid$/))
      return;

    var inFile = path.join('tests', file);
    var template = fs.readFileSync(inFile).toString('utf8');

    var shouldEqual = fs.readFileSync(inFile+'.out').toString('utf8');
    
    it('should parse: ' + file.replace(/_/g/ ' '), function() {
      var parseObject = NID.parse(template);
      var shouldEqualObject = jsYaml.safeLoad(shouldEqual);

      assert.deepEqualIgnoreOrder(parseObject, shouldEqualObject);
    });
    
  });
});

