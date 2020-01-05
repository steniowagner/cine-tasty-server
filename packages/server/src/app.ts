import { ApolloServer } from 'apollo-server';

import dataSources from './graphql/datasources';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';

const server = new ApolloServer({
  resolvers,
  typeDefs,
  dataSources: () => ({
    ...dataSources,
  }),
});

server
  .listen(4000)
  .then(({ url }) => console.log(`UHUL! Cine-Tasty-API is running at ${url}!`));
