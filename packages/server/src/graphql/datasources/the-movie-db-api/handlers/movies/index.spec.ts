const mockRestDataSourceGet = jest.fn();

import { rawMovie, rawMovieDetail } from '../../../../../__tests__/mocks/movies.stub';
import { review } from '../../../../../__tests__/mocks/review.stub';
import { TrendingMoviesEndpoints } from '../../../../../types';
import { Iso6391Language } from '../../../../../lib/types';
import CONSTANTS from '../../utils/constants';
import MovieHandler from '.';

describe('Unity: MovieHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTrendingItem()', () => {
    it('should return an array of the now playing movies from the TheMovieDB API', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        total_pages: 1,
        total_results: 1,
        results: [rawMovie],
      });

      const movieHandler = new MovieHandler(mockRestDataSourceGet);

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

      const movieHandler = new MovieHandler(mockRestDataSourceGet);

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

      const movieHandler = new MovieHandler(mockRestDataSourceGet);

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

      const movieHandler = new MovieHandler(mockRestDataSourceGet);

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

      const movieHandler = new MovieHandler(mockRestDataSourceGet);

      const result = await movieHandler.getMovie({
        id: '1',
        language: Iso6391Language.Ptbr,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        'movie/1',
        {
          append_to_response: 'videos,credits',
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

      const movieHandler = new MovieHandler(mockRestDataSourceGet);

      const result = await movieHandler.getMovie({
        id: '1',
        language: Iso6391Language.Ptbr,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        'movie/1',
        {
          append_to_response: 'videos,credits',
        },
        'PTBR',
      );

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(result).toBeNull();
    });
  });

  describe('getSimilars()', () => {
    it('should get similar movies of a movie with certain id from TheMovideDB API', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        id: 1,
        page: 1,
        results: [rawMovie],
        total_pages: 1,
        total_results: 1,
      });

      const movieHandler = new MovieHandler(mockRestDataSourceGet);

      const result = await movieHandler.getSimilars({
        id: '1',
        similarsPage: 1,
        language: Iso6391Language.Ptbr,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        'movie/1/similar',
        {
          page: 1,
        },
        'PTBR',
      );

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(result).toEqual({
        hasMore: false,
        total_pages: 1,
        total_results: 1,
        items: [rawMovie],
      });

      expect(result.hasMore).toEqual(false);
    });

    it('should get similar movies of a movie with certain id from TheMovideDB API and return hasMore as true when has more items to be paginated', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        id: 1,
        page: 1,
        results: [rawMovie],
        total_pages: 2,
        total_results: 2,
      });

      const movieHandler = new MovieHandler(mockRestDataSourceGet);

      const result = await movieHandler.getSimilars({
        id: '1',
        similarsPage: 1,
        language: Iso6391Language.Ptbr,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        'movie/1/similar',
        {
          page: 1,
        },
        'PTBR',
      );

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(result).toEqual({
        hasMore: true,
        total_pages: 2,
        total_results: 2,
        items: [rawMovie],
      });

      expect(result.hasMore).toEqual(true);
    });
  });

  describe('getReviews()', () => {
    it('should get the reviews of a movie with certain id from TheMovideDB API', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        id: 1,
        page: 1,
        results: [review],
        total_pages: 1,
        total_results: 1,
      });

      const movieHandler = new MovieHandler(mockRestDataSourceGet);

      const result = await movieHandler.getReviews({
        id: '1',
        reviewsPage: 1,
        language: Iso6391Language.Ptbr,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        'movie/1/reviews',
        { page: 1 },
        Iso6391Language.Ptbr,
      );

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(result).toEqual({
        hasMore: false,
        total_pages: 1,
        total_results: 1,
        items: [review],
      });

      expect(result.hasMore).toEqual(false);
    });

    it('should get the reviews of a movie with certain id from TheMovideDB API and return hasMore as true when has more items to be paginated', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        id: 1,
        page: 1,
        results: [review],
        total_pages: 2,
        total_results: 2,
      });

      const movieHandler = new MovieHandler(mockRestDataSourceGet);

      const result = await movieHandler.getReviews({
        id: '1',
        reviewsPage: 1,
        language: Iso6391Language.Ptbr,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        'movie/1/reviews',
        { page: 1 },
        Iso6391Language.Ptbr,
      );

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(result).toEqual({
        hasMore: true,
        total_pages: 2,
        total_results: 2,
        items: [review],
      });

      expect(result.hasMore).toEqual(true);
    });
  });
});
