const mockRestDataSourceGet = jest.fn();

import { rawMovie } from '../../../../../../../__tests__/mocks/movies';
import { TrendingMoviesEndpoints } from '../../../../../../@types';
import { Iso6391Language } from '../../../../../../lib/types';
import TrendingMoviesHandler from './TrendingMoviesHandler';

let trendingMoviesHandler: TrendingMoviesHandler = null;

describe('Unity: DataSources/TheMovieDBAPI/handlers/movies/TrendingMoviesHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    trendingMoviesHandler = new TrendingMoviesHandler(mockRestDataSourceGet);
  });

  it("should return the field 'hasMore' as 'true' when there's more pages to be paginated", async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      results: [rawMovie],
      total_results: 1,
      total_pages: 2,
    });

    const result = await trendingMoviesHandler.handle({
      resource: TrendingMoviesEndpoints.Upcoming,
      args: {
        language: Iso6391Language.Ptbr,
        page: 1,
      },
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      TrendingMoviesEndpoints.Upcoming,
      { page: 1 },
      Iso6391Language.Ptbr,
    );
    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);
    expect(result.hasMore).toEqual(true);
  });

  it("should return the field 'hasMore' as 'false' when there's no more pages to be paginated", async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      results: [rawMovie],
      total_results: 1,
      total_pages: 1,
    });

    const result = await trendingMoviesHandler.handle({
      resource: TrendingMoviesEndpoints.Upcoming,
      args: {
        language: Iso6391Language.Ptbr,
        page: 1,
      },
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      TrendingMoviesEndpoints.Upcoming,
      { page: 1 },
      Iso6391Language.Ptbr,
    );
    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);
    expect(result.hasMore).toEqual(false);
  });

  it('should return an array of the now-playing-movies correctly', async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      results: [rawMovie],
      total_results: 1,
      total_pages: 1,
    });

    const result = await trendingMoviesHandler.handle({
      resource: TrendingMoviesEndpoints.NowPlaying,
      args: {
        language: Iso6391Language.Ptbr,
        page: 1,
      },
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      TrendingMoviesEndpoints.NowPlaying,
      { page: 1 },
      Iso6391Language.Ptbr,
    );
    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);
    expect(result.hasMore).toEqual(false);
    expect(result.totalPages).toEqual(1);
    expect(result.totalResults).toEqual(1);
  });

  it('should return an array of the popular-movies correctly', async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      results: [rawMovie],
      total_results: 1,
      total_pages: 1,
    });

    const result = await trendingMoviesHandler.handle({
      resource: TrendingMoviesEndpoints.Popular,
      args: {
        language: Iso6391Language.Ptbr,
        page: 1,
      },
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      TrendingMoviesEndpoints.Popular,
      { page: 1 },
      Iso6391Language.Ptbr,
    );
    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);
    expect(result.hasMore).toEqual(false);
    expect(result.totalPages).toEqual(1);
    expect(result.totalResults).toEqual(1);
  });

  it('should return an array of the top-rated correctly', async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      results: [rawMovie],
      total_results: 1,
      total_pages: 1,
    });

    const result = await trendingMoviesHandler.handle({
      resource: TrendingMoviesEndpoints.TopRated,
      args: {
        page: 1,
        language: Iso6391Language.Ptbr,
      },
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      TrendingMoviesEndpoints.TopRated,
      { page: 1 },
      Iso6391Language.Ptbr,
    );
    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);
    expect(result.hasMore).toEqual(false);
    expect(result.totalPages).toEqual(1);
    expect(result.totalResults).toEqual(1);
  });

  it('should return an array of the upcoming-movies correclty', async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      results: [rawMovie],
      total_results: 1,
      total_pages: 1,
    });

    const result = await trendingMoviesHandler.handle({
      resource: TrendingMoviesEndpoints.Upcoming,
      args: {
        language: Iso6391Language.Ptbr,
        page: 1,
      },
    });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      TrendingMoviesEndpoints.Upcoming,
      { page: 1 },
      Iso6391Language.Ptbr,
    );
    expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);
    expect(result.totalPages).toEqual(1);
    expect(result.totalResults).toEqual(1);
  });
});
