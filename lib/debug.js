var debug  = require("debug"),
    prefix = require('../package.json').name;

module.exports = function(name){
  return debug(prefix + ':' + name);
};
