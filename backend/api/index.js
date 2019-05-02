// inicialização do servidor

// imports
const http = require('http');

// meus imports
const app = require('./app');
const {
  normalizePort,
  onError,
  onListening
} = require('./utils/utils');

// criando servidor e passando a porta
let server = http.createServer(app);
const port = normalizePort(process.env.port || 3000);

// rodar
server.listen(port);
server.on('error', onError(server));
server.on('listening', onListening(server));

