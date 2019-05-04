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

`;

const userQueries = `

  users(first: Int, offset: Int): [ User! ]!
  user(id: ID!): User

`;

const userMutations = `

  createUser(input: UserCreateInput!): User
  updateUserPassword(id: ID!, input:UserUpdatePasswordInput!): User
  updateUserProfile(id: ID!, input: UserUpdateInput!): User
  deleteUser(id:ID!): Boolean

`;

module.exports = {

  userTypes,
  userQueries,
  userMutations

};