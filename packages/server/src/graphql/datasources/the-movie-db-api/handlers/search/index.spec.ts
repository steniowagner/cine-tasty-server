const mockRestDataSourceGet = jest.fn();

import SearchHandler from '.';
import {
  rawSearchTvShow,
  searchTvShow,
  rawSearchMovie,
  searchMovie,
  rawSearchPeople,
} from '../../../../../__tests__/mocks/search.stub';
import { SearchType } from '../../../../../lib/types';
import { SearchQueryEmpty } from '../../../../../errors';
import CONSTANTS from '../../utils/constants';

const searchTvShowWithRawMediaGenres = {
  ...searchTvShow,
  genre_ids: rawSearchTvShow.genre_ids,
};

const searchMovieWithRawMediaGenres = {
  ...searchMovie,
  genre_ids: rawSearchMovie.genre_ids,
};

describe('Unity: Search', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('search()', () => {
    describe('Search for a TV Show', () => {
      it('should search for a tv shows based on a query and return the list of results that matches with the query provided', async () => {
        mockRestDataSourceGet.mockReturnValueOnce({
          total_results: 1,
          results: [rawSearchTvShow],
          hasMore: false,
        });

        const params = {
          type: SearchType.Tv,
          page: 1,
          query: 'some',
        };

        const personHandler = new SearchHandler(mockRestDataSourceGet);

        const { hasMore, total_results, items } = await personHandler.search(params);

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          `${CONSTANTS.SEARCH_ENDPOINT}/${params.type.toLowerCase()}`,
          {
            page: params.page,
            query: params.query,
          },
          undefined,
        );

        expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
        expect(items).toEqual([searchTvShowWithRawMediaGenres]);
        expect(total_results).toEqual(1);
        expect(hasMore).toEqual(false);
      });

      it('should return hasMore as true when has more items to be paginated when search for tv shows', async () => {
        mockRestDataSourceGet.mockReturnValueOnce({
          total_results: 1,
          results: [rawSearchTvShow],
          total_pages: 2,
          hasMore: false,
        });

        const params = {
          type: SearchType.Tv,
          page: 1,
          query: 'some',
        };

        const personHandler = new SearchHandler(mockRestDataSourceGet);

        const { hasMore, total_results, items } = await personHandler.search(params);

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          `${CONSTANTS.SEARCH_ENDPOINT}/${params.type.toLowerCase()}`,
          {
            page: params.page,
            query: params.query,
          },
          undefined,
        );

        expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
        expect(items).toEqual([rawSearchTvShow]);
        expect(total_results).toEqual(1);
        expect(hasMore).toEqual(true);
      });
    });

    describe('Search for a Movie', () => {
      it('should search for a movie based on a query and return the list of results that matches with the query provided', async () => {
        mockRestDataSourceGet.mockReturnValueOnce({
          total_results: 1,
          results: [rawSearchMovie],
          hasMore: false,
        });

        const params = {
          type: SearchType.Movie,
          page: 1,
          query: 'some',
        };

        const personHandler = new SearchHandler(mockRestDataSourceGet);

        const { hasMore, total_results, items } = await personHandler.search(params);

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          `${CONSTANTS.SEARCH_ENDPOINT}/${params.type.toLowerCase()}`,
          {
            page: params.page,
            query: params.query,
          },
          undefined,
        );

        expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
        expect(items).toEqual([searchMovieWithRawMediaGenres]);
        expect(total_results).toEqual(1);
        expect(hasMore).toEqual(false);
      });

      it('should return hasMore as true when has more items to be paginated when search for movies', async () => {
        mockRestDataSourceGet.mockReturnValueOnce({
          total_results: 1,
          results: [rawSearchMovie],
          total_pages: 2,
          hasMore: false,
        });

        const params = {
          type: SearchType.Movie,
          page: 1,
          query: 'some',
        };

        const personHandler = new SearchHandler(mockRestDataSourceGet);

        const { hasMore, total_results, items } = await personHandler.search(params);

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          `${CONSTANTS.SEARCH_ENDPOINT}/${params.type.toLowerCase()}`,
          {
            page: params.page,
            query: params.query,
          },
          undefined,
        );

        expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
        expect(items).toEqual([searchMovieWithRawMediaGenres]);
        expect(total_results).toEqual(1);
        expect(hasMore).toEqual(true);
      });
    });

    describe('Search for a Person', () => {
      it('should search for a person based on a query and return the list of results that matches with the query provided', async () => {
        mockRestDataSourceGet.mockReturnValueOnce({
          total_results: 1,
          results: [rawSearchPeople],
          hasMore: false,
        });

        const params = {
          type: SearchType.Person,
          page: 1,
          query: 'some',
        };

        const personHandler = new SearchHandler(mockRestDataSourceGet);

        const { hasMore, total_results, items } = await personHandler.search(params);

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          `${CONSTANTS.SEARCH_ENDPOINT}/${params.type.toLowerCase()}`,
          {
            page: params.page,
            query: params.query,
          },
          undefined,
        );

        expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
        expect(items).toEqual([rawSearchPeople]);
        expect(total_results).toEqual(1);
        expect(hasMore).toEqual(false);
      });

      it('should return hasMore as true when has more items to be paginated when search for person', async () => {
        const mockRestDataSourceGet = jest.fn().mockReturnValueOnce({
          total_results: 1,
          results: [rawSearchPeople],
          total_pages: 2,
          hasMore: false,
        });

        const params = {
          type: SearchType.Person,
          page: 1,
          query: 'some',
        };

        const personHandler = new SearchHandler(mockRestDataSourceGet);

        const { hasMore, total_results, items } = await personHandler.search(params);

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          `${CONSTANTS.SEARCH_ENDPOINT}/${params.type.toLowerCase()}`,
          {
            page: params.page,
            query: params.query,
          },
          undefined,
        );

        expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
        expect(items).toEqual([rawSearchPeople]);
        expect(total_results).toEqual(1);
        expect(hasMore).toEqual(true);
      });
    });
  });

  it('should throw an error when the query is empty', async () => {
    const params = {
      type: SearchType.Person,
      page: 1,
      query: '',
    };

    const personHandler = new SearchHandler(mockRestDataSourceGet);

    expect(personHandler.search(params)).rejects.toEqual(new SearchQueryEmpty());
  });
});
