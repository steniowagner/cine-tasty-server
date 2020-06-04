import { movieGenres, tvGenres } from '../../../../../../__tests__/mocks/mediaGenres';
import { Iso6391Language, MediaType } from '../../../../../lib/types';
import env from '../../../../../config/environment';
import MediaGenres from './MediaGenresHandler';
import CONSTANTS from './utils/constants';

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

const movieGenresNames = movieGenres.map(({ name }) => name);

const tvShowGeneresNames = tvGenres.map(({ name }) => name);

const moviesGenresIds = movieGenres.map(({ id }) => id);

const tvShowGenresIds = tvGenres.map(({ id }) => id);

const mediaGenres = new MediaGenres();

describe('Unity: DataSources/TheMovieDBAPI/handlers/MediaGenresHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('handle()', () => {
    it('should get movie genres correctly when some language is provided', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({ genres: movieGenres });

      const results = await mediaGenres.handle({
        language: Iso6391Language.Ptbr,
        mediaType: MediaType.Movie,
        genresIds: moviesGenresIds,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

      expect(mockRestDataSourceGet).toHaveBeenLastCalledWith(
        CONSTANTS.GENRE_MOVIE_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'pt-br',
        },
      );

      expect(results).toEqual(movieGenresNames);
    });

    it('should get movie genres correctly when no language is provided', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({ genres: movieGenres });

      const results = await mediaGenres.handle({
        mediaType: MediaType.Movie,
        genresIds: moviesGenresIds,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

      expect(mockRestDataSourceGet).toHaveBeenLastCalledWith(
        CONSTANTS.GENRE_MOVIE_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(results).toEqual(movieGenresNames);
    });

    it('should get tv-show genres correctly when some language is provided', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({ genres: tvGenres });

      const results = await mediaGenres.handle({
        language: Iso6391Language.Ptbr,
        genresIds: tvShowGenresIds,
        mediaType: MediaType.Tv,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

      expect(mockRestDataSourceGet).toHaveBeenLastCalledWith(
        CONSTANTS.GENRE_TV_SHOW_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'pt-br',
        },
      );

      expect(results).toEqual(tvShowGeneresNames);
    });

    it('should get tv-show genres correctly when no language is provided', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({ genres: tvGenres });

      const results = await mediaGenres.handle({
        genresIds: tvShowGenresIds,
        mediaType: MediaType.Tv,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

      expect(mockRestDataSourceGet).toHaveBeenLastCalledWith(
        CONSTANTS.GENRE_TV_SHOW_ENDPOINT,
        {
          api_key: env.THE_MOVIE_DB_API_KEY,
          language: 'en-us',
        },
      );

      expect(results).toEqual(tvShowGeneresNames);
    });

    it("should return an empty array when the media-type isn't recognized", async () => {
      mockRestDataSourceGet.mockReturnValueOnce({ genres: tvGenres });

      const results = await mediaGenres.handle({
        genresIds: tvShowGenresIds,
        mediaType: 'other',
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(0);

      expect(results).toEqual([]);
    });
  });
});
