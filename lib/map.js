var debug  = require('./debug')('map'),
    buffet = require('buffet');

module.exports = map;

function map(table){
  var key, result;

  result = {
    route: {},
    servers: {}
  };

  for(key in table){

    if( ! isStatic(table, key) ){
      result.route[key] = ( table[key][0] == ':' ? '0.0.0.0' : '' ) + table[key];
      debug('%s is set to proxy to %s', key, result.route[key]);
      continue;
    }

    debug('%s is set to serve %s', key, table[key], key);
    result.servers[key] = buffet({ root: table[key] });
  }

  return result;
}

function isStatic(table, key){
  return /^\//.test(table[key]);
}
