import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink, from } from 'apollo-link'

// github token
const token = '4b0c13b24378c25b7cb774fdc55873c9b93d7461';

const Middleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  // request时对请求做处理
  console.log('Middleware', operation, forward)
  return forward(operation)
})

const Afterware = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    // 服务器返回数据
    console.log('Afterware--response', response)
    return response
  })
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql', // 配置请求url
  // 配置header
  headers: {
    Authorization: `Bearer ${token}`
  }
})

const cache = new InMemoryCache() // 缓存
export default new ApolloClient({
  link: from([Middleware, Afterware, errorLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all'
    }
  }
})
