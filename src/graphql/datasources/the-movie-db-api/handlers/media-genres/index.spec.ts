import { movieGenres, tvGenres } from '../../../../../__tests__/mocks/mediaGenres.stub';
import { Iso6391Language, MediaType } from '../../../../../lib/types';
import env from '../../../../../config/environment';
import CONSTANTS from '../../utils/constants';
import MediaGenres from '.';

const mockRestDataSourceGet = jest.fn();

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

const mediaGenres = new MediaGenres();

describe('Unity: MediaGenres', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMediaGenres()', () => {
    it('should get movie genres correctly when some language is provided', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({ genres: movieGenres });

      const moviesGenresIds = movieGenres.map(({ id }) => id);

      const results = await mediaGenres.getMediaGenres(
        moviesGenresIds,
        MediaType.Movie,
        Iso6391Language.Ptbr,
      );

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(mockRestDataSourceGet).toHaveBeenLastCalledWith(
        CONSTANTS.GENRE_MOVIE_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'pt-br',
        },
      );

      expect(results).toEqual(movieGenres.map(({ name }) => name));
    });

    it('should get movie genres correctly when no language is provided', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({ genres: movieGenres });

      const moviesGenresIds = movieGenres.map(({ id }) => id);

      const results = await mediaGenres.getMediaGenres(moviesGenresIds, MediaType.Movie);

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(mockRestDataSourceGet).toHaveBeenLastCalledWith(
        CONSTANTS.GENRE_MOVIE_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(results).toEqual(movieGenres.map(({ name }) => name));
    });

    it('should get tv-show genres correctly when some language is provided', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({ genres: tvGenres });

      const tvShowGenresIds = tvGenres.map(({ id }) => id);

      const results = await mediaGenres.getMediaGenres(
        tvShowGenresIds,
        MediaType.Tv,
        Iso6391Language.Ptbr,
      );

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(mockRestDataSourceGet).toHaveBeenLastCalledWith(
        CONSTANTS.GENRE_TV_SHOW_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'pt-br',
        },
      );

      expect(results).toEqual(tvGenres.map(({ name }) => name));
    });

    it('should get tv-show genres correctly when no language is provided', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({ genres: tvGenres });

      const tvShowGenresIds = tvGenres.map(({ id }) => id);

      const results = await mediaGenres.getMediaGenres(tvShowGenresIds, MediaType.Tv);

      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);

      expect(mockRestDataSourceGet).toHaveBeenLastCalledWith(
        CONSTANTS.GENRE_TV_SHOW_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(results).toEqual(tvGenres.map(({ name }) => name));
    });

    it("should return an empty array when the media-type isn't recognized", async () => {
      mockRestDataSourceGet.mockReturnValueOnce({ genres: tvGenres });

      const tvShowGenresIds = tvGenres.map(({ id }) => id);

      const results = await mediaGenres.getMediaGenres(tvShowGenresIds, 'other');

      expect(mockRestDataSourceGet.mock.calls.length).toBe(0);

      expect(results).toEqual([]);
    });
  });
});
