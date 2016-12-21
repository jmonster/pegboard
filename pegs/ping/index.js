exports.register = function (server, options, next) {

  const configuredPath = options.path || '/ping';

  server.route({
    method: 'get',
    path: configuredPath,
    handler: (request, reply) => {
      reply().code(200);
    }
  });

  next();
};

exports.register.attributes = {
  name: 'ping',
  version: '1'
};
