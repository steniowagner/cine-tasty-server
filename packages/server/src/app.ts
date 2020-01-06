/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { ApolloServer } from 'apollo-server';

import dataSources from './graphql/datasources';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';
import env from './config/environment';

const server = new ApolloServer({
  dataSources: () => dataSources,
  resolvers,
  typeDefs,
});

server
  .listen(env.PORT)
  .then(({ url }) => console.log(`UHUL! Cine-Tasty-API is running at ${url}!`));
