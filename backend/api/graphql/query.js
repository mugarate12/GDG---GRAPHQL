// importar minhas queries
const { userQueries } = require('./resources/user/user.schema');

const Query = `

  type Query {

    ${userQueries}

  }

`;

module.exports = {

  Query

};