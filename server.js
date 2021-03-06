const Hapi = require('@hapi/hapi');
const Jwt = require('hapi-auth-jwt2');
const AuthService = require('./services/auth');

require('dotenv').config();

const init = async (port) => {

    const server = new Hapi.server({
        port: process.env.PORT || port || 3001,
        routes: {
            cors: true
        }
    });

    await server.register(Jwt);

    await server.auth.strategy('jwt', 'jwt', {
        key: process.env.TOKEN_SECRET,
        validate: AuthService.validateToken,
        verifyOptions: { algorithms: ['HS256'] }
    });

    server.auth.default('jwt');

    await server.register({
        plugin: require('hapi-router'),
        options: {
            routes: 'routes/*.js'
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);

    return server;

};

module.exports = init;