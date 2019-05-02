// imports
const { makeExecutableSchema } = require('graphql-tools');

// imports gerais dos modelos de Query e Mutation
const { Query } = require('./query');
const { Mutation } = require('./mutation');

// meus types
const { userTypes } = require('./resources/user/user.schema');

// meus resolvers

// junção de todos os resolvers
const resolvers = {};

// definição generica do schema, essa já englobando todos acima(que vão estar, calma)
const SchemaDefinition = `

  type Schema {

    query: Query
    mutation: Mutation

  }

`;

module.exports = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Query,
    Mutation,
    userTypes
  ],
  // resolvers
});