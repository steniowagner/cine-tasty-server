import SearchHandler from '.';
import {
  rawSearchTvShow,
  searchTvShow,
  rawSearchMovie,
  searchMovie,
  rawSearchPeople,
  searchPeople,
} from '../../../../../__tests__/mocks/search.stub';
import { movieGenres, tvGenres } from '../../../../../__tests__/mocks/mediaGenres.stub';
import { SearchType } from '../../../../../lib/types';
import { SearchQueryEmpty } from '../../../../../errors';

const BASE_ENDPOINT = '/search';

const mediaGenres = {
  movie: movieGenres,
  tv: tvGenres,
};

describe('[Search]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get an array of tv shows and return it correctly', async () => {
    const mockRestDataSourceGet = jest.fn().mockReturnValueOnce({
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

    const { hasMore, total_results, items } = await personHandler.search(
      params,
      mediaGenres,
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${BASE_ENDPOINT}/${params.type.toLowerCase()}`,
      {
        page: params.page,
        query: params.query,
      },
      undefined,
    );

    expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

    expect(items).toEqual([searchTvShow]);
    expect(total_results).toEqual(1);
    expect(hasMore).toEqual(false);
  });

  it('should return hasMore as true when has more items to be paginated when search for tv shows', async () => {
    const mockRestDataSourceGet = jest.fn().mockReturnValueOnce({
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

    const { hasMore, total_results, items } = await personHandler.search(
      params,
      mediaGenres,
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${BASE_ENDPOINT}/${params.type.toLowerCase()}`,
      {
        page: params.page,
        query: params.query,
      },
      undefined,
    );

    expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

    expect(items).toEqual([searchTvShow]);
    expect(total_results).toEqual(1);
    expect(hasMore).toEqual(true);
  });

  it('should get an array of movies and return it correctly', async () => {
    const mockRestDataSourceGet = jest.fn().mockReturnValueOnce({
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

    const { hasMore, total_results, items } = await personHandler.search(
      params,
      mediaGenres,
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${BASE_ENDPOINT}/${params.type.toLowerCase()}`,
      {
        page: params.page,
        query: params.query,
      },
      undefined,
    );

    expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

    expect(items).toEqual([searchMovie]);
    expect(total_results).toEqual(1);
    expect(hasMore).toEqual(false);
  });

  it('should return hasMore as true when has more items to be paginated when search for movies', async () => {
    const mockRestDataSourceGet = jest.fn().mockReturnValueOnce({
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

    const { hasMore, total_results, items } = await personHandler.search(
      params,
      mediaGenres,
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${BASE_ENDPOINT}/${params.type.toLowerCase()}`,
      {
        page: params.page,
        query: params.query,
      },
      undefined,
    );

    expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

    expect(items).toEqual([searchMovie]);
    expect(total_results).toEqual(1);
    expect(hasMore).toEqual(true);
  });

  it('should get an array of people and return it correctly', async () => {
    const mockRestDataSourceGet = jest.fn().mockReturnValueOnce({
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

    const { hasMore, total_results, items } = await personHandler.search(
      params,
      mediaGenres,
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${BASE_ENDPOINT}/${params.type.toLowerCase()}`,
      {
        page: params.page,
        query: params.query,
      },
      undefined,
    );

    expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

    expect(items).toEqual([searchPeople]);
    expect(total_results).toEqual(1);
    expect(hasMore).toEqual(false);
  });

  it('should return hasMore as true when has more items to be paginated when search for people', async () => {
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

    const { hasMore, total_results, items } = await personHandler.search(
      params,
      mediaGenres,
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${BASE_ENDPOINT}/${params.type.toLowerCase()}`,
      {
        page: params.page,
        query: params.query,
      },
      undefined,
    );

    expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

    expect(items).toEqual([searchPeople]);
    expect(total_results).toEqual(1);
    expect(hasMore).toEqual(true);
  });

  it('should throw an error when the query is empty', async () => {
    const mockRestDataSourceGet = jest.fn().mockReturnValueOnce({
      total_results: 1,
      results: [rawSearchPeople],
      total_pages: 2,
      hasMore: false,
    });

    const params = {
      type: SearchType.Person,
      page: 1,
      query: '',
    };

    const personHandler = new SearchHandler(mockRestDataSourceGet);

    return expect(personHandler.search(params, mediaGenres)).rejects.toEqual(
      new SearchQueryEmpty(),
    );
  });
});
