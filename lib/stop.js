var debug = require("./debug")('stop'),
    fs    = require('fs');

module.exports = kill;

function kill(){
  var pid = findPid();

  if(!pid) {
    debug('Couldn\'t find door.pid on the working directory.');
    process.stdout.write('\n\n');
    process.exit(1);
    return;
  }

  debug('Stopping %s', pid);

  try {
    process.kill(pid);
    fs.unlinkSync('./door.pid');
  } catch(error){
    debug('Failed to kill %s: %s', pid, error);
  }

  process.stdout.write('\n\n');

  process.exit(1);
}


function findPid(){
  try {
    return fs.readFileSync('door.pid').toString();
  } catch( readError ){
  }
}
