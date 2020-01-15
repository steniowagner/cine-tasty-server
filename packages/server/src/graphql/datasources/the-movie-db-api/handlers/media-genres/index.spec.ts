import { movieGenres, tvGenres } from '../../../../../__tests__/mocks/mediaGenres.stub';
import { Iso6391Language } from '../../../../../lib/types';
import MediaGenres from '.';

const GENRE_MOVIE_ENDPOINT = '/genre/movie/list';
const GENRE_TV_SHOW_ENDPOINT = '/genre/tv/list';
const language = 'PTBR';

describe('[MediaGenres]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get media genres correctly when some language is provided', async () => {
    const mockRestDataSourceGet = jest
      .fn()
      .mockReturnValueOnce({ genres: tvGenres })
      .mockReturnValueOnce({ genres: movieGenres });

    const mediaGenres = new MediaGenres(mockRestDataSourceGet);
    const result = await mediaGenres.load(Iso6391Language.Ptbr);

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      GENRE_TV_SHOW_ENDPOINT,
      {},
      language,
    );

    expect(mockRestDataSourceGet).toHaveBeenLastCalledWith(
      GENRE_MOVIE_ENDPOINT,
      {},
      language,
    );

    expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

    expect(result).toEqual({
      tv: tvGenres,
      movie: movieGenres,
    });
  });

  it('should get media genres correctly when no language is provided', async () => {
    const mockRestDataSourceGet = jest
      .fn()
      .mockReturnValueOnce({ genres: tvGenres })
      .mockReturnValueOnce({ genres: movieGenres });

    const mediaGenres = new MediaGenres(mockRestDataSourceGet);
    const result = await mediaGenres.load();

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      GENRE_TV_SHOW_ENDPOINT,
      {},
      undefined,
    );

    expect(mockRestDataSourceGet).toHaveBeenLastCalledWith(
      GENRE_MOVIE_ENDPOINT,
      {},
      undefined,
    );

    expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

    expect(result).toEqual({
      tv: tvGenres,
      movie: movieGenres,
    });
  });
});
