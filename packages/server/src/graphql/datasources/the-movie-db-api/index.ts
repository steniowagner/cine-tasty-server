import { RESTDataSource } from 'apollo-datasource-rest';

import { PeopleQueryResult, Iso6391Language, Person } from '../../../lib/types';
import PeopleHandler, { IPeopleHandler } from './handlers/people';
import { getFormatedLanguage } from './helpers';
import env from '../../../config/environment';
import { Genres } from '../../../types';

const GENRE_MOVIE_ENDPOINT = '/genre/movie/list';
const GENRE_TV_SHOW_ENDPOINT = '/genre/tv/list';
const BASE_URL = 'http://api.themoviedb.org/3';

export interface ITheMovieDBAPI {
  getMediaGenres(language?: Iso6391Language | null): Promise<Genres | null>;
  getPeople: (
    page: number,
    language?: Iso6391Language | null,
  ) => Promise<PeopleQueryResult>;
  getPerson: (id: number, language?: Iso6391Language | null) => Promise<Person | null>;
  peopleHandler: IPeopleHandler;
  genres: Genres;
}

class TheMovieDBAPI extends RESTDataSource implements ITheMovieDBAPI {
  peopleHandler: IPeopleHandler;
  genres: Genres = {
    movie: [],
    tv: [],
  };

  constructor() {
    super();
    this.peopleHandler = new PeopleHandler(this.execGetRequest);
    this.baseURL = BASE_URL;
  }

  execGetRequest = async <P, R>(endpoint: string, params: P): Promise<R> => {
    return this.get(endpoint, {
      ...params,
      api_key: env.THE_MOVIE_DB_API_KEY,
    });
  };

  async getMediaGenres(language?: Iso6391Language | null): Promise<Genres> {
    const hasGenres = this.genres.tv.length && this.genres.movie.length;

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
        movie: movieGenres.genres,
        tv: tvShowGenres.genres,
      };
    }

    return this.genres;
  }

  async getPeople(
    page: number,
    language?: Iso6391Language | null,
  ): Promise<PeopleQueryResult> {
    const genres = await this.getMediaGenres(language);

    return this.peopleHandler.getPopularPeople(page, genres, language);
  }

  async getPerson(id: number, language?: Iso6391Language | null): Promise<Person | null> {
    const genres = await this.getMediaGenres(language);

    return this.peopleHandler.getPerson(id, genres, language);
  }
}

export default TheMovieDBAPI;
