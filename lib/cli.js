var debug = require("./debug")('cli'),
    door  = require('../');

module.exports = cli;

function cli(argv){
  var port = argv.port || 8000,
      input = argv._[0];

  debug('New command to run Door with %s on %s', input, port);

  door(input, port);
}
