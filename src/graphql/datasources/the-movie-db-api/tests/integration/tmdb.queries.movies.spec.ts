const mockRestDataSourceGet = jest.fn();

import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

import { getImagesResult, images } from '../../../../../__tests__/mocks/images.stub';
import MEDIA_GENRES_CONSTANTS from '../../handlers/media-genres/utils/constants';
import { movieGenres } from '../../../../../../__tests__/mocks/mediaGenres';
import { TrendingMoviesEndpoints } from '../../../../../@types';
import {
  rawMovie,
  rawMovieDetail,
  movieDetail,
} from '../../../../../__tests__/mocks/movies.stub';
import env from '../../../../../config/environment';
import resolvers from '../../../../resolvers';
import CONSTANTS from '../../utils/constants';
import typeDefs from '../../../../typeDefs';
import TheMovieDBAPI from '../..';

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
      now_playing(args: { page: $page }) {
        total_results
        total_pages
        hasMore
        items {
          ...TrendingMovieItem
        }
      }
      popular(args: { page: $page }) {
        total_results
        total_pages
        hasMore
        items {
          ...TrendingMovieItem
        }
      }
      top_rated(args: { page: $page }) {
        total_results
        total_pages
        hasMore
        items {
          ...TrendingMovieItem
        }
      }
      upcoming(args: { page: $page }) {
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
      videos {
        thumbnail {
          extra_small
          small
          medium
          large
          extra_large
        }
        key
        name
        site
        id
        type
      }
      reviews {
        author
        content
        id
        url
      }
      similar {
        original_title
        video
        title
        adult
        release_date
        backdrop_path
        genre_ids
        overview
        vote_average
        poster_path
        popularity
        original_language
        vote_count
        id
      }
    }
  }
`;

const GET_MOVIE_IMAGES = gql`
  query MovieImages($id: ID!) {
    movie(id: $id) {
      images(id: $id)
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

describe('Integration: DataSources-Movies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Query - Movie Images', () => {
    it('should query the tmdb.queries.movies.spec.tsimages of a movie from TheMovieDB API and returns the result correctly', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({}).mockReturnValueOnce(getImagesResult);

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_MOVIE_IMAGES,
        variables: { id: '1' },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.MOVIE_ENDPOINT}/1`,
        {
          append_to_response: CONSTANTS.APPEND_TO_MOVIE_RESPONSE,
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.MOVIE_ENDPOINT}/1/${CONSTANTS.MOVIE_IMAGES_RESOURCE_ENDPOINT}`,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
        },
      );

      expect(data!.movie.images).toEqual(images);
    });

    it("should query the images of a movie from TheMovieDB API and returns an empty array when the movie doesn't exist", async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({})
        .mockReturnValueOnce({ status_code: CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_MOVIE_IMAGES,
        variables: { id: '1' },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.MOVIE_ENDPOINT}/1`,
        {
          append_to_response: CONSTANTS.APPEND_TO_MOVIE_RESPONSE,
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.MOVIE_ENDPOINT}/1/${CONSTANTS.MOVIE_IMAGES_RESOURCE_ENDPOINT}`,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
        },
      );

      expect(data!.movie.images).toEqual([]);
    });
  });

  describe('Query - Movie Detail', () => {
    it('should query the details of a movie from TheMovieDB API and returns the result correctly', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce(rawMovieDetail)
        .mockReturnValueOnce({ genres: movieGenres })
        .mockReturnValueOnce({ genres: movieGenres });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_MOVIE_DETAIL,
        variables: { id: 1, language: 'PTBR' },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(3);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.MOVIE_ENDPOINT}/1`,

        {
          append_to_response: CONSTANTS.APPEND_TO_MOVIE_RESPONSE,
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'pt-br',
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        MEDIA_GENRES_CONSTANTS.GENRE_MOVIE_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'pt-br',
        },
      );

      expect(data!.movie).toEqual(movieDetail);
    });
  });

  describe('Query - Trending Movies', () => {
    it('should query the now playing/popular/top_rated/upcoming movies from TheMovieDB API and returns the result correctly', async () => {
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

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        TrendingMoviesEndpoints.NowPlaying,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
          page: 1,
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        TrendingMoviesEndpoints.Popular,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
          page: 1,
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        TrendingMoviesEndpoints.TopRated,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
          page: 1,
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        TrendingMoviesEndpoints.Upcoming,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
          page: 1,
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        MEDIA_GENRES_CONSTANTS.GENRE_MOVIE_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        MEDIA_GENRES_CONSTANTS.GENRE_MOVIE_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        MEDIA_GENRES_CONSTANTS.GENRE_MOVIE_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        MEDIA_GENRES_CONSTANTS.GENRE_MOVIE_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(data!.trending_movies).toMatchSnapshot();
    });
  });
});
