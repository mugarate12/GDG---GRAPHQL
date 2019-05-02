// importar minhas mutations
const { userMutations } = require('./resources/user/user.schema');

const Mutation = `

  type Mutation {

    ${userMutations}

  }

`;

module.exports = {

  Mutation

}