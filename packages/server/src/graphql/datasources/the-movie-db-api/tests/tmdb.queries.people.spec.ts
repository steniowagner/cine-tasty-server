import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

import { rawPeopleItem, peopleItem } from '../../../../__tests__/mocks/people.stub';
import { movieGenres, tvGenres } from '../../../../__tests__/mocks/mediaGenres.stub';
import resolvers from '../../../resolvers';
import typeDefs from '../../../typeDefs';
import TheMovieDBAPI from '..';

const GET_PEOPLE = gql`
  query GetPeople($page: Int!) {
    people(page: $page) {
      hasMore
      total_results
      total_pages
      items {
        profile_path
        adult
        id
        popularity
        name
        known_for {
          ... on BaseMovie {
            original_title
            video
            title
            adult
            release_date
            backdrop_path
            genre_ids
            overview
            vote_average
            media_type
            poster_path
            popularity
            original_language
            vote_count
            overview
            id
          }

          ... on BaseTVShow {
            origin_country
            original_name
            name
            first_air_date
            backdrop_path
            genre_ids
            overview
            vote_average
            media_type
            poster_path
            popularity
            original_language
            vote_count
            id
          }
        }
      }
    }
  }
`;

let mockRestDataSourceGet = jest.fn();

jest.mock('apollo-datasource-rest', () => {
  class MockRESTDataSource {
    baseUrl = '';
    get = mockRestDataSourceGet;
  }

  return {
    RESTDataSource: MockRESTDataSource,
  };
});

const makeTestServer = (): ApolloServer => {
  const tmdbAPI = new TheMovieDBAPI();

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

  it('fetches the popular people from TheMoviewDB API and returns the data as expected', async () => {
    const response = {
      total_pages: 1,
      total_results: 1,
      results: [rawPeopleItem],
    };

    mockRestDataSourceGet = jest
      .fn()
      .mockReturnValueOnce({ genres: tvGenres })
      .mockReturnValueOnce({ genres: movieGenres })
      .mockReturnValueOnce(response);

    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_PEOPLE,
      variables: { page: 1 },
    });

    expect(data!.people).toEqual({
      total_pages: 1,
      total_results: 1,
      hasMore: false,
      items: [peopleItem],
    });
  });

  it('returns the field hasMore as true when has more items to be paginated', async () => {
    const response = {
      total_pages: 2,
      total_results: 2,
      results: [rawPeopleItem],
    };

    mockRestDataSourceGet = jest
      .fn()
      .mockReturnValueOnce({ genres: tvGenres })
      .mockReturnValueOnce({ genres: movieGenres })
      .mockReturnValueOnce(response);

    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_PEOPLE,
      variables: { page: 1 },
    });

    expect(data!.people.hasMore).toEqual(true);
  });

  it('returns the field hasMore as false when has no more items to be paginated', async () => {
    const response = {
      total_pages: 1,
      total_results: 1,
      results: [rawPeopleItem],
    };

    mockRestDataSourceGet = jest
      .fn()
      .mockReturnValueOnce({ genres: tvGenres })
      .mockReturnValueOnce({ genres: movieGenres })
      .mockReturnValueOnce(response);

    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_PEOPLE,
      variables: { page: 1 },
    });

    expect(data!.people.hasMore).toEqual(false);
  });
});
