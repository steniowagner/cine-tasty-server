import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

import { movieGenres } from '../../../../__tests__/mocks/mediaGenres.stub';
import { rawMovie, movie } from '../../../../__tests__/mocks/movies.stub';

const mockRestDataSourceGet = jest.fn();

import env from '../../../../config/environment';
import resolvers from '../../../resolvers';
import typeDefs from '../../../typeDefs';
import TheMovieDBAPI from '..';

const GENRE_MOVIE_ENDPOINT = '/genre/movie/list';
const NOW_PLAYING_ENDPOINT = 'movie/now_playing';

const GET_TRENDING_MOVIES = gql`
  fragment TrendingMovieItem on BaseMovie {
    genre_ids
    original_title
    video
    title
    adult
    release_date
    backdrop_path
    overview
    vote_average
    poster_path
    popularity
    original_language
    vote_count
    overview
    id
  }

  query TrendingMovies($page: Int!) {
    trending_movies {
      now_playing(input: { page: $page }) {
        total_results
        total_pages
        hasMore
        items {
          ...TrendingMovieItem
        }
      }
      popular(input: { page: $page }) {
        total_results
        total_pages
        hasMore
        items {
          ...TrendingMovieItem
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

describe('[TheMovieDBAPI.Queries.Movies]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches the now playing/popular movies from TheMovieDB API and returns the result correctly', async () => {
    mockRestDataSourceGet
      .mockReturnValueOnce({
        total_pages: 1,
        total_results: 1,
        results: [rawMovie],
      })
      .mockReturnValueOnce({
        total_pages: 1,
        total_results: 1,
        results: [rawMovie],
      })
      .mockReturnValueOnce({ genres: movieGenres })
      .mockReturnValueOnce({ genres: movieGenres });

    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_TRENDING_MOVIES,
      variables: { page: 1 },
    });

    expect(mockRestDataSourceGet.mock.calls.length).toBe(4);

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(NOW_PLAYING_ENDPOINT, {
      api_key: env.THE_MOVIE_DB_API_KEY,
      language: 'en-us',
      page: 1,
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(GENRE_MOVIE_ENDPOINT, {
      api_key: env.THE_MOVIE_DB_API_KEY,
      language: 'en-us',
    });

    expect(data!.trending_movies).toEqual({
      now_playing: {
        hasMore: false,
        total_pages: 1,
        total_results: 1,
        items: [movie],
      },
      popular: {
        hasMore: false,
        total_pages: 1,
        total_results: 1,
        items: [movie],
      },
    });
  });
});
