const userTypes = `

  type User {

    id: ID!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!

  }

  input UserCreateInput {

    name: String!
    email: String!
    password: String!

  }

  input UserUpdatePasswordInput {

    password: String!

  }

`;

const userQueries = `

  users(first: Int, offset: Int): [ User! ]!
  user(id: ID!): User

`;

const userMutations = `

  createUser(input: UserCreateInput!): User
  

`;

module.exports = {

  userTypes,
  userQueries,
  userMutations

};