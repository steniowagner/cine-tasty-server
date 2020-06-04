import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

import MEDIA_GENRES_CONSTANTS from '../../handlers/media-genres/utils/constants';
import { rawPeopleItem, peopleItem } from '../../../../../__tests__/mocks/people.stub';
import { movieGenres, tvGenres } from '../../../../../../__tests__/mocks/mediaGenres';

const mockRestDataSourceGet = jest.fn();

import env from '../../../../../config/environment';
import resolvers from '../../../../resolvers';
import CONSTANTS from '../../utils/constants';
import typeDefs from '../../../../typeDefs';
import TheMovieDBAPI from '../..';

const POPULAR_PERSON_ENDPOINT = '/popular';
const PERSON_ENDPOINT = '/person';

const GET_PEOPLE = gql`
  query GetPeople($page: Int!) {
    people(page: $page) {
      total_results
      total_pages
      hasMore
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
            overview
            vote_average
            media_type
            genre_ids
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
            overview
            genre_ids
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

const makeTestServer = (): ApolloServer => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      tmdb: new TheMovieDBAPI(),
    }),
  });
};

jest.mock('apollo-datasource-rest', () => {
  class MockRESTDataSource {
    baseUrl = '';
    get = mockRestDataSourceGet;
  }

  return {
    RESTDataSource: MockRESTDataSource,
    HTTPCache: class HTTPCache {},
  };
});

describe('Integration: DataSources-People', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Query - People', () => {
    it('should query popular people from TheMoviewDB API and returns the data correctly', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({
          total_pages: 1,
          total_results: 1,
          results: [rawPeopleItem],
        })
        .mockReturnValueOnce({ genres: movieGenres })
        .mockReturnValueOnce({ genres: tvGenres });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_PEOPLE,
        variables: { page: 1 },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(3);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${PERSON_ENDPOINT}${POPULAR_PERSON_ENDPOINT}`,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
          page: 1,
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${MEDIA_GENRES_CONSTANTS.GENRE_MOVIE_ENDPOINT}`,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${MEDIA_GENRES_CONSTANTS.GENRE_TV_SHOW_ENDPOINT}`,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(data!.people).toEqual({
        total_pages: 1,
        total_results: 1,
        hasMore: false,
        items: [peopleItem],
      });
    });

    it('should return the field hasMore as true when has more items to be paginated', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({
          total_pages: 2,
          total_results: 2,
          results: [rawPeopleItem],
        })
        .mockReturnValueOnce({ genres: movieGenres })
        .mockReturnValueOnce({ genres: tvGenres });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_PEOPLE,
        variables: { page: 1 },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(3);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${PERSON_ENDPOINT}${POPULAR_PERSON_ENDPOINT}`,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
          page: 1,
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${MEDIA_GENRES_CONSTANTS.GENRE_MOVIE_ENDPOINT}`,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${MEDIA_GENRES_CONSTANTS.GENRE_TV_SHOW_ENDPOINT}`,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(data!.people).toEqual({
        total_pages: 2,
        total_results: 2,
        hasMore: true,
        items: [peopleItem],
      });
    });
  });
});
