import { gql } from 'apollo-server';

const mockRestDataSourceGet = jest.fn();

import { SearchType } from '../../../../../lib/types';
import {
  rawKnowForTVShow,
  knowForTVShow,
} from '../../../../../../__tests__/mocks/people';
import { movieGenres, tvGenres } from '../../../../../../__tests__/mocks/mediaGenres';
import makeTestQuery from '../../../../../../__tests__/utils/makeTestQuery';

const SEARCH_TV_SHOW = gql`
  query SearchTVShow($input: SearchInput!) {
    search(input: $input) {
      totalResults
      hasMore
      items {
        ... on BaseTVShow {
          originCountry
          originalName
          name
          firstAirDate
          backdropPath
          genreIds
          overview
          voteAverage
          mediaType
          posterPath
          popularity
          originalLanguage
          voteCount
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

describe('Integration: DataSources-Search.TVShow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Query - Search for a TV Show', () => {
    it('should search for a tv show with the title that matches with the query provided on TheMoviewDB API and returns the result correctly', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({
          total_results: 1,
          results: [rawKnowForTVShow],
          total_pages: 1,
        })
        .mockReturnValueOnce({ genres: tvGenres })
        .mockReturnValueOnce({ genres: movieGenres });

      const query = makeTestQuery();

      const { data } = await query({
        query: SEARCH_TV_SHOW,
        variables: { input: { page: 1, query: 'any', type: SearchType.Tv } },
      });

      expect(data.search.hasMore).toEqual(false);
      expect(data.search.totalResults).toEqual(1);
      expect(data.search.items).toEqual([knowForTVShow]);
    });

    it('should throw an error when the query is empty', async () => {
      const query = makeTestQuery();

      const { errors } = await query({
        query: SEARCH_TV_SHOW,
        variables: { input: { page: 1, query: '', type: SearchType.Tv } },
      });

      return expect(errors && errors[0].message).toEqual('Search query cannot be empty.');
    });
  });
});
