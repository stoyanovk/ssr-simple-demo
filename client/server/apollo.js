import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'cross-fetch'

export const getApolloCLient = () => {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({ uri: process.env._GRAPH_URL, fetch }),
    cache: new InMemoryCache()
  })
}
