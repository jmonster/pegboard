const MAX_SOCKETS = process.env.MAX_SOCKETS || 8000;
const KEEP_ALIVE = process.env.KEEP_ALIVE || true;
const KEEP_ALIVE_MSECS = process.env.KEEP_ALIVE_MSECS || 5000;
const MAX_FREE_SOCKETS = process.env.MAX_FREE_SOCKETS || 512;

const http = require('http');
const https = require('https');

function configureAgent(agent) {
  agent.maxFreeSockets = MAX_FREE_SOCKETS;
  agent.maxSockets = MAX_SOCKETS;
  agent.keepAlive = KEEP_ALIVE;
  agent.keepAliveMsecs = KEEP_ALIVE_MSECS;
}

exports.register = (server, options, next) => {
  server.ext('onPreStart', (server, next) => {
    configureAgent(http.globalAgent);
    configureAgent(https.globalAgent);
    next();
  });

  next();
}

exports.register.attributes = {
  name: 'configure-http-agents',
  version: '1'
};
