var puts = require('util').puts,
    pkg = require('../package.json');

module.exports = version;

function version(){
  puts('\n  ' + pkg.name + ' ' + pkg.version + '\n');
  process.exit(0);
}
