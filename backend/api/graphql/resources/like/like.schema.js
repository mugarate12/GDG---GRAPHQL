const likeTypes = `

  type Like {

    idPost: Int!
    idUser: Int!

  }

`;

const likeQueries = `

  #provisorio, irá vim do token, logo irei mokar o ID
  likes: [Like!]!

`;

const likeMutations = `

  #id mokado, padrão
  like(idPost: Int!): Boolean
  unlike(idPost: Int!): Boolean

`;

module.exports = {

  likeTypes,
  likeQueries,
  likeMutations

}