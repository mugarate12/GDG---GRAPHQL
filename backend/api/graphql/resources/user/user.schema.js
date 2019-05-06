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
  updateUserPassword(id: ID!, input:UserUpdatePasswordInput!): Boolean
  updateUserProfile(id: ID!, input: UserUpdateInput!): Boolean
  deleteUser(id:ID!): Boolean
  addFriend(idFriend: ID!): Boolean
  removeFriend(idFriend: ID!): Boolean

`;

module.exports = {

  userTypes,
  userQueries,
  userMutations

};