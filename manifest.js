const PRODUCTION_ENV = (process.env.NODE_ENV === 'production');

// load .env file
if (!PRODUCTION_ENV) { require('dotenv').config({silent: true}) } // eslint-disable-line global-require

// set the listening port
const PORT = process.env.PORT || 3000;

// configure hapi
const registrations = [];
const manifest = {
  registrations,
  connections: [{
    port: PORT,
    routes: {
      cors: { additionalHeaders: ['x-origin', 'if-modified-since'] }, // allow additional CORS headers
      state: { 'parse': false, 'failAction': 'ignore' } // ignore cookies
    }
  }]
};

// enumerate plugins
const pegs = [
  'configure-http-agents',
  'initialize-rollbar',
  'ping',
  'report-uncaught-exceptions',
  'announce-server-ready'
];


// register pegs with the server
registrations.push(...pegs.map((plugin) => {
  return { 'plugin': `./${plugin}` };
}));


if (PRODUCTION_ENV) { registrations.push({ 'plugin': 'hapi-require-https' }); }// require http in production

module.exports = manifest;
