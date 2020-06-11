const mockRestDataSourceGet = jest.fn();

import { Iso6391Language, SearchType } from '../../../../../lib/types';
import { SearchQueryEmpty } from '../../../../../errors';
import {
  rawSearchTvShow,
  searchTvShow,
  rawSearchMovie,
  searchMovie,
  rawSearchPeople,
} from '../../../../../../__tests__/mocks/search';
import CONSTANTS from '../../utils/constants';
import SearchHandler from './SearchHandler';

const searchTvShowWithRawMediaGenres = {
  ...searchTvShow,
  genre_ids: rawSearchTvShow.genre_ids,
};

const searchMovieWithRawMediaGenres = {
  ...searchMovie,
  genre_ids: rawSearchMovie.genre_ids,
};

describe('Unity: DataSources/TheMovieDBAPI/handlers/PersonHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('handle()', () => {
    describe('Testing Search for a TV Show', () => {
      it('should search for a tv shows based on a query and return the list of results that matches with the query provided', async () => {
        mockRestDataSourceGet.mockReturnValueOnce({
          results: [rawSearchTvShow],
          total_results: 1,
          hasMore: false,
        });

        const params = {
          language: Iso6391Language.Ptbr,
          type: SearchType.Tv,
          query: 'some',
          page: 1,
        };

        const personHandler = new SearchHandler(mockRestDataSourceGet);

        const { hasMore, totalResults, items } = await personHandler.handle(params);

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          `${CONSTANTS.SEARCH_ENDPOINT}/${params.type.toLowerCase()}`,
          {
            query: params.query,
            page: params.page,
          },
          Iso6391Language.Ptbr,
        );

        expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

        expect(items).toEqual([searchTvShowWithRawMediaGenres]);

        expect(totalResults).toEqual(1);

        expect(hasMore).toEqual(false);
      });

      it('should return "hasMore" as "true" when has more items to be paginated when search for tv shows', async () => {
        mockRestDataSourceGet.mockReturnValueOnce({
          results: [rawSearchTvShow],
          total_results: 1,
          total_pages: 2,
          hasMore: false,
        });

        const params = {
          type: SearchType.Tv,
          query: 'some',
          page: 1,
        };

        const personHandler = new SearchHandler(mockRestDataSourceGet);

        const { hasMore, totalResults, items } = await personHandler.handle(params);

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          `${CONSTANTS.SEARCH_ENDPOINT}/${params.type.toLowerCase()}`,
          {
            page: params.page,
            query: params.query,
          },
          undefined,
        );

        expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

        expect(items).toEqual([rawSearchTvShow]);

        expect(totalResults).toEqual(1);

        expect(hasMore).toEqual(true);
      });
    });

    describe('Testing Search for a Movie', () => {
      it('should search for a movie based on a query and return the list of results that matches with the query provided', async () => {
        mockRestDataSourceGet.mockReturnValueOnce({
          results: [rawSearchMovie],
          total_results: 1,
          hasMore: false,
        });

        const params = {
          language: Iso6391Language.Ptbr,
          type: SearchType.Movie,
          query: 'some',
          page: 1,
        };

        const personHandler = new SearchHandler(mockRestDataSourceGet);

        const { hasMore, totalResults, items } = await personHandler.handle(params);

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          `${CONSTANTS.SEARCH_ENDPOINT}/${params.type.toLowerCase()}`,
          {
            page: params.page,
            query: params.query,
          },
          Iso6391Language.Ptbr,
        );

        expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

        expect(items).toEqual([searchMovieWithRawMediaGenres]);

        expect(totalResults).toEqual(1);

        expect(hasMore).toEqual(false);
      });

      it('should return the field "hasMore" as "true" when has more items to be paginated when search for movies', async () => {
        mockRestDataSourceGet.mockReturnValueOnce({
          results: [rawSearchMovie],
          total_results: 1,
          total_pages: 2,
          hasMore: false,
        });

        const params = {
          type: SearchType.Movie,
          query: 'some',
          page: 1,
        };

        const personHandler = new SearchHandler(mockRestDataSourceGet);

        const { hasMore, totalResults, items } = await personHandler.handle(params);

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          `${CONSTANTS.SEARCH_ENDPOINT}/${params.type.toLowerCase()}`,
          {
            page: params.page,
            query: params.query,
          },
          undefined,
        );

        expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

        expect(items).toEqual([searchMovieWithRawMediaGenres]);

        expect(totalResults).toEqual(1);

        expect(hasMore).toEqual(true);
      });
    });

    describe('Testing Search for a Person', () => {
      it('should search for a person based on a query and return the list of results that matches with the query provided', async () => {
        mockRestDataSourceGet.mockReturnValueOnce({
          results: [rawSearchPeople],
          total_results: 1,
          hasMore: false,
        });

        const params = {
          language: Iso6391Language.Ptbr,
          type: SearchType.Person,
          query: 'some',
          page: 1,
        };

        const personHandler = new SearchHandler(mockRestDataSourceGet);

        const { hasMore, totalResults, items } = await personHandler.handle(params);

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          `${CONSTANTS.SEARCH_ENDPOINT}/${params.type.toLowerCase()}`,
          {
            page: params.page,
            query: params.query,
          },
          Iso6391Language.Ptbr,
        );

        expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

        expect(items).toEqual([rawSearchPeople]);

        expect(totalResults).toEqual(1);

        expect(hasMore).toEqual(false);
      });

      it('should return the field "hasMore" as "true" when has more items to be paginated when search for person', async () => {
        const mockRestDataSourceGet = jest.fn().mockReturnValueOnce({
          total_results: 1,
          results: [rawSearchPeople],
          total_pages: 2,
          hasMore: false,
        });

        const params = {
          type: SearchType.Person,
          query: 'some',
          page: 1,
        };

        const personHandler = new SearchHandler(mockRestDataSourceGet);

        const { hasMore, totalResults, items } = await personHandler.handle(params);

        expect(mockRestDataSourceGet).toHaveBeenCalledWith(
          `${CONSTANTS.SEARCH_ENDPOINT}/${params.type.toLowerCase()}`,
          {
            page: params.page,
            query: params.query,
          },
          undefined,
        );

        expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

        expect(items).toEqual([rawSearchPeople]);

        expect(totalResults).toEqual(1);

        expect(hasMore).toEqual(true);
      });
    });
  });

  it('should throw an error when the query is empty', async () => {
    const params = {
      type: SearchType.Person,
      query: '',
      page: 1,
    };

    const personHandler = new SearchHandler(mockRestDataSourceGet);

    expect(personHandler.handle(params)).rejects.toEqual(new SearchQueryEmpty());
  });
});
