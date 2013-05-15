var debug          = require("./debug")('on-request'),
    tableAttr      = require('./table'),
    newProxyBuffer = require('http-proxy').buffer,
    table          = tableAttr();

tableAttr.subscribe(function(update){
  debug('Proxy table got updated.');
  table = update;
});

module.exports = onRequest;

function onRequest(req, res, proxy) {

  var buffer = newProxyBuffer(req),
      host   = req.headers.host,
      url    = req.url,
      route  = table && table.route[host],
      server = table && table.servers[host];

  debug('New request to %s', host);

  if ( !route && table.route['*'] ) {
    route = table.route['*'];
  }

  if ( route ) {
    debug('Proxying %s/%s to %s', host, url, route);
    route = route.split(/:(?!\/)/);

    proxy.proxyRequest(req, res, {
      host: route[0],
      port: route[1] || 80,
      buffer: buffer
    });

    return;
  }

  if ( server ) {
    debug('Serving %s/%s', host, url);

    server(req, res, function(){
      debug('Not found', url);
      res.end('not found');
    });

    return;
  }

  debug('Unable to route or serve %s/%s', host, url);

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end('{ "error": "Unable to route or serve", "host": "' + host + '", "path": "' + url + '" }');

}
