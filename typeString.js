var typeString = module.exports = function(obj, options) {
  var type = obj.type || obj;
  options = options || {};

  var pointer = type.pointer || '';
  if(options === '*') {
    pointer = pointer.replace(options, '');
  }
  var str = type.name + pointer;

  var parameters = ((obj.type && obj.type.parameters)  ? (obj.type.parameters) : obj.parameters);

  if(type.name.match(/\*/) && !options.onlyParameters) {
    if(options.param) {
      return type.name.replace('(*)', '(*' + options.param + ')');
    }

    return type.name;
  }


  if((!obj.functionPointer || options.onlyReturn) && !options.forceParams )  {
    return str + (options.param?(' ' + options.param ):'');
  }

  if(!parameters) {
    return str;
  }

  if(options.onlyParameters) {
    str = "";
  }
  else {
    str += '(*' + (options.param || '' )+ ')';
  }

  str += '(';

  str += parameters.map(function(parameter) {
    return typeString(parameter.type) + (options.withNames?' ' + parameter.name:'');
  }).join(',');

  return str + ')';
};