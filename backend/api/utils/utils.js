const normalizePort = (val) => {

  let port = (typeof val === 'string') ? parseInt(val) : val;

  // isNaN verifica se é ou não um número. Se for um número retorna FALSE se não for um número retorna TRUE
  // NaN significa nesse caso NOT A NUMBER
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;

}

const onError = (server) => {

  return (error) => {

    let port = server.address().port;

    if (error.syscall !== 'listen') throw error;
    let bind = (typeof port === 'string') ? `pipe ${port}` : `port ${port}`;

    switch (error.code) {

      case 'EACCES':

        console.error(`${bind} requires elevated privilages`);
        process.exit(1);
        break;

      case 'EADDRINUSE':

        console.error(`${bind} is already in use`);
        process.exit(1);
        break;

      default:
        throw error;
    }

  }

}

const onListening = (server) => {

  return () => {

    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;

    console.log("\x1b[33m%s\x1b[0m", `\nListening at ${bind}...`);

  }

}

module.exports = {

  normalizePort,
  onError,
  onListening

}