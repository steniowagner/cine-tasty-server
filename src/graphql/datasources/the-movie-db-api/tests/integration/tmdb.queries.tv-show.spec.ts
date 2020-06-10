const mockRestDataSourceGet = jest.fn();

import { gql } from 'apollo-server';

import { getImagesResult, images } from '../../../../../../__tests__/mocks/images';
import MEDIA_GENRES_CONSTANTS from '../../handlers/media-genres/utils/constants';
import { tvGenres } from '../../../../../../__tests__/mocks/mediaGenres';
import { TrendingTVShowsEndpoints } from '../../../../../@types';
import { Iso6391Language } from '../../../../../lib/types';
import {
  rawTVShowDetail,
  tvShowDetail,
  rawTVShow,
  tvshow,
} from '../../../../../../__tests__/mocks/tvshows';
import env from '../../../../../config/environment';
import CONSTANTS from '../../utils/constants';
import makeTestQuery from './makeTestQuery';

const GET_TRENDING_TV_SHOWS = gql`
  fragment TrendingTVShowItem on BaseTVShow {
    originCountry
    originalName
    name
    firstAirDate
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

  query TrendingTVShows($page: Int!) {
    trendingTvShows {
      onTheAir(args: { page: $page }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingTVShowItem
        }
      }
      popular(args: { page: $page }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingTVShowItem
        }
      }
      topRated(args: { page: $page }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingTVShowItem
        }
      }
    }
  }
`;

const GET_TV_SHOW_DETAIL = gql`
  query TVShowDetail($id: ID!, $language: ISO6391Language) {
    tvShow(id: $id, language: $language) {
      seasons {
        airDate
        episodeCount
        id
        name
        overview
        posterPath
        seasonNumber
      }
      lastEpisodeToAir {
        airDate
        episodeNumber
        id
        name
        overview
        productionCode
        seasonNumber
        showId
        stillPath
        voteAverage
        voteCount
      }
      backdropPath
      createdBy {
        id
        creditId
        name
        gender
        profilePath
      }
      networks {
        name
        id
        logoPath
        originCountry
      }
      episodeRunTime
      firstAirDate
      homepage
      id
      inProduction
      languages
      lastAirDate
      genres
      name
      status
      type
      voteAverage
      voteCount
      productionCompanies {
        id
        logoPath
        name
        originCountry
      }
      originalLanguage
      originalName
      overview
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
      cast {
        name
        profilePath
        id
        character
        gender
        order
      }
      crew {
        department
        id
        job
        name
        gender
        profilePath
      }
      similar {
        originCountry
        originalName
        name
        firstAirDate
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
      popularity
      posterPath
      numberOfEpisodes
      numberOfSeasons
      originCountry
      reviews {
        author
        content
        id
        url
      }
    }
  }
`;

