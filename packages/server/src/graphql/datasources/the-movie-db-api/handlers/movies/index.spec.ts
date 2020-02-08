const mockRestDataSourceGet = jest.fn();

import { rawMovie, rawMovieDetail } from '../../../../../__tests__/mocks/movies.stub';
import { getImagesResult } from '../../../../../__tests__/mocks/images.stub';
import { TrendingMoviesEndpoints } from '../../../../../types';
import { Iso6391Language } from '../../../../../lib/types';
import CONSTANTS from '../../utils/constants';
import MovieHandler from '.';

const movieHandler = new MovieHandler(mockRestDataSourceGet);

describe('Unity: MovieHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getImages()', () => {
    it('should return an array of strings containing urls to images of a certain movie', async () => {
      mockRestDataSourceGet.mockReturnValueOnce(getImagesResult);

      const result = await movieHandler.getImages('1');

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.MOVIE_ENDPOINT}/1/${CONSTANTS.MOVIE_IMAGES_RESOURCE_ENDPOINT}`,
        {},
        null,
      );

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(result).toMatchSnapshot();
    });

    it("should return an empty array when the movie requested doesn't exists", async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        status_code: CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE,
      });

      const result = await movieHandler.getImages('1');

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.MOVIE_ENDPOINT}/1/${CONSTANTS.MOVIE_IMAGES_RESOURCE_ENDPOINT}`,
        {},
        null,
      );

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(result).toEqual([]);
    });
  });

  describe('getTrendingItem()', () => {
    it('should return an array of the now playing movies from the TheMovieDB API', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        total_pages: 1,
        total_results: 1,
        results: [rawMovie],
      });

      const result = await movieHandler.getTrendingItem(
        {
          page: 1,
          language: Iso6391Language.Ptbr,
        },
        TrendingMoviesEndpoints.NowPlaying,
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        TrendingMoviesEndpoints.NowPlaying,
        { page: 1 },
        Iso6391Language.Ptbr,
      );
      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
      expect(result.items).toMatchSnapshot();
      expect(result.hasMore).toEqual(false);
      expect(result.total_pages).toEqual(1);
      expect(result.total_results).toEqual(1);
    });

    it('should return an array of the popular movies from the TheMovieDB API', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        total_pages: 1,
        total_results: 1,
        results: [rawMovie],
      });

      const result = await movieHandler.getTrendingItem(
        {
          page: 1,
          language: Iso6391Language.Ptbr,
        },
        TrendingMoviesEndpoints.Popular,
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        TrendingMoviesEndpoints.Popular,
        { page: 1 },
        Iso6391Language.Ptbr,
      );
      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
      expect(result.items).toMatchSnapshot();
      expect(result.hasMore).toEqual(false);
      expect(result.total_pages).toEqual(1);
      expect(result.total_results).toEqual(1);
    });

    it('should return an array of the top rated movies from the TheMovieDB API', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        total_pages: 1,
        total_results: 1,
        results: [rawMovie],
      });

      const result = await movieHandler.getTrendingItem(
        {
          page: 1,
          language: Iso6391Language.Ptbr,
        },
        TrendingMoviesEndpoints.TopRated,
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        TrendingMoviesEndpoints.TopRated,
        { page: 1 },
        Iso6391Language.Ptbr,
      );
      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
      expect(result.items).toMatchSnapshot();
      expect(result.hasMore).toEqual(false);
      expect(result.total_pages).toEqual(1);
      expect(result.total_results).toEqual(1);
    });

    it('should return an array of the upcoming movies from the TheMovieDB API', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        total_pages: 1,
        total_results: 1,
        results: [rawMovie],
      });

      const result = await movieHandler.getTrendingItem(
        {
          page: 1,
          language: Iso6391Language.Ptbr,
        },
        TrendingMoviesEndpoints.Upcoming,
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        TrendingMoviesEndpoints.Upcoming,
        { page: 1 },
        Iso6391Language.Ptbr,
      );
      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
      expect(result.items).toMatchSnapshot();
      expect(result.hasMore).toEqual(false);
      expect(result.total_pages).toEqual(1);
      expect(result.total_results).toEqual(1);
    });
  });

  describe('getMovie()', () => {
    it('should get the details of a movie with certain id from TheMovideDB API', async () => {
      mockRestDataSourceGet.mockReturnValueOnce(rawMovieDetail);

      const result = await movieHandler.getMovie({
        id: '1',
        language: Iso6391Language.Ptbr,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.MOVIE_ENDPOINT}/1`,
        {
          append_to_response: 'videos,credits,reviews,similar',
        },
        'PTBR',
      );

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(result).toMatchSnapshot();
    });

    it("should return null when the movie doesn't exist", async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        status_code: CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE,
      });

      const result = await movieHandler.getMovie({
        id: '1',
        language: Iso6391Language.Ptbr,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.MOVIE_ENDPOINT}/1`,
        {
          append_to_response: 'videos,credits,reviews,similar',
        },
        'PTBR',
      );

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(result).toBeNull();
    });
  });
});
