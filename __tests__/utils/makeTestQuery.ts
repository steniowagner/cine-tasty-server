import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server';

import TheMovieDBAPI from '../../src/graphql/datasources/the-movie-db-api/TheMovieDBAPI';
import OpenTriviaAPI from '../../src/graphql/datasources/open-trivia-api/OpenTriviaAPI';
import NewsAPI from '../../src/graphql/datasources/news-api/NewsAPI';

import resolvers from '../../src/graphql/resolvers';
import typeDefs from '../../src/graphql/typeDefs';

const makeTestQuery = () => {
  const server = new ApolloServer({
    dataSources: () => ({
      openTrivia: new OpenTriviaAPI(),
      tmdb: new TheMovieDBAPI(),
      news: new NewsAPI(),
    }),
    resolvers,
    typeDefs,
  });

  const { query } = createTestClient(server);

  return query;
};

export default makeTestQuery;
