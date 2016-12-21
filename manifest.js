const PRODUCTION_ENV = (process.env.NODE_ENV === 'production');
if (!PRODUCTION_ENV) { require('dotenv').load(); }                             //eslint-disable-line global-require

const PORT = process.env.PORT || 3000;

const registrations = [];
const manifest = {
  registrations,
  connections: [{
    port: PORT,
    routes: {
      cors: { additionalHeaders: ['x-origin', 'if-modified-since'] },          // allow additional CORS headers
      state: { 'parse': false, 'failAction': 'ignore' }                        // ignore cookies
    }
  }]
};

const pegs = [
  'configure-http-agents',
  'initialize-rollbar',
  'initialize-opbeat',
  'ping',
  'report-uncaught-exceptions',
  'announce-server-ready'
];


registrations.push(...pegs.map((plugin) => {                                   // register pegs with the server
  return { 'plugin': `./${plugin}` };
}));


if (PRODUCTION_ENV) { registrations.push({ 'plugin': 'hapi-require-https' }); }// require http in production

module.exports = manifest;
