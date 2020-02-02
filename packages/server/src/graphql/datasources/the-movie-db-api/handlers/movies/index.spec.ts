const mockRestDataSourceGet = jest.fn();

import {
  rawMovie,
  review,
  rawMovieDetail,
} from '../../../../../__tests__/mocks/movies.stub';
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
        append_to_response: 'videos,credits,similar,reviews',
      },
      'PTBR',
    );

    expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

    expect(result).toMatchSnapshot();
  });

  it('should get the reviews of a movie with certain id from TheMovideDB API', async () => {
    mockRestDataSourceGet.mockReturnValueOnce({
      id: 1,
      page: 1,
      results: [review],
      total_pages: 1,
      total_results: 1,
    });

    const movieHandler = new MovieHandler(mockRestDataSourceGet);

    const result = await movieHandler.getReviews({ id: '1', reviewsPage: 1 });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith('movie/1/reviews', { page: 1 });

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

    const result = await movieHandler.getReviews({ id: '1', reviewsPage: 1 });

    expect(mockRestDataSourceGet).toHaveBeenCalledWith('movie/1/reviews', { page: 1 });

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
