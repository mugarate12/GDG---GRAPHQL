// configuração inicial do meu server

// imports
const express = require('express');
const graphQLHTTP = require('express-graphql');

// meus imports
const schema = require('./graphql/schema');
const db = require('./models/dbConnection');
const extractJwtMiddleware = require('./middlewares/extract-jwt');
const cors = require('cors');

// criar instancia do servidor
let app = express();

// habilitar o cors
app.use(cors({
  origin: '*',
  methods: ['POST', 'GET'],
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Encoding'],
  preflightContinue: false
}));

// middlewares
app.use('/graphql',

  extractJwtMiddleware(),

  // aqui um middleware onde vou colocar o que precisar, como instancia do Banco e etc
  (req, res, next) => {

    // req['context'] = {};
    req['context'].db = db;

    next();

  },
  // retorno um objeto
  graphQLHTTP((req, res, next) => ({

    schema,
    // 1 == development, 0 == production
    graphiql: parseInt(process.env.NODE_ENV) === 1,
    context: req.context

  }))

);

// exportar meu server configurado
module.exports = app;