const Chalk = require('chalk');
const OpBeat = require('opbeat');

exports.register = (server, options, next) => {
  server.ext('onPreStart', (server, next) => {
    if (process.env.OPBEAT_SECRET_TOKEN &&
        process.env.OPBEAT_ORGANIZATION_ID &&
        process.env.OPBEAT_APP_ID)
    {
      OpBeat.start({
        filter(error, payload) {
          if (payload && payload.http && payload.http.headers) {
            delete payload.http.headers.authorization;
            delete payload.http.headers.referer;
          }

          return payload;
        }
      });
    } else {
      console.warn(`opbeat is ${Chalk.red.bold('inactive')}.`);
    }

    next();
  });

  next();
}

exports.register.attributes = {
  name: 'initialize-opbeat',
  version: '1'
};
