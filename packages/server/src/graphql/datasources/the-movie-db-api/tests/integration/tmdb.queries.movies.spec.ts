const mockRestDataSourceGet = jest.fn();

import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

import { movieGenres } from '../../../../../__tests__/mocks/mediaGenres.stub';
import { TrendingMoviesEndpoints } from '../../../../../types';
import {
  rawMovie,
  movie,
  rawMovieDetail,
  movieDetail,
  review,
} from '../../../../../__tests__/mocks/movies.stub';
import env from '../../../../../config/environment';
import resolvers from '../../../../resolvers';
import typeDefs from '../../../../typeDefs';
import TheMovieDBAPI from '../..';

const GENRE_MOVIE_ENDPOINT = '/genre/movie/list';

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
    }
  }
`;

const GET_MOVIE_REVIEWS = gql`
  query MovieReviews($id: ID!, $reviewsPage: Int!) {
    movie(id: $id) {
      reviews(id: $id, reviewsPage: $reviewsPage) {
        total_results
        total_pages
        hasMore
        items {
          author
          content
          id
          url
        }
      }
    }
  }
`;

const GET_MOVIE_SIMILARS = gql`
  query MovieSimilars($id: ID!, $similarsPage: Int!) {
    movie(id: $id) {
      similar(id: $id, similarsPage: $similarsPage) {
        total_results
        total_pages
        hasMore
        items {
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

  describe('Query - Similar Movies', () => {
    it('should query similar movies of a movie from TheMovieDB API and returns the result correctly', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({})
        .mockReturnValueOnce({
          id: 1,
          page: 1,
          results: [rawMovie],
          total_pages: 1,
          total_results: 1,
        })
        .mockReturnValueOnce({ genres: movieGenres });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_MOVIE_SIMILARS,
        variables: { id: '1', similarsPage: 1 },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(3);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith('movie/1', {
        append_to_response: 'videos,credits',
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith('movie/1/similar', {
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
        page: 1,
      });

      expect(data!.movie.similar).toEqual({
        hasMore: false,
        total_pages: 1,
        total_results: 1,
        items: [movie],
      });
    });

    it('should query the similar movies of a movie from TheMovieDB API and returns the result correctly and returns hasMore field as true when has more items to be pagianted', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({ similars: {} })
        .mockReturnValueOnce({
          id: 1,
          page: 1,
          results: [rawMovie],
          total_pages: 2,
          total_results: 2,
        })
        .mockReturnValueOnce({ genres: movieGenres });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_MOVIE_SIMILARS,
        variables: { id: '1', similarsPage: 1 },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(3);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith('movie/1', {
        append_to_response: 'videos,credits',
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith('movie/1/similar', {
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
        page: 1,
      });

      expect(data!.movie.similar).toEqual({
        hasMore: true,
        total_pages: 2,
        total_results: 2,
        items: [movie],
      });
    });
  });

  describe('Query - Movie Reviews', () => {
    it('should query the reviews of a movie from TheMovieDB API and returns the result correctly', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({ reviews: {} }).mockReturnValueOnce({
        id: 1,
        page: 1,
        results: [review],
        total_pages: 1,
        total_results: 1,
      });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_MOVIE_REVIEWS,
        variables: { id: '1', reviewsPage: 1 },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith('movie/1', {
        append_to_response: 'videos,credits',
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith('movie/1/reviews', {
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
        page: 1,
      });

      expect(data!.movie.reviews).toMatchSnapshot();
    });

    it('fetches the reviews of a movie from TheMovieDB API and returns the result correctly and returns hasMore field as true when has more items to be pagianted', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({ reviews: {} }).mockReturnValueOnce({
        id: 1,
        page: 1,
        results: [review],
        total_pages: 2,
        total_results: 2,
      });

      const server = makeTestServer();

      const { query } = createTestClient(server);

      const { data } = await query({
        query: GET_MOVIE_REVIEWS,
        variables: { id: '1', reviewsPage: 1 },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith('movie/1', {
        append_to_response: 'videos,credits',
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith('movie/1/reviews', {
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
        page: 1,
      });

      expect(data!.movie.reviews).toMatchSnapshot();
    });
  });

  describe('Query - Movie Detail', () => {
    it('should query the details of a movie from TheMovieDB API and returns the result correctly', async () => {
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
        append_to_response: 'videos,credits',
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'pt-br',
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(GENRE_MOVIE_ENDPOINT, {
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'pt-br',
      });

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

      expect(data!.trending_movies).toMatchSnapshot();
    });
  });
});
