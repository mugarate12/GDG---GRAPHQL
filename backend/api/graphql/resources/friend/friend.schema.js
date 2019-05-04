const friendTypes = `

  type Friend {

    idUser: Int!,
    id: Int!

  }

  input newFriend {

    idFriend: Int!

  }

  input removeFriend {

    idFriend: Int!

  }

`;

const friendQueries = `

#provisório, depois vai ser o id pego no token
  friends(id: ID!): [ Friend ]!

`;

const friendMutations = `

#vou mocar o id do USer, todavia, ele virá do token
  createFriend(input: newFriend!): Friend
  deleteFriend(input: removeFriend!): Boolean!

`;

module.exports = {

  friendTypes,
  friendQueries,
  friendMutations

}