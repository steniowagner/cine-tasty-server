import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

import { movieGenres, tvGenres } from '../../../../__tests__/mocks/mediaGenres.stub';
import { personQueryResult, person } from '../../../../__tests__/mocks/people.stub';
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

const mockRestDataSourceGet = jest.fn();

jest.mock('apollo-datasource-rest', () => {
  class MockRESTDataSource {
    baseUrl = '';
    get = mockRestDataSourceGet;
  }

  return {
    RESTDataSource: MockRESTDataSource,
  };
});

const makeTestServer = () => {
  const tmdbAPI = new TheMovieDBAPI();

  tmdbAPI.genres = {
    movie: movieGenres,
    tv: tvGenres,
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      tmdb: tmdbAPI,
    }),
  });

  return server;
};

describe('[TheMovieDBAPI.Queries.People]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches an array of people from the TheMoviewDB API and parses the result correctly', async () => {
    mockRestDataSourceGet.mockResolvedValue({
      results: [personQueryResult],
      total_pages: 2,
    });

    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_PEOPLE,
      variables: { page: 1 },
    });

    expect(data!.people.items).toEqual([person]);
  });

  it('returns the field hasMore as true when has more items to be paginated', async () => {
    mockRestDataSourceGet.mockResolvedValue({
      results: [personQueryResult, personQueryResult],
      total_pages: 2,
    });
    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_PEOPLE,
      variables: { page: 1 },
    });

    expect(data!.people.hasMore).toEqual(true);
  });

  it('returns the field hasMore as false when has no more items to be paginated', async () => {
    mockRestDataSourceGet.mockResolvedValue({
      results: [personQueryResult, personQueryResult],
      total_pages: 2,
    });

    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_PEOPLE,
      variables: { page: 2 },
    });

    expect(data!.people.hasMore).toEqual(false);
  });
});
