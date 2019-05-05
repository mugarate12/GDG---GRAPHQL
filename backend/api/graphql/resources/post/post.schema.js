const postTypes = `

  type Post {

    id: ID!
    author: User!
    content: String!
    likes: Int!

  }

  #passar o token aqui
  input PostCreateInput {

    content: String!

  }

  input PostUpdateInput {

    content: String!

  }

`;

const postQueries = `

  post(id: ID!): Post
  posts(first: Int, offset: Int): [ Post! ]!
  #a lista de ids vai vir do campos "friends" do USER
  postByFriends(first: Int, offset: Int): [ Post! ]!

`;

const postMutations = `

  createPost(input: PostCreateInput!): Post
  updatePost(id: ID!, input: PostUpdateInput!): Post
  deletePost(id: ID!): Boolean
  addLike(idPost: ID!): Boolean
  removeLike(idPost: ID!): Boolean

`;

module.exports = {

  postTypes,
  postQueries,
  postMutations

};