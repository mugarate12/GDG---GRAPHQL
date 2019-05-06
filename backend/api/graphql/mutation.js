// importar minhas mutations
const { userMutations } = require('./resources/user/user.schema');
const { postMutations } = require('./resources/post/post.schema');
const { friendMutations } = require('./resources/friend/friend.schema');
const { likeMutations } = require('./resources/like/like.schema');

const Mutation = `

  type Mutation {

    ${userMutations}
    ${postMutations}
    ${friendMutations}

  }

`;

module.exports = {

  Mutation

}