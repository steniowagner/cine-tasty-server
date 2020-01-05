import { ApolloServer } from 'apollo-server';

import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

server.listen(4000).then(({ url }) => console.log(`UHUL! Cine-Tasty is runnint at ${url}!`));
