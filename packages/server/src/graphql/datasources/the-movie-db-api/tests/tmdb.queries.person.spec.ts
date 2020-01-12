import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

import { castDetails, details, person } from '../../../../__tests__/mocks/person.stub';
import { movieGenres, tvGenres } from '../../../../__tests__/mocks/mediaGenres.stub';
import resolvers from '../../../resolvers';
import typeDefs from '../../../typeDefs';
import TheMovieDBAPI from '..';

const GET_PERSON = gql`
  query GetPerson($id: Int!) {
    person(id: $id, language: PTBR) {
      alsoKnownAs
      placeOfBirth
      birthday
      name
      biography
      popularity
      homepage
      knownForDepartment
      deathday
      imagesGallery
      adult
      profileImage
      gender
      imbdId
      id
      cast {
        character
        backdropImage
        overview
        voteAverage
        mediaType
        posterImage
        popularity
        originalLanguage
        genres
        voteCount
        creditId
        id
        ... on CastMovie {
          originalTitle
          video
          title
          adult
          releaseDate
        }

        ... on CastTV {
          episodeCount
          originCountry
          originalName
          name
          firstAirDate
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

const makeTestServer = () => {
  const tmdbAPI = new TheMovieDBAPI();

  tmdbAPI.genres = {
    movie: movieGenres,
    tv: tvGenres,
  };

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
      .mockReturnValueOnce(details)
      .mockReturnValueOnce(castDetails);

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
