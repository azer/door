var debug = require("./debug")('cli'),
    fs = require('fs'),
    door  = require('../');

module.exports = cli;

function cli(argv){
  var port = argv.port || 8000,
      input = argv._[0];

  debug('New command to run Door with %s on %s', input, port);

  fs.writeFileSync('door.pid', process.pid);
  debug('pid (%s) written into shell-jobs.pid', process.pid);

  door(input, port);
}
