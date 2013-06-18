var debug  = require('./lib/debug')('index'),
    server = require("./lib/server");

module.exports = server;

/*process.on('uncaughtException', function(err) {
  debug('Caught exception: ' + err);
});*/
