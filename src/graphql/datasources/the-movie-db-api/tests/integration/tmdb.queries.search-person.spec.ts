import { gql } from 'apollo-server';

const mockRestDataSourceGet = jest.fn();

import { rawPeopleItem, peopleItem } from '../../../../../../__tests__/mocks/people';
import { movieGenres, tvGenres } from '../../../../../../__tests__/mocks/mediaGenres';
import { SearchType } from '../../../../../lib/types';
import makeTestQuery from './makeTestQuery';

const SEARCH_PERSON = gql`
  query SearchPerson($input: SearchInput!) {
    search(input: $input) {
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

describe('Integration: DataSources/TheMovieDBAPI/Search.Person - Queries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Testing Query - Search for a Person', () => {
    it('should search for person with the name that matches with the query provided and return the result correctly', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({
          total_results: 1,
          results: [rawPeopleItem],
          total_pages: 1,
        })
        .mockReturnValueOnce({ genres: movieGenres })
        .mockReturnValueOnce({ genres: tvGenres });

      const query = makeTestQuery();

      const { data } = await query({
        query: SEARCH_PERSON,
        variables: { input: { page: 1, query: 'any', type: SearchType.Person } },
      });

      expect(data.search.hasMore).toEqual(false);
      expect(data.search.total_results).toEqual(1);
      expect(data.search.items).toEqual([peopleItem]);
    });

    it('should throw an error when the query is empty', async () => {
      const query = makeTestQuery();

      const { errors } = await query({
        query: SEARCH_PERSON,
        variables: { input: { page: 1, query: '', type: SearchType.Person } },
      });

      return expect(errors && errors[0].message).toEqual('Search query cannot be empty.');
    });
  });
});
