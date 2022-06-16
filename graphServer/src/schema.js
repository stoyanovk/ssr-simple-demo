const { gql } = require('apollo-server')

const typeDefs = gql`
  type post {
    id: ID!
    title: String
    body: String
    comments: [comment]!
  }
  type comment {
    id: ID!
    name: String
    email: String
    body: String
  }
  type Query {
    posts(page: Int, limit: Int): [post]
    post(id: Int): post
  }
`
exports.typeDefs = typeDefs
