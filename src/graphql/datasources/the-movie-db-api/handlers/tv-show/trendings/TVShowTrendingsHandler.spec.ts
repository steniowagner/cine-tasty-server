const mockRestDataSourceGet = jest.fn();

import { rawTVShow } from '../../../../../../../__tests__/mocks/tvshows';
import { Iso6391Language } from '../../../../../../lib/types';
import TVShowTrendingsHandler from './TVShowTrendingsHandler';
import { TrendingTVShowsEndpoints } from '../../../@types';

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

let tvShowImagesHandler: TVShowTrendingsHandler = null;

describe('Unity: DataSources/TheMovieDBAPI/handlers/tv-show/trendings/TVShowTrendingsHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    tvShowImagesHandler = new TVShowTrendingsHandler(mockRestDataSourceGet);
  });

  it('should return an array of the on-the-air-tv-shows correctly', async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      results: [rawTVShow],
      total_results: 1,
      total_pages: 1,
    });

    const result = await tvShowImagesHandler.handle({
      endpoint: TrendingTVShowsEndpoints.OnTheAir,
      args: {
        language: Iso6391Language.Ptbr,
        page: 1,
      },
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      TrendingTVShowsEndpoints.OnTheAir,
      { page: 1 },
      Iso6391Language.Ptbr,
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(result.items).toEqual([rawTVShow]);

    expect(result.hasMore).toEqual(false);

    expect(result.totalPages).toEqual(1);

    expect(result.totalResults).toEqual(1);
  });

  it("should return the field 'hasMore' as 'true' when there's more pages to be paginated for on-the-air-tv-shows", async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      results: [rawTVShow],
      total_results: 1,
      total_pages: 2,
    });

    const result = await tvShowImagesHandler.handle({
      endpoint: TrendingTVShowsEndpoints.OnTheAir,
      args: {
        language: Iso6391Language.Ptbr,
        page: 1,
      },
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      TrendingTVShowsEndpoints.OnTheAir,
      { page: 1 },
      Iso6391Language.Ptbr,
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(result.items).toEqual([rawTVShow]);

    expect(result.hasMore).toEqual(true);
  });

  it("should return the field 'hasMore' as 'false' when there's no more pages to be paginated on-the-air-tv-shows", async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      results: [rawTVShow],
      total_results: 1,
      total_pages: 1,
    });

    const result = await tvShowImagesHandler.handle({
      endpoint: TrendingTVShowsEndpoints.OnTheAir,
      args: {
        language: Iso6391Language.Ptbr,
        page: 1,
      },
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      TrendingTVShowsEndpoints.OnTheAir,
      { page: 1 },
      Iso6391Language.Ptbr,
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(result.items).toEqual([rawTVShow]);

    expect(result.hasMore).toEqual(false);
  });

  it('should return an array of the popular-tv-shows correctly', async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      results: [rawTVShow],
      total_results: 1,
      total_pages: 1,
    });

    const result = await tvShowImagesHandler.handle({
      endpoint: TrendingTVShowsEndpoints.Popular,
      args: {
        language: Iso6391Language.Ptbr,
        page: 1,
      },
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      TrendingTVShowsEndpoints.Popular,
      { page: 1 },
      Iso6391Language.Ptbr,
    );
    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(result.items).toEqual([rawTVShow]);

    expect(result.hasMore).toEqual(false);

    expect(result.totalPages).toEqual(1);

    expect(result.totalResults).toEqual(1);
  });

  it("should return the field 'hasMore' as 'true' when there's more pages to be paginated for on-the-air-tv-shows", async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      results: [rawTVShow],
      total_results: 1,
      total_pages: 2,
    });

    const result = await tvShowImagesHandler.handle({
      endpoint: TrendingTVShowsEndpoints.Popular,
      args: {
        language: Iso6391Language.Ptbr,
        page: 1,
      },
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      TrendingTVShowsEndpoints.Popular,
      { page: 1 },
      Iso6391Language.Ptbr,
    );

    expect(result.items).toEqual([rawTVShow]);

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(result.hasMore).toEqual(true);
  });

  it("should return the field 'hasMore' as 'false' when there's no more pages to be paginated on-the-air-tv-shows", async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      results: [rawTVShow],
      total_results: 1,
      total_pages: 1,
    });

    const result = await tvShowImagesHandler.handle({
      endpoint: TrendingTVShowsEndpoints.Popular,
      args: {
        language: Iso6391Language.Ptbr,
        page: 1,
      },
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      TrendingTVShowsEndpoints.Popular,
      { page: 1 },
      Iso6391Language.Ptbr,
    );

    expect(result.items).toEqual([rawTVShow]);

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(result.hasMore).toEqual(false);
  });

  it('should return an array of the top-rated-tv-shows correctly', async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      results: [rawTVShow],
      total_results: 1,
      total_pages: 1,
    });

    const result = await tvShowImagesHandler.handle({
      endpoint: TrendingTVShowsEndpoints.TopRated,
      args: {
        page: 1,
        language: Iso6391Language.Ptbr,
      },
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      TrendingTVShowsEndpoints.TopRated,
      { page: 1 },
      Iso6391Language.Ptbr,
    );
    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(result.items).toEqual([rawTVShow]);

    expect(result.hasMore).toEqual(false);

    expect(result.totalPages).toEqual(1);

    expect(result.totalResults).toEqual(1);
  });

  it("should return the field 'hasMore' as 'true' when there's more pages to be paginated for top-rated-tv-shows", async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      results: [rawTVShow],
      total_results: 1,
      total_pages: 2,
    });

    const result = await tvShowImagesHandler.handle({
      endpoint: TrendingTVShowsEndpoints.TopRated,
      args: {
        language: Iso6391Language.Ptbr,
        page: 1,
      },
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      TrendingTVShowsEndpoints.TopRated,
      { page: 1 },
      Iso6391Language.Ptbr,
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(result.items).toEqual([rawTVShow]);

    expect(result.hasMore).toEqual(true);
  });

  it("should return the field 'hasMore' as 'false' when there's no more pages to be paginated top-rated-tv-shows", async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      results: [rawTVShow],
      total_results: 1,
      total_pages: 1,
    });

    const result = await tvShowImagesHandler.handle({
      endpoint: TrendingTVShowsEndpoints.TopRated,
      args: {
        language: Iso6391Language.Ptbr,
        page: 1,
      },
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      TrendingTVShowsEndpoints.TopRated,
      { page: 1 },
      Iso6391Language.Ptbr,
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

    expect(result.items).toEqual([rawTVShow]);

    expect(result.hasMore).toEqual(false);
  });
});
