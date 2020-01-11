import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

import { rawPerson, person } from '../../../../__tests__/mocks/people.stub';
import resolvers from '../../../resolvers';
import typeDefs from '../../../typeDefs';
import TheMovieDBAPI from '..';

const GET_PEOPLE = gql`
  query GetPeople($page: Int!) {
    people(page: $page) {
      items {
        knownForDepartment
        knownFor {
          originalLanguage
          backdropImage
          originalTitle
          releaseDate
          posterImage
          voteAverage
          mediaType
          isAdult
          overview
          genres
          voteCount
          title
          id
        }
        profileImage
        popularity
        adult
        name
        gender
        id
      }
      hasMore
    }
  }
`;

const makeTestServer = () => {
  const tmdbAPI = new TheMovieDBAPI();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      tmdb: tmdbAPI,
    }),
  });

  tmdbAPI.genres = {
    tv: [
      {
        id: 16,
        name: 'Animation',
      },
      {
        id: 35,
        name: 'Comedy',
      },
    ],
    movie: [
      {
        id: 28,
        name: 'Action',
      },
      {
        id: 12,
        name: 'Adventure',
      },
    ],
  };

  return { server, tmdbAPI };
};

describe('[Queries.TheMovieDBAPI]', () => {
  it('fetches an array of people from the TheMoviewDB API and parses the result correctly', async () => {
    const { server, tmdbAPI } = makeTestServer();

    tmdbAPI.get = jest.fn(() => ({
      results: [rawPerson],
      total_pages: 2,
    }));

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_PEOPLE,
      variables: { page: 1 },
    });

    expect(data.people.items).toEqual([person]);
  });

  it('returns the field hasMore as true when has more items to be paginated', async () => {
    const { server, tmdbAPI } = makeTestServer();

    tmdbAPI.get = jest.fn(() => ({
      results: [rawPerson, rawPerson],
      total_pages: 2,
    }));

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_PEOPLE,
      variables: { page: 1 },
    });

    expect(data.people.hasMore).toEqual(true);
  });

  it('returns the field hasMore as false when has no more items to be paginated', async () => {
    const { server, tmdbAPI } = makeTestServer();

    tmdbAPI.get = jest.fn(() => ({
      results: [rawPerson, rawPerson],
      total_pages: 2,
    }));

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_PEOPLE,
      variables: { page: 2 },
    });

    expect(data.people.hasMore).toEqual(false);
  });
});
