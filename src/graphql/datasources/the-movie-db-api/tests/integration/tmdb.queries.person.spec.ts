import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

const mockRestDataSourceGet = jest.fn();

import { rawPerson, person, rawCast } from '../../../../../../__tests__/mocks/person';
import { movieGenres, tvGenres } from '../../../../../../__tests__/mocks/mediaGenres';
import resolvers from '../../../../resolvers';
import typeDefs from '../../../../typeDefs';
import TheMovieDBAPI from '../..';

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
        backdrop_path
        overview
        vote_average
        media_type
        poster_path
        popularity
        original_language
        genre_ids
        vote_count
        credit_id
        id
        ... on CastMovie {
          original_title
          video
          title
          adult
          release_date
          character
          backdrop_path
          genre_ids
          overview
          vote_average
          media_type
          poster_path
          popularity
          original_language
          vote_count
          credit_id
          id
        }

        ... on CastTVShow {
          episode_count
          origin_country
          original_name
          name
          first_air_date
          character
          backdrop_path
          genre_ids
          overview
          vote_average
          media_type
          poster_path
          popularity
          original_language
          vote_count
          credit_id
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

describe('Integration: DataSources-Person', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Query - Person', () => {
    it('should get details of a person with certain id from the TheMoviewDB API and returns it correctly', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce(rawPerson)
        .mockReturnValueOnce(rawCast)
        .mockReturnValueOnce({ genres: movieGenres })
        .mockReturnValueOnce({ genres: tvGenres });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_PERSON,
        variables: { id: 123 },
      });

      expect(data.person).toEqual(person);
    });

    it("should return null when the person doesn't exists", async () => {
      mockRestDataSourceGet.mockReturnValue({ success: false });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_PERSON,
        variables: { id: 1 },
      });

      expect(data.person).toEqual(null);
    });
  });
});
