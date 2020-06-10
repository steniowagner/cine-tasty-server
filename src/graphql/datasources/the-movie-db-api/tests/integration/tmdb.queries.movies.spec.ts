const mockRestDataSourceGet = jest.fn();

import { gql } from 'apollo-server';

import { getImagesResult, images } from '../../../../../__tests__/mocks/images.stub';
import MEDIA_GENRES_CONSTANTS from '../../handlers/media-genres/utils/constants';
import { movieGenres } from '../../../../../../__tests__/mocks/mediaGenres';
import MOVIES_CONSTANTS from '../../handlers/movies/utils/constants';
import { TrendingMoviesEndpoints } from '../../../../../@types';
import env from '../../../../../config/environment';
import {
  rawMovie,
  rawMovieDetail,
  movieDetail,
  movie,
} from '../../../../../../__tests__/mocks/movies';
import CONSTANTS from '../../utils/constants';
import makeTestQuery from './makeTestQuery';

const GET_TRENDING_MOVIES = gql`
  fragment TrendingMovieItem on BaseMovie {
    genreIds
    originalTitle
    video
    title
    adult
    releaseDate
    backdropPath
    overview
    voteAverage
    posterPath
    popularity
    originalLanguage
    voteCount
    overview
    id
  }

  query TrendingMovies($page: Int!) {
    trendingMovies {
      nowPlaying(args: { page: $page }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingMovieItem
        }
      }
      popular(args: { page: $page }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingMovieItem
        }
      }
      topRated(args: { page: $page }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingMovieItem
        }
      }
      upcoming(args: { page: $page }) {
        totalResults
        totalPages
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
      backdropPath
      genres(language: $language)
      id
      originalLanguage
      originalTitle
      overview
      posterPath
      popularity
      video
      title
      voteAverage
      releaseDate
      productionCompanies {
        id
        logoPath
        name
        originCountry
      }
      voteCount
      runtime
      status
      tagline
      budget
      homepage
      revenue
      spokenLanguages
      productionCountries
      cast {
        name
        profilePath
        id
        character
      }
      crew {
        department
        id
        job
        name
        profilePath
      }
      videos {
        thumbnail {
          extraSmall
          small
          medium
          large
          extraLarge
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
        originalTitle
        video
        title
        adult
        releaseDate
        backdropPath
        genreIds
        overview
        voteAverage
        posterPath
        popularity
        originalLanguage
        voteCount
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

describe('Integration: DataSources/TheMovieDBAPI/Movies - Queries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Testing Query - Movie Images', () => {
    it('should query the images of a movie and return the result correctly', async () => {
      const id = '1';

      mockRestDataSourceGet.mockReturnValueOnce({}).mockReturnValueOnce(getImagesResult);

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_MOVIE_IMAGES,
        variables: { id },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(2);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.MOVIE_ENDPOINT}/${id}`,
        {
          append_to_response: MOVIES_CONSTANTS.APPEND_TO_MOVIE_RESPONSE,
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.MOVIE_ENDPOINT}/${id}/${CONSTANTS.MOVIE_IMAGES_RESOURCE_ENDPOINT}`,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
        },
      );

      expect(data.movie.images).toEqual(images);
    });

    it("should query the images of a movie return an empty array when the movie doesn't exist", async () => {
      const id = '1';

      mockRestDataSourceGet
        .mockReturnValueOnce({})
        .mockReturnValueOnce({ status_code: CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_MOVIE_IMAGES,
        variables: { id },
      });

      expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.MOVIE_ENDPOINT}/${id}`,
        {
          append_to_response: MOVIES_CONSTANTS.APPEND_TO_MOVIE_RESPONSE,
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.MOVIE_ENDPOINT}/${id}/${CONSTANTS.MOVIE_IMAGES_RESOURCE_ENDPOINT}`,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
        },
      );

      expect(data.movie.images).toEqual([]);
    });
  });

  describe('Testing Query - Movie Detail', () => {
    it('should query the details of a movie and return the results correctly', async () => {
      const id = '1';

      mockRestDataSourceGet
        .mockReturnValueOnce(rawMovieDetail)
        .mockReturnValueOnce({ genres: movieGenres })
        .mockReturnValueOnce({ genres: movieGenres });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_MOVIE_DETAIL,
        variables: { id, language: 'PTBR' },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(3);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.MOVIE_ENDPOINT}/${id}`,

        {
          append_to_response: MOVIES_CONSTANTS.APPEND_TO_MOVIE_RESPONSE,
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

      expect(data.movie).toEqual(movieDetail);
    });
  });

  describe('Testing Query - Trending Movies', () => {
    it('should query the now playing/popular/top_rated/upcoming movies and return the result correctly', async () => {
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

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_TRENDING_MOVIES,
        variables: { page: 1 },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(8);

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

      expect(data.trendingMovies.nowPlaying).toEqual({
        totalResults: 1,
        totalPages: 1,
        hasMore: false,
        items: [movie],
      });

      expect(data.trendingMovies.popular).toEqual({
        totalResults: 1,
        totalPages: 1,
        hasMore: false,
        items: [movie],
      });

      expect(data.trendingMovies.topRated).toEqual({
        totalResults: 1,
        totalPages: 1,
        hasMore: false,
        items: [movie],
      });

      expect(data.trendingMovies.upcoming).toEqual({
        totalResults: 1,
        totalPages: 1,
        hasMore: false,
        items: [movie],
      });
    });

    it('should query the now-playing movies return the field "hasMore" as "true" when has more pages to be paginated', async () => {
      const GET_TRENDING_NOW_PLAYING_MOVIES = gql`
        fragment TrendingMovieItem on BaseMovie {
          genreIds
          originalTitle
          video
          title
          adult
          releaseDate
          backdropPath
          overview
          voteAverage
          posterPath
          popularity
          originalLanguage
          voteCount
          overview
          id
        }

        query TrendingMovies($page: Int!) {
          trendingMovies {
            nowPlaying(args: { page: $page }) {
              totalResults
              totalPages
              hasMore
              items {
                ...TrendingMovieItem
              }
            }
          }
        }
      `;

      mockRestDataSourceGet
        .mockReturnValueOnce({
          total_pages: 2,
          total_results: 1,
          results: [rawMovie],
        })
        .mockReturnValueOnce({ genres: movieGenres });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_TRENDING_NOW_PLAYING_MOVIES,
        variables: { page: 1 },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(2);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        TrendingMoviesEndpoints.NowPlaying,
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

      expect(data.trendingMovies.nowPlaying).toEqual({
        totalResults: 1,
        totalPages: 2,
        hasMore: true,
        items: [movie],
      });
    });

    it('should query the popular movies return the field "hasMore" as "true" when has more pages to be paginated', async () => {
      const GET_TRENDING_POPULAR_MOVIES = gql`
        fragment TrendingMovieItem on BaseMovie {
          genreIds
          originalTitle
          video
          title
          adult
          releaseDate
          backdropPath
          overview
          voteAverage
          posterPath
          popularity
          originalLanguage
          voteCount
          overview
          id
        }

        query TrendingMovies($page: Int!) {
          trendingMovies {
            popular(args: { page: $page }) {
              totalResults
              totalPages
              hasMore
              items {
                ...TrendingMovieItem
              }
            }
          }
        }
      `;

      mockRestDataSourceGet
        .mockReturnValueOnce({
          total_pages: 2,
          total_results: 1,
          results: [rawMovie],
        })
        .mockReturnValueOnce({ genres: movieGenres });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_TRENDING_POPULAR_MOVIES,
        variables: { page: 1 },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(2);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        TrendingMoviesEndpoints.Popular,
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

      expect(data.trendingMovies.popular).toEqual({
        totalResults: 1,
        totalPages: 2,
        hasMore: true,
        items: [movie],
      });
    });

    it('should query the top-rated movies return the field "hasMore" as "true" when has more pages to be paginated', async () => {
      const GET_TRENDING_TOP_RATED_MOVIES = gql`
        fragment TrendingMovieItem on BaseMovie {
          genreIds
          originalTitle
          video
          title
          adult
          releaseDate
          backdropPath
          overview
          voteAverage
          posterPath
          popularity
          originalLanguage
          voteCount
          overview
          id
        }

        query TrendingMovies($page: Int!) {
          trendingMovies {
            topRated(args: { page: $page }) {
              totalResults
              totalPages
              hasMore
              items {
                ...TrendingMovieItem
              }
            }
          }
        }
      `;

      mockRestDataSourceGet
        .mockReturnValueOnce({
          total_pages: 2,
          total_results: 1,
          results: [rawMovie],
        })
        .mockReturnValueOnce({ genres: movieGenres });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_TRENDING_TOP_RATED_MOVIES,
        variables: { page: 1 },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(2);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        TrendingMoviesEndpoints.TopRated,
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

      expect(data.trendingMovies.topRated).toEqual({
        totalResults: 1,
        totalPages: 2,
        hasMore: true,
        items: [movie],
      });
    });

    it('should query the upcoming movies return the field "hasMore" as "true" when has more pages to be paginated', async () => {
      const GET_TRENDING_UPCOMING_MOVIES = gql`
        fragment TrendingMovieItem on BaseMovie {
          genreIds
          originalTitle
          video
          title
          adult
          releaseDate
          backdropPath
          overview
          voteAverage
          posterPath
          popularity
          originalLanguage
          voteCount
          overview
          id
        }

        query TrendingMovies($page: Int!) {
          trendingMovies {
            upcoming(args: { page: $page }) {
              totalResults
              totalPages
              hasMore
              items {
                ...TrendingMovieItem
              }
            }
          }
        }
      `;

      mockRestDataSourceGet
        .mockReturnValueOnce({
          total_pages: 2,
          total_results: 1,
          results: [rawMovie],
        })
        .mockReturnValueOnce({ genres: movieGenres });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_TRENDING_UPCOMING_MOVIES,
        variables: { page: 1 },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(2);

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

      expect(data.trendingMovies.upcoming).toEqual({
        totalResults: 1,
        totalPages: 2,
        hasMore: true,
        items: [movie],
      });
    });
  });
});
