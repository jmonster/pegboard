const ROLLBAR_SERVER_ITEM_ACCESS_TOKEN = process.env.ROLLBAR_SERVER_ITEM_ACCESS_TOKEN;
const Chalk = require('chalk');

function catcher (server, next) {
  let rollbar = server.plugins.icecreambar.default;
  rollbar.handleUncaughtExceptions(ROLLBAR_SERVER_ITEM_ACCESS_TOKEN, { exitOnUncaughtException: true });

  next();
};

exports.register = (server, options, next) => {
  server.ext('onPreStart', (server, next) => {
    if (ROLLBAR_SERVER_ITEM_ACCESS_TOKEN) {
      server.dependency('icecreambar', catcher);
    } else {
      console.warn(`rollbar is ${Chalk.red.bold('inactive')}.`);
    }

    next();
  });

  next();
}

exports.register.attributes = {
  name: 'report-uncaught-exceptions',
  version: '1'
};
