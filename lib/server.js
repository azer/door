var debug     = require("./debug")('server'),
    proxy     = require('http-proxy'),
    onRequest = require('./on-request'),
    table     = require('./table');

module.exports = start;

function start(filename, port){
  debug('Starting server on %s', port);
  table.filename(filename);
  proxy.createServer(onRequest).listen(port);
}
