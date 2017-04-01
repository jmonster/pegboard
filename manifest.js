const fs = require('fs')
const path = require('path')

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

// register pegs with the server
const pegs = fs.readdirSync(path.resolve('./pegs'));
registrations.push(...pegs.map((plugin) => {
  return { 'plugin': `./${plugin}` };
}));

// require http in production
if (PRODUCTION_ENV) { registrations.push({ 'plugin': 'hapi-require-https' }); }

module.exports = manifest;
