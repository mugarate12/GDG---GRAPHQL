// configuração inicial do meu server

// imports
const express = require('express');
const graphQLHTTP = require('express-graphql');

// meus imports
const schema = require('./graphql/schema');

// criar instancia do servidor
let app = express();

// middlewares
app.use('/graphql',

  // aqui um middleware onde vou colocar o que precisar, como instancia do Banco e etc
  (req, res, next) => {

    next();

  },
  // retorno um objeto
  graphQLHTTP((req, res, next) => ({

    schema,
    graphiql: true

  }))

)

// exportar meu server configurado
module.exports = app;