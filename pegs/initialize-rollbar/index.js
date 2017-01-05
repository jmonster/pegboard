const ROLLBAR_SERVER_ITEM_ACCESS_TOKEN = process.env.ROLLBAR_SERVER_ITEM_ACCESS_TOKEN;
const Chalk = require('chalk');

exports.register = (server, options, next) => {
  server.ext('onPreStart', (server, next) => {
    if (ROLLBAR_SERVER_ITEM_ACCESS_TOKEN) {
      server.register({
        'register': require('icecreambar'),
        'options': {
          'accessToken': ROLLBAR_SERVER_ITEM_ACCESS_TOKEN,
          'scrubHeaders': ['authorization', 'referer'],
          'omittedResponseCodes': [401, 404]
        }
      });
    } else {
      console.warn(`icecreambar is ${Chalk.red.bold('inactive')}.`);
    }

    next();
  });

  next();
}

exports.register.attributes = {
  name: 'initialize-rollbar',
  version: '1'
};
