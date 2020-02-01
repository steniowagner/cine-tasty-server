const mockRestDataSourceGet = jest.fn();

import { rawMovie } from '../../../../../__tests__/mocks/movies.stub';
import { Iso6391Language } from '../../../../../lib/types';

import MovieHandler from '.';

const NOW_PLAYING_ENDPOINT = 'movie/now_playing';
const TOP_RATED_ENDPOINT = 'movie/top_rated';
const UPCOMING_ENDPOINT = 'movie/upcoming';
const POPULAR_ENDPOINT = 'movie/popular';

describe('[MovieHandler]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
      'now_playing',
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      NOW_PLAYING_ENDPOINT,
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
      'popular',
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      POPULAR_ENDPOINT,
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
      'top_rated',
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      TOP_RATED_ENDPOINT,
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
      'upcoming',
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      UPCOMING_ENDPOINT,
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
