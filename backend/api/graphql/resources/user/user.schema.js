const userTypes = `

  type User {

    id: ID!
    name: String!
    username: String!
    about: String
    email: String!
    createdAt: String!
    updatedAt: String!
    friends: [ Friend! ]!
    posts: [ Post! ]!

  }

  input UserCreateInput {

    name: String!
    username: String!
    email: String!
    password: String!

  }

  input UserUpdatePasswordInput {

    password: String!

  }

  input UserUpdateInput {

    name: String
    about: String

  }

  input LoginInput {

    email: String
    username: String
    password: String!

  }

`;

const userQueries = `

  users(first: Int, offset: Int): [ User! ]!
  user(username: String!): User
  loginUser(input: LoginInput): Token

`;

const userMutations = `

  createUser(input: UserCreateInput!): Token

  #informe o token no Header Authorization
  updateUserPassword(input: UserUpdatePasswordInput!): Boolean

  #informe o token no Header Authorization
  updateUserProfile(id: ID!, input: UserUpdateInput!): Boolean
  
  #informe o token no Header Authorization
  deleteUser(id:ID!): Boolean

  #informe o token no Header Authorization
  addFriend(idFriend: ID!): Boolean
  
  #informe o token no Header Authorization
  removeFriend(idFriend: ID!): Boolean

`;

module.exports = {

  userTypes,
  userQueries,
  userMutations

};