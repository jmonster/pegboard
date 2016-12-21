const pkg = require('../../package.json');
const Chalk = require('chalk');

exports.register = (server, options, next) => {
  server.ext('onPostStart', (server, next) => {
    console.log(`${Chalk.yellow.bold(pkg.name)} running at: ${Chalk.blue(server.info.uri)}`);
    next();
  });

  next();
};

exports.register.attributes = {
  name: 'announce-server-ready',
  version: '1'
};
