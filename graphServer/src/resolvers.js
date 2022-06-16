const { request } = require('./request')
const resolvers = {
  Query: {
    posts: (_, args) => {
      const { limit = 10, page = 1 } = args
      return request(`/posts?_limit=${limit}&_page=${page}`)
    },
    post: (_, args) => {
      const { id } = args
      return request(`/posts/${id}`)
    }
  },

  post: {
    comments: async ({ id }, { limit = 10 }) => {
      return request(`/posts/${id}/comments?_limit=${limit}`)
    }
  }
}

exports.resolvers = resolvers
