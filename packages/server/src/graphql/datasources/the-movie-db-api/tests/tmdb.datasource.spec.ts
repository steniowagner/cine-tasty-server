import { movieGenres, tvGenres } from '../../../../__tests__/mocks/mediaGenres.stub';
import { Iso6391Language } from '../../../../lib/types';
import env from '../../../../config/environment';
import TMDBAPI from '..';

const GENRE_MOVIE_ENDPOINT = '/genre/movie/list';
const GENRE_TV_SHOW_ENDPOINT = '/genre/tv/list';

const mockRestDataSourceGet = jest.fn();

jest.mock('apollo-datasource-rest', () => {
  class MockRESTDataSource {
    baseUrl = '';
    get = mockRestDataSourceGet;
  }

  return {
    RESTDataSource: MockRESTDataSource,
  };
});

describe('[TMDBAPI.datasource.getMediaGenres]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRestDataSourceGet.mockResolvedValue({ genres: [{ id: 1, name: 'Genre' }] });
  });

  it('should get media genres correctly when some language is provided', async () => {
    const datasource = new TMDBAPI();

    const result = await datasource.getMediaGenres(Iso6391Language.Ptbr);
    const params = {
      api_key: env.THE_MOVIE_DB_API_KEY,
      language: 'pt-br',
    };

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(GENRE_TV_SHOW_ENDPOINT, params);
    expect(mockRestDataSourceGet).toHaveBeenLastCalledWith(GENRE_MOVIE_ENDPOINT, params);
    expect(mockRestDataSourceGet.mock.calls.length).toBe(2);
    expect(result).toEqual({
      tv: [{ id: 1, name: 'Genre' }],
      movie: [{ id: 1, name: 'Genre' }],
    });
  });

  it('should get media genres correctly when no language is provided', async () => {
    const datasource = new TMDBAPI();

    const result = await datasource.getMediaGenres(null);

    const params = {
      api_key: env.THE_MOVIE_DB_API_KEY,
      language: 'en-us',
    };

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(GENRE_TV_SHOW_ENDPOINT, params);
    expect(mockRestDataSourceGet).toHaveBeenLastCalledWith(GENRE_MOVIE_ENDPOINT, params);
    expect(mockRestDataSourceGet.mock.calls.length).toBe(2);
    expect(result).toEqual({
      tv: [{ id: 1, name: 'Genre' }],
      movie: [{ id: 1, name: 'Genre' }],
    });
  });

  it('should get media genres correctly when already fetched the genres from TMBD Api', async () => {
    const datasource = new TMDBAPI();

    const tvGenres = [{ id: 16, name: 'Animation' }];
    const movieGenres = [{ id: 28, name: 'Action' }];

    datasource.genres = {
      tv: tvGenres,
      movie: movieGenres,
    };

    const result = await datasource.getMediaGenres(null);

    expect(mockRestDataSourceGet.mock.calls.length).toBe(0);
    expect(result).toEqual({
      tv: tvGenres,
      movie: movieGenres,
    });
  });
});
