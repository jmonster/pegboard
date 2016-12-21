const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const Plugin = require('../pegs/ping/index');

const expect = Code.expect;
const lab = exports.lab = Lab.script();

lab.experiment('ping', () => {
  let server;

  lab.beforeEach((done) => {
    server = new Hapi.Server();
    server.connection({});
    server.register(Plugin, done);
  });

  lab.test('responds with a 200 status', (done) => {
    server.inject('/ping', (response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

lab.experiment('ping-custom', () => {
  let server;

  lab.beforeEach((done) => {
    server = new Hapi.Server();
    server.connection({});
    server.register({ register: Plugin, options: { path: '/foo' }}, done);
  });

  lab.test('responds with a 200 status', (done) => {
    server.inject('/foo', (response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});
