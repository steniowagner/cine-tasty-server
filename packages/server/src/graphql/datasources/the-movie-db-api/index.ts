import { RESTDataSource } from 'apollo-datasource-rest';

import { PeopleQueryResult, Iso6391Language } from '../../../lib/types';
import { getFormatedLanguage } from './helpers';
import PeopleHandler from './handlers/People';
import env from '../../../config/environment';
import { MediaGenre } from '../../../types';

const GENRE_MOVIE_ENDPOINT = '/genre/movie/list';
const GENRE_TV_SHOW_ENDPOINT = '/genre/tv/list';
const BASE_URL = 'http://api.themoviedb.org/3';

type Genres = {
  tvShow: MediaGenre[];
  movie: MediaGenre[];
};

export interface ITheMovieDBAPI {
  getMediaGenres(language?: Iso6391Language | null): Promise<Genres>;
  getPeople: (
    page: number,
    language?: Iso6391Language | null,
  ) => Promise<PeopleQueryResult>;
  genres: Genres;
}

class TheMovieDBAPI extends RESTDataSource implements ITheMovieDBAPI {
  genres: Genres = {
    tvShow: [],
    movie: [],
  };

  constructor() {
    super();
    this.baseURL = BASE_URL;
  }

  async getMediaGenres(language?: Iso6391Language | null): Promise<Genres> {
    const hasGenres = this.genres.tvShow.length && this.genres.movie.length;

    if (!hasGenres) {
      const params = {
        language: getFormatedLanguage(language),
        api_key: env.THE_MOVIE_DB_API_KEY,
      };

      const [tvShowGenres, movieGenres] = await Promise.all([
        this.get(GENRE_TV_SHOW_ENDPOINT, params),
        this.get(GENRE_MOVIE_ENDPOINT, params),
      ]);

      this.genres = {
        tvShow: tvShowGenres.genres,
        movie: movieGenres.genres,
      };
    }

    return this.genres;
  }

  execGetRequest = async <P, R>(endpoint: string, params: P): Promise<R> => {
    return this.get(endpoint, {
      ...params,
      api_key: env.THE_MOVIE_DB_API_KEY,
    });
  };

  async getPeople(
    page: number,
    language?: Iso6391Language | null,
  ): Promise<PeopleQueryResult> {
    const { tvShow, movie } = await this.getMediaGenres(language);

    const peopleHandler = new PeopleHandler(this.execGetRequest, tvShow, movie);

    return peopleHandler.getPopularPeople(page, language);
  }
}

export default TheMovieDBAPI;
