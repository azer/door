var fs   = require("fs"),
    puts = require('util').puts;

module.exports = function(){
  process.stdout.write('\u001B[2J\u001B[0;0f');
  var man = fs.readFileSync(__dirname + '/../docs/man');
  puts(man);
  process.exit(0);
};
