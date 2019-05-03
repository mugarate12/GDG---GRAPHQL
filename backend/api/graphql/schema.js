// imports
const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');

// imports gerais dos modelos de Query e Mutation
const { Query } = require('./query');
const { Mutation } = require('./mutation');

// meus types
const { userTypes } = require('./resources/user/user.schema');
const { postTypes } = require('./resources/post/post.schema');

// meus resolvers
const userResolvers = require('./resources/user/user.resolvers');

// junção de todos os resolvers
const resolvers = merge(
  userResolvers
);

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
    userTypes,
    postTypes
  ],
  resolvers
});