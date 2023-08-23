import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
});

const client = new ApolloClient({
  link,
  cache,
});

export default client;
