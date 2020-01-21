import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

import { rawPerson, person, rawCast } from '../../../../__tests__/mocks/person.stub';
import { movieGenres, tvGenres } from '../../../../__tests__/mocks/mediaGenres.stub';
import resolvers from '../../../resolvers';
import typeDefs from '../../../typeDefs';
import TheMovieDBAPI from '..';

const GET_PERSON = gql`
  query GetPerson($id: Int!) {
    person(id: $id, language: PTBR) {
      birthday
      known_for_department
      deathday
      id
      name
      also_known_as
      place_of_birth
      profile_path
      adult
      imdb_id
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

describe('[TheMovieDBAPI.Queries.Person]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches a person from the TheMoviewDB API and parses the result correctly', async () => {
    mockRestDataSourceGet = jest
      .fn()
      .mockReturnValueOnce({ genres: tvGenres })
      .mockReturnValueOnce({ genres: movieGenres })
      .mockReturnValueOnce(rawPerson)
      .mockReturnValueOnce(rawCast);

    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_PERSON,
      variables: { id: 123 },
    });

    expect(data!.person).toEqual(person);
  });

  it("return null when the person doesn't exists", async () => {
    mockRestDataSourceGet = jest.fn().mockReturnValue({ success: false });

    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_PERSON,
      variables: { id: 1 },
    });

    expect(data!.person).toEqual(null);
  });
});
