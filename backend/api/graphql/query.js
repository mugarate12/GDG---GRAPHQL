// importar minhas queries
const { userQueries } = require('./resources/user/user.schema');
const { postQueries } = require('./resources/post/post.schema');

const Query = `

  type Query {

    ${userQueries}
    ${postQueries}

  }

`;

module.exports = {

  Query

};