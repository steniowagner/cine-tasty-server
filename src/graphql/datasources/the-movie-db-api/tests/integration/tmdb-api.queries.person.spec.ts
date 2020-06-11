import { gql } from 'apollo-server';

const mockRestDataSourceGet = jest.fn();

import { rawPerson, person, rawCast } from '../../../../../../__tests__/mocks/person';
import { movieGenres, tvGenres } from '../../../../../../__tests__/mocks/mediaGenres';
import makeTestQuery from './makeTestQuery';

const GET_PERSON = gql`
  query GetPerson($id: Int!) {
    person(id: $id, language: PTBR) {
      birthday
      knownForDepartment
      deathday
      id
      name
      alsoKnownAs
      placeOfBirth
      profilePath
      adult
      imdbId
      homepage
      biography
      popularity
      images
      gender
      cast {
        character
        backdropPath
        overview
        voteAverage
        mediaType
        posterPath
        popularity
        originalLanguage
        genreIds
        voteCount
        creditId
        id
        ... on CastMovie {
          originalTitle
          video
          title
          adult
          releaseDate
          character
          backdropPath
          genreIds
          overview
          voteAverage
          mediaType
          posterPath
          popularity
          originalLanguage
          voteCount
          creditId
          id
        }

        ... on CastTVShow {
          episodeCount
          originCountry
          originalName
          name
          firstAirDate
          character
          backdropPath
          genreIds
          overview
          voteAverage
          mediaType
          posterPath
          popularity
          originalLanguage
          voteCount
          creditId
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

describe('Integration: DataSources/TheMovieDBAPI/Person - Queries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Testing Query - Person', () => {
    it('should get details of a person with certain id and returns the result correctly', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce(rawPerson)
        .mockReturnValueOnce(rawCast)
        .mockReturnValueOnce({ genres: movieGenres })
        .mockReturnValueOnce({ genres: tvGenres });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_PERSON,
        variables: { id: 123 },
      });

      expect(data.person).toEqual(person);
    });

    it("should return null when the person doesn't exists", async () => {
      mockRestDataSourceGet.mockReturnValue({ success: false });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_PERSON,
        variables: { id: 1 },
      });

      expect(data.person).toEqual(null);
    });
  });
});
