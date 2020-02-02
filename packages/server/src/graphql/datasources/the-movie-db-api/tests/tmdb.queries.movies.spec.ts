import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

import { movieGenres } from '../../../../__tests__/mocks/mediaGenres.stub';
import {
  rawMovie,
  movie,
  rawMovieDetail,
  movieDetail,
} from '../../../../__tests__/mocks/movies.stub';

const mockRestDataSourceGet = jest.fn();

import env from '../../../../config/environment';
import resolvers from '../../../resolvers';
import typeDefs from '../../../typeDefs';
import TheMovieDBAPI from '..';

const GENRE_MOVIE_ENDPOINT = '/genre/movie/list';
const POPULAR_ENDPOINT = 'movie/popular';
const NOW_PLAYING_ENDPOINT = 'movie/now_playing';
const TOP_RATED_ENDPOINT = 'movie/top_rated';
const UPCOMING_ENDPOINT = 'movie/upcoming';

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
      top_rated(input: { page: $page }) {
        total_results
        total_pages
        hasMore
        items {
          ...TrendingMovieItem
        }
      }
      upcoming(input: { page: $page }) {
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

const GET_MOVIE_DETAIL = gql`
  query Movie($id: ID!, $language: ISO6391Language) {
    movie(id: $id, language: $language) {
      adult
      backdrop_path
      genres(language: $language)
      id
      original_language
      original_title
      overview
      poster_path
      popularity
      video
      title
      vote_average
      release_date
      production_companies {
        id
        logo_path
        name
        origin_country
      }
      vote_count
      runtime
      status
      tagline
      budget
      homepage
      revenue
      spoken_languages
      production_countries
      cast {
        name
        profile_path
        id
        character
      }
      crew {
        department
        id
        job
        name
        profile_path
      }

      # similar
      # reviews
      # trailers
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

  it('fetches the details of a movie from TheMovieDB API and returns the result correctly', async () => {
    mockRestDataSourceGet
      .mockReturnValueOnce(rawMovieDetail)
      .mockReturnValueOnce({ genres: movieGenres });

    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_MOVIE_DETAIL,
      variables: { id: 1, language: 'PTBR' },
    });

    expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

    expect(mockRestDataSourceGet).toHaveBeenCalledWith('movie/1', {
      append_to_response: 'videos,credits,similar',
      api_key: env.THE_MOVIE_DB_API_KEY,
      language: 'pt-br',
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(GENRE_MOVIE_ENDPOINT, {
      api_key: env.THE_MOVIE_DB_API_KEY,
      language: 'pt-br',
    });

    expect(data!.movie).toEqual(movieDetail);
  });

  it('fetches the now playing/popular/top_rated/upcoming movies from TheMovieDB API and returns the result correctly', async () => {
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
      .mockReturnValueOnce({ genres: movieGenres })
      .mockReturnValueOnce({ genres: movieGenres })
      .mockReturnValueOnce({ genres: movieGenres });

    const server = makeTestServer();

    const { query } = createTestClient(server);

    const { data } = await query({
      query: GET_TRENDING_MOVIES,
      variables: { page: 1 },
    });

    expect(mockRestDataSourceGet.mock.calls.length).toBe(8);

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(NOW_PLAYING_ENDPOINT, {
      api_key: env.THE_MOVIE_DB_API_KEY,
      language: 'en-us',
      page: 1,
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(POPULAR_ENDPOINT, {
      api_key: env.THE_MOVIE_DB_API_KEY,
      language: 'en-us',
      page: 1,
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(TOP_RATED_ENDPOINT, {
      api_key: env.THE_MOVIE_DB_API_KEY,
      language: 'en-us',
      page: 1,
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(UPCOMING_ENDPOINT, {
      api_key: env.THE_MOVIE_DB_API_KEY,
      language: 'en-us',
      page: 1,
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(GENRE_MOVIE_ENDPOINT, {
      api_key: env.THE_MOVIE_DB_API_KEY,
      language: 'en-us',
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(GENRE_MOVIE_ENDPOINT, {
      api_key: env.THE_MOVIE_DB_API_KEY,
      language: 'en-us',
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(GENRE_MOVIE_ENDPOINT, {
      api_key: env.THE_MOVIE_DB_API_KEY,
      language: 'en-us',
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
      top_rated: {
        hasMore: false,
        total_pages: 1,
        total_results: 1,
        items: [movie],
      },
      upcoming: {
        hasMore: false,
        total_pages: 1,
        total_results: 1,
        items: [movie],
      },
    });
  });
});
