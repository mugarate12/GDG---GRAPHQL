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

  #informe o token no Header Authorization
  #a lista de ids vai vir do campos "friends" do USER
  postByFriends(first: Int, offset: Int): [ Post! ]!

`;

const postMutations = `

  #informe o token no Header Authorization
  createPost(input: PostCreateInput!): Post

  #informe o token no Header Authorization
  updatePost(id: ID!, input: PostUpdateInput!): Post

  #informe o token no Header Authorization
  deletePost(id: ID!): Boolean

  #informe o token no Header Authorization
  addLike(idPost: ID!): Boolean

  #informe o token no Header Authorization
  removeLike(idPost: ID!): Boolean

`;

module.exports = {

  postTypes,
  postQueries,
  postMutations

};