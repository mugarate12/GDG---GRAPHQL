const likeTypes = `

  type Like {

    idPost: Int!
    idUser: Int!

  }

`;

const likeQueries = `

  #provisorio, irá vim do token
  likes(id: ID!): [ Like! ]!

`;

const likeMutations = `

  like(idPost: ID!, idUser: ID!): Boolean
  unlike(idPost: ID!, idUser: ID!): Boolean

`;

module.exports = {

  likeTypes,
  likeQueries,
  likeMutations

}