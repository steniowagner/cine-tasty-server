import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

import { SearchType } from '../../../../lib/types';
import { rawPeopleItem, peopleItem } from '../../../../__tests__/mocks/people.stub';
import { movieGenres, tvGenres } from '../../../../__tests__/mocks/mediaGenres.stub';
import resolvers from '../../../resolvers';
import typeDefs from '../../../typeDefs';
import TheMovieDBAPI from '..';

const SEARCH_PERSON = gql`
  query SearchPerson($page: Int!, $query: String!, $type: SearchType!) {
    search(page: $page, query: $query, type: $type) {
      total_results
      hasMore
      items {
        ... on BasePerson {
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

describe('[TheMovieDBAPI.Queries.Search.Person]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('search for person on TheMoviewDB API and returns the result correctly', async () => {
    mockRestDataSourceGet = jest
      .fn()
      .mockReturnValueOnce({ genres: tvGenres })
      .mockReturnValueOnce({ genres: movieGenres })
      .mockReturnValueOnce({
        total_results: 1,
        results: [rawPeopleItem],
        total_pages: 1,
      });

    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { data } = await query({
      query: SEARCH_PERSON,
      variables: { page: 1, query: 'any', type: SearchType.Person },
    });

    expect(data!.search.hasMore).toEqual(false);
    expect(data!.search.total_results).toEqual(1);
    expect(data!.search.items).toEqual([peopleItem]);
  });

  it('should throw an error when the query is empty', async () => {
    mockRestDataSourceGet = jest
      .fn()
      .mockReturnValueOnce({ genres: tvGenres })
      .mockReturnValueOnce({ genres: movieGenres })
      .mockReturnValueOnce({
        total_results: 1,
        results: [],
        total_pages: 1,
      });

    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { errors } = await query({
      query: SEARCH_PERSON,
      variables: { page: 1, query: '', type: SearchType.Person },
    });

    return expect(errors && errors[0].message).toEqual('Search query cannot be empty.');
  });
});
