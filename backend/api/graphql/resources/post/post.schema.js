const postTypes = `

  type Post {

    id: ID!
    author: User!
    content: String!
    likes: Int!

  }

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

`;

const postMutations = `

  createPost(input: PostCreateInput!): Post
  updatePost(id: ID!, input: PostUpdateInput!): Post
  deletePost(id: ID!): Boolean
  incrementLike: Boolean

`;

module.exports = {

  postTypes,
  postQueries,
  postMutations

};