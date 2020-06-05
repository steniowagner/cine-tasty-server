const mockRestDataSourceGet = jest.fn();

import { gql } from 'apollo-server';

import { movieGenres, tvGenres } from '../../../../../../__tests__/mocks/mediaGenres';
import { rawKnowForMovie, knowForMovie } from '../../../../../../__tests__/mocks/people';
import { SearchType } from '../../../../../lib/types';
import makeTestQuery from './makeTestQuery';

const SEARCH_MOVIE = gql`
  query SearchMovie($input: SearchInput!) {
    search(input: $input) {
      total_results
      hasMore
      items {
        ... on BaseMovie {
          originalTitle
          video
          title
          adult
          releaseDate
          backdropPath
          genreIds
          overview
          voteAverage
          mediaType
          posterPath
          popularity
          originalLanguage
          voteCount
          overview
          id
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

describe('Integration: DataSources/TheMovieDBAPI/Search-Movie - Queries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Testing Query - Search for a Movie', () => {
    it('should search for a movie with the title that matches with the query provided and return the result correctly', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({
          results: [rawKnowForMovie],
          total_results: 1,
          total_pages: 1,
        })
        .mockReturnValueOnce({ genres: movieGenres })
        .mockReturnValueOnce({ genres: tvGenres });

      const query = makeTestQuery();

      const { data } = await query({
        query: SEARCH_MOVIE,
        variables: { input: { page: 1, query: 'any', type: SearchType.Movie } },
      });

      expect(data.search.hasMore).toEqual(false);
      expect(data.search.total_results).toEqual(1);
      expect(data.search.items).toEqual([knowForMovie]);
    });

    it('should throw an error when the query is empty', async () => {
      const query = makeTestQuery();

      const { errors } = await query({
        query: SEARCH_MOVIE,
        variables: { input: { page: 1, query: '', type: SearchType.Tv } },
      });

      return expect(errors && errors[0].message).toEqual('Search query cannot be empty.');
    });
  });
});
