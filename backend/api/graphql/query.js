// importar minhas queries
const { userQueries } = require('./resources/user/user.schema');
const { postQueries } = require('./resources/post/post.schema');
const { friendQueries } = require('./resources/friend/friend.schema');
const { likeQueries } = require('./resources/like/like.schema');

const Query = `

  type Query {

    ${userQueries}
    ${postQueries}
    ${friendQueries}
    ${likeQueries}

  }

`;

module.exports = {

  Query

};