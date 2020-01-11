import TMDBAPI from '..';
import env from '../../../../config/environment';

const GENRE_MOVIE_ENDPOINT = '/genre/movie/list';
const GENRE_TV_SHOW_ENDPOINT = '/genre/tv/list';

const getDatasource = () => {
  const datasource = new TMDBAPI();

  datasource.get = jest.fn();

  return datasource;
};

describe('[TMDBAPI.datasource.getMediaGenres]', () => {
  it('should get media genres correctly when some language is provided', async () => {
    const datasource = getDatasource();

    datasource.get.mockImplementation(() => ({
      genres: [{ id: 1, name: 'Genre' }],
    }));

    const result = await datasource.getMediaGenres('PTBR');
    const params = {
      api_key: env.THE_MOVIE_DB_API_KEY,
      language: 'pt-br',
    };

    expect(datasource.get).toHaveBeenCalledWith(GENRE_TV_SHOW_ENDPOINT, params);
    expect(datasource.get).toHaveBeenLastCalledWith(GENRE_MOVIE_ENDPOINT, params);
    expect(datasource.get.mock.calls.length).toBe(2);
    expect(result).toEqual({
      tv: [{ id: 1, name: 'Genre' }],
      movie: [{ id: 1, name: 'Genre' }],
    });
  });

  it('should get media genres correctly when no language is provided', async () => {
    const datasource = getDatasource();

    datasource.get.mockImplementation(() => ({
      genres: [{ id: 1, name: 'Genre' }],
    }));

    const result = await datasource.getMediaGenres(null);

    const params = {
      api_key: env.THE_MOVIE_DB_API_KEY,
      language: 'en-us',
    };

    expect(datasource.get).toHaveBeenCalledWith(GENRE_TV_SHOW_ENDPOINT, params);
    expect(datasource.get).toHaveBeenLastCalledWith(GENRE_MOVIE_ENDPOINT, params);
    expect(datasource.get.mock.calls.length).toBe(2);
    expect(result).toEqual({
      tv: [{ id: 1, name: 'Genre' }],
      movie: [{ id: 1, name: 'Genre' }],
    });
  });
});
