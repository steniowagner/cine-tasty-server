import { ApolloServer, ApolloError } from 'apollo-server';
import { GraphQLError } from 'graphql';

import MediaGenres from './helpers/MediaGenres';
import dataSources from './graphql/datasources';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';
import env from './config/environment';

const mediaGenres = new MediaGenres();

const server = new ApolloServer({
  dataSources: () => dataSources,
  resolvers,
  typeDefs,
  context: async () => ({
    mediaGenres: await mediaGenres.load(),
  }),
  formatError: (error: GraphQLError) => {
    if (error.originalError instanceof ApolloError) {
      return error;
    }

    console.error(error);

    return new GraphQLError(error.message);
  },
});

server
  .listen(env.PORT)
  .then(({ url }) => console.log(`UHUL! Cine-Tasty-API is running at ${url}!`));
