import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server';

import resolvers from '../../../../resolvers';
import typeDefs from '../../../../typeDefs';
import TheMovieDBAPI from '../../../../../app';

const makeTestQuery = () => {
  const server = new ApolloServer({
    dataSources: () => ({
      tmdb: new TheMovieDBAPI(),
    }),
    resolvers,
    typeDefs,
  });

  const { query } = createTestClient(server);

  return query;
};

export default makeTestQuery;
