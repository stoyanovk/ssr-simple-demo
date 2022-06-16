const { ApolloServer } = require('apollo-server')
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')
// Pass schema definition and resolvers to the
// ApolloServer constructor
const server = new ApolloServer({ typeDefs, resolvers, csrfPrevention: true })

// Launch the server
server.listen(5000).then(({ url }) => {
  console.log(`🚀  Server ready at  ${url}`)
})
