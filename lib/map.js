var debug  = require('./debug')('map'),
    st = require('st');

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

    debug('%s is set to serve %s', key, table[key]);
    result.servers[key] = st({
      path  : table[key],
      url   : '/',
      index : 'index.html'
    });
  }

  return result;
}

function isStatic(table, key){
  return /^\//.test(table[key]);
}
