// importar minhas mutations
const { userMutations } = require('./resources/user/user.schema');
const { postMutations } = require('./resources/post/post.schema');

const Mutation = `

  type Mutation {

    ${userMutations}
    ${postMutations}

  }

`;

module.exports = {

  Mutation

}