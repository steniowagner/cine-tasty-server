import { Iso6391Language } from '../../../../lib/types';
import { Genres, MediaGenre } from '../../../../types';
import { getFormatedLanguage } from '../helpers';

const GENRE_MOVIE_ENDPOINT = '/genre/movie/list';
const GENRE_TV_SHOW_ENDPOINT = '/genre/tv/list';

type GetRequest = <T>(endpoint: string, params: { language: string }) => Promise<T>;

type GenreResponse = {
  genres: MediaGenre[];
};

export interface Props {
  load: (language?: Iso6391Language | null) => Promise<Genres>;
}

class MediaGenres implements Props {
  get: GetRequest;

  constructor(execGetRequest: GetRequest) {
    this.get = execGetRequest;
  }

  async load(language?: Iso6391Language | null): Promise<Genres> {
    const params = {
      language: getFormatedLanguage(language),
    };

    const [tvShowGenres, movieGenres] = await Promise.all<GenreResponse, GenreResponse>([
      this.get(GENRE_TV_SHOW_ENDPOINT, params),
      this.get(GENRE_MOVIE_ENDPOINT, params),
    ]);

    return {
      movie: movieGenres.genres,
      tv: tvShowGenres.genres,
    };
  }
}

export default MediaGenres;
