const mockRestDataSourceGet = jest.fn();

import { rawTVShow, rawTVShowDetail } from '../../../../../__tests__/mocks/tvShows.stub';
import { getImagesResult } from '../../../../../__tests__/mocks/images.stub';
import { review } from '../../../../../__tests__/mocks/review.stub';
import { Iso6391Language } from '../../../../../lib/types';
import { TrendingTVShowsEndpoints } from '../../../../../types';
import CONSTANTS from '../../utils/constants';
import TVShowHandler from '.';

describe('Unity: TVShowHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTrendingItem()', () => {
    describe('Fetching On the Air TV Shows', () => {
      it('should return an array of the on the air tv shows from the TheMovieDB API', async () => {
        mockRestDataSourceGet.mockReturnValueOnce({
          total_pages: 1,
          total_results: 1,
          results: [rawTVShow],
        });

        const tvShowHandler = new TVShowHandler(mockRestDataSourceGet);

        const result = await tvShowHandler.getTrendingItem(
          {
            page: 1,
            language: Iso6391Language.Ptbr,
          },
          TrendingTVShowsEndpoints.OnTheAir,
        );

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          TrendingTVShowsEndpoints.OnTheAir,
          { page: 1 },
          Iso6391Language.Ptbr,
        );
        expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
        expect(result.items).toMatchSnapshot();
        expect(result.hasMore).toEqual(false);
        expect(result.total_pages).toEqual(1);
        expect(result.total_results).toEqual(1);
      });

      it('should return the field hasMore as true when has more items to be paginated when fetching for on the air tv shows', async () => {
        mockRestDataSourceGet.mockReturnValueOnce({
          total_pages: 2,
          total_results: 2,
          results: [rawTVShow],
        });

        const tvShowHandler = new TVShowHandler(mockRestDataSourceGet);

        const result = await tvShowHandler.getTrendingItem(
          {
            page: 1,
            language: Iso6391Language.Ptbr,
          },
          TrendingTVShowsEndpoints.OnTheAir,
        );

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          TrendingTVShowsEndpoints.OnTheAir,
          { page: 1 },
          Iso6391Language.Ptbr,
        );
        expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
        expect(result.items).toMatchSnapshot();
        expect(result.hasMore).toEqual(true);
        expect(result.total_pages).toEqual(2);
        expect(result.total_results).toEqual(2);
      });
    });

    describe('Fetching Popular TV Shows', () => {
      it('should return an array of the popular tv shows from the TheMovieDB API', async () => {
        mockRestDataSourceGet.mockReturnValueOnce({
          total_pages: 1,
          total_results: 1,
          results: [rawTVShow],
        });

        const tvShowHandler = new TVShowHandler(mockRestDataSourceGet);

        const result = await tvShowHandler.getTrendingItem(
          {
            page: 1,
            language: Iso6391Language.Ptbr,
          },
          TrendingTVShowsEndpoints.Popular,
        );

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          TrendingTVShowsEndpoints.Popular,
          { page: 1 },
          Iso6391Language.Ptbr,
        );
        expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
        expect(result.items).toMatchSnapshot();
        expect(result.hasMore).toEqual(false);
        expect(result.total_pages).toEqual(1);
        expect(result.total_results).toEqual(1);
      });

      it('should return the field hasMore as true when has more items to be paginated when fetching for popular tv shows', async () => {
        mockRestDataSourceGet.mockReturnValueOnce({
          total_pages: 2,
          total_results: 2,
          results: [rawTVShow],
        });

        const tvShowHandler = new TVShowHandler(mockRestDataSourceGet);

        const result = await tvShowHandler.getTrendingItem(
          {
            page: 1,
            language: Iso6391Language.Ptbr,
          },
          TrendingTVShowsEndpoints.Popular,
        );

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          TrendingTVShowsEndpoints.Popular,
          { page: 1 },
          Iso6391Language.Ptbr,
        );
        expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
        expect(result.items).toMatchSnapshot();
        expect(result.hasMore).toEqual(true);
        expect(result.total_pages).toEqual(2);
        expect(result.total_results).toEqual(2);
      });
    });

    describe('Fetching Top Rated TV Shows', () => {
      it('should return an array of the top rated tv shows from the TheMovieDB API', async () => {
        mockRestDataSourceGet.mockReturnValueOnce({
          total_pages: 1,
          total_results: 1,
          results: [rawTVShow],
        });

        const tvShowHandler = new TVShowHandler(mockRestDataSourceGet);

        const result = await tvShowHandler.getTrendingItem(
          {
            page: 1,
            language: Iso6391Language.Ptbr,
          },
          TrendingTVShowsEndpoints.TopRated,
        );

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          TrendingTVShowsEndpoints.TopRated,
          { page: 1 },
          Iso6391Language.Ptbr,
        );
        expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
        expect(result.items).toMatchSnapshot();
        expect(result.hasMore).toEqual(false);
        expect(result.total_pages).toEqual(1);
        expect(result.total_results).toEqual(1);
      });

      it('should return the field hasMore as true when has more items to be paginated when fetching for top rated tv shows', async () => {
        mockRestDataSourceGet.mockReturnValueOnce({
          total_pages: 2,
          total_results: 2,
          results: [rawTVShow],
        });

        const tvShowHandler = new TVShowHandler(mockRestDataSourceGet);

        const result = await tvShowHandler.getTrendingItem(
          {
            page: 1,
            language: Iso6391Language.Ptbr,
          },
          TrendingTVShowsEndpoints.TopRated,
        );

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          TrendingTVShowsEndpoints.TopRated,
          { page: 1 },
          Iso6391Language.Ptbr,
        );
        expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
        expect(result.items).toMatchSnapshot();
        expect(result.hasMore).toEqual(true);
        expect(result.total_pages).toEqual(2);
        expect(result.total_results).toEqual(2);
      });
    });
  });

  describe('getTVShow()', () => {
    it('should get the details of a tv show with certain id from TheMovideDB API', async () => {
      mockRestDataSourceGet.mockReturnValueOnce(rawTVShowDetail);

      const tvshowHandler = new TVShowHandler(mockRestDataSourceGet);

      const result = await tvshowHandler.getTVShow({
        id: '1',
        language: Iso6391Language.Ptbr,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        'tv/1',
        {
          append_to_response: 'credits,similar,videos',
        },
        'PTBR',
      );

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(result).toMatchSnapshot();
    });

    it("should return null when the tv show doesn't exist", async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        status_code: CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE,
      });

      const movieHandler = new TVShowHandler(mockRestDataSourceGet);

      const result = await movieHandler.getTVShow({
        id: '1',
        language: Iso6391Language.Ptbr,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        'tv/1',
        {
          append_to_response: 'credits,similar,videos',
        },
        'PTBR',
      );

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(result).toBeNull();
    });
  });

  describe('getImages()', () => {
    it('should return an array of strings containing urls to images of a certain tv show', async () => {
      mockRestDataSourceGet.mockReturnValueOnce(getImagesResult);

      const tvshowHandler = new TVShowHandler(mockRestDataSourceGet);

      const result = await tvshowHandler.getImages('1');

      expect(mockRestDataSourceGet).toHaveBeenCalledWith('tv/1/images', {}, null);

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(result).toMatchSnapshot();
    });
  });

  describe('getReviews()', () => {
    it('should get the reviews of a tv show with certain id from TheMovideDB API', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        id: 1,
        page: 1,
        results: [review],
        total_pages: 1,
        total_results: 1,
      });

      const tvshowHandler = new TVShowHandler(mockRestDataSourceGet);

      const result = await tvshowHandler.getReviews({
        id: '1',
        reviewsPage: 1,
        language: Iso6391Language.Ptbr,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        'tv/1/reviews',
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

    it('should get the reviews of a tv show with certain id from TheMovideDB API and return hasMore as true when has more items to be paginated', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        id: 1,
        page: 1,
        results: [review],
        total_pages: 2,
        total_results: 2,
      });

      const tvshowHandler = new TVShowHandler(mockRestDataSourceGet);

      const result = await tvshowHandler.getReviews({
        id: '1',
        reviewsPage: 1,
        language: Iso6391Language.Ptbr,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        'tv/1/reviews',
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
