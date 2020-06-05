const mockRestDataSourceGet = jest.fn();

import { gql } from 'apollo-server';

import { movieGenres, tvGenres } from '../../../../../../__tests__/mocks/mediaGenres';
import { rawPeopleItem, peopleItem } from '../../../../../../__tests__/mocks/people';
import MEDIA_GENRES_CONSTANTS from '../../handlers/media-genres/utils/constants';
import env from '../../../../../config/environment';
import makeTestQuery from './makeTestQuery';

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
            originalTitle
            video
            title
            adult
            releaseDate
            backdropPath
            overview
            voteAverage
            mediaType
            genreIds
            posterPath
            popularity
            originalLanguage
            voteCount
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

describe('Integration: DataSources/TheMovieDBAPI/People - Queries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Testing Query - People', () => {
    it('should query popular people and return the result correctly', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({
          total_pages: 1,
          total_results: 1,
          results: [rawPeopleItem],
        })
        .mockReturnValueOnce({ genres: movieGenres })
        .mockReturnValueOnce({ genres: tvGenres });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_PEOPLE,
        variables: { page: 1 },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(3);

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

      expect(data.people).toEqual({
        total_pages: 1,
        total_results: 1,
        hasMore: false,
        items: [peopleItem],
      });
    });

    it('should return the field "hasMore" as "true" when has more items to be paginated', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({
          total_pages: 2,
          total_results: 2,
          results: [rawPeopleItem],
        })
        .mockReturnValueOnce({ genres: movieGenres })
        .mockReturnValueOnce({ genres: tvGenres });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_PEOPLE,
        variables: { page: 1 },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(3);

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

      expect(data.people).toEqual({
        total_pages: 2,
        total_results: 2,
        hasMore: true,
        items: [peopleItem],
      });
    });
  });
});