const GET_TV_SHOW_IMAGES = gql`
  query TVShowImages($id: ID!) {
    tvShow(id: $id) {
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

describe('Integration: DataSources-TVShow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Query - Trending TV Shows', () => {
    it('should query the on-the-air/popular/top_rated tv shows from TheMovieDB API and returns the result correctly', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({
          total_pages: 1,
          total_results: 1,
          results: [rawTVShow],
        })
        .mockReturnValueOnce({
          total_pages: 1,
          total_results: 1,
          results: [rawTVShow],
        })
        .mockReturnValueOnce({
          total_pages: 1,
          total_results: 1,
          results: [rawTVShow],
        })
        .mockReturnValueOnce({ genres: tvGenres })
        .mockReturnValueOnce({ genres: tvGenres })
        .mockReturnValueOnce({ genres: tvGenres });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_TRENDING_TV_SHOWS,
        variables: { page: 1 },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(6);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        TrendingTVShowsEndpoints.OnTheAir,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
          page: 1,
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        TrendingTVShowsEndpoints.Popular,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
          page: 1,
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        TrendingTVShowsEndpoints.TopRated,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
          page: 1,
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        MEDIA_GENRES_CONSTANTS.GENRE_TV_SHOW_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        MEDIA_GENRES_CONSTANTS.GENRE_TV_SHOW_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        MEDIA_GENRES_CONSTANTS.GENRE_TV_SHOW_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(data.trendingTvShows).toEqual({
        onTheAir: {
          hasMore: false,
          totalPages: 1,
          totalResults: 1,
          items: [tvshow],
        },
        topRated: {
          hasMore: false,
          totalPages: 1,
          totalResults: 1,
          items: [tvshow],
        },
        popular: {
          hasMore: false,
          totalPages: 1,
          totalResults: 1,
          items: [tvshow],
        },
      });
    });

    it('should query the on-the-air/popular/top_rated tv shows from TheMovieDB API and return the field hasMore as true when has more items to be paginated', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({
          total_pages: 2,
          total_results: 2,
          results: [rawTVShow],
        })
        .mockReturnValueOnce({
          total_pages: 2,
          total_results: 2,
          results: [rawTVShow],
        })
        .mockReturnValueOnce({
          total_pages: 2,
          total_results: 2,
          results: [rawTVShow],
        })
        .mockReturnValueOnce({ genres: tvGenres })
        .mockReturnValueOnce({ genres: tvGenres })
        .mockReturnValueOnce({ genres: tvGenres });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_TRENDING_TV_SHOWS,
        variables: { page: 1 },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(6);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        TrendingTVShowsEndpoints.OnTheAir,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
          page: 1,
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        TrendingTVShowsEndpoints.Popular,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
          page: 1,
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        TrendingTVShowsEndpoints.TopRated,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
          page: 1,
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        MEDIA_GENRES_CONSTANTS.GENRE_TV_SHOW_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        MEDIA_GENRES_CONSTANTS.GENRE_TV_SHOW_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        MEDIA_GENRES_CONSTANTS.GENRE_TV_SHOW_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(data.trendingTvShows).toEqual({
        onTheAir: {
          hasMore: true,
          totalPages: 2,
          totalResults: 2,
          items: [tvshow],
        },
        topRated: {
          hasMore: true,
          totalPages: 2,
          totalResults: 2,
          items: [tvshow],
        },
        popular: {
          hasMore: true,
          totalPages: 2,
          totalResults: 2,
          items: [tvshow],
        },
      });
    });
  });

  describe('Query - TV Show Detail', () => {
    it('should query the details of a tv show from TheMovieDB API and returns the result correctly', async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce(rawTVShowDetail)
        .mockReturnValueOnce({ genres: tvGenres })
        .mockReturnValueOnce({ genres: tvGenres });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_TV_SHOW_DETAIL,
        variables: { id: '1', language: Iso6391Language.Ptbr },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(3);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(`${CONSTANTS.TV_ENDPOINT}/1`, {
        append_to_response: CONSTANTS.APPEND_TO_TV_SHOW_RESPONSE,
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'pt-br',
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        MEDIA_GENRES_CONSTANTS.GENRE_TV_SHOW_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(data.tvShow).toEqual(tvShowDetail);
    });
  });

  describe('Query - TV Show Images', () => {
    const id = '1';

    it('should query the images of a tv show from TheMovieDB API and returns the result correctly', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({}).mockReturnValueOnce(getImagesResult);

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_TV_SHOW_IMAGES,
        variables: { id },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(2);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(`${CONSTANTS.TV_ENDPOINT}/1`, {
        append_to_response: CONSTANTS.APPEND_TO_TV_SHOW_RESPONSE,
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.TV_ENDPOINT}/${id}/${CONSTANTS.TV_IMAGES_RESOURCE_ENDPOINT}`,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(data.tvShow.images).toEqual(images);
    });

    it("should query the images of a movie from TheMovieDB API and returns an empty array when the movie doesn't exist", async () => {
      mockRestDataSourceGet
        .mockReturnValueOnce({})
        .mockReturnValueOnce({ status_code: CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE });

      const query = makeTestQuery();

      const { data } = await query({
        query: GET_TV_SHOW_IMAGES,
        variables: { id: '1' },
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(2);

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(`${CONSTANTS.TV_ENDPOINT}/1`, {
        append_to_response: CONSTANTS.APPEND_TO_TV_SHOW_RESPONSE,
        api_key: env.THE_MOVIE_DB_API_KEY,
        language: 'en-us',
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.TV_ENDPOINT}/1/${CONSTANTS.TV_IMAGES_RESOURCE_ENDPOINT}`,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(data.tvShow.images).toEqual([]);
    });
  });
});
