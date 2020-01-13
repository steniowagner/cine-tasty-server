import { RESTDataSource, HTTPCache } from 'apollo-datasource-rest';

import { getFormatedLanguage } from '../graphql/datasources/the-movie-db-api/helpers';
import { Iso6391Language } from '../lib/types';
import env from '../config/environment';
import { Genres } from '../types';

const GENRE_MOVIE_ENDPOINT = '/genre/movie/list';
const GENRE_TV_SHOW_ENDPOINT = '/genre/tv/list';
const BASE_URL = 'http://api.themoviedb.org/3';

export interface IMediaGenres {
  load: (language?: Iso6391Language | null) => Promise<Genres>;
  genres: Genres;
}

class MediaGenres extends RESTDataSource implements IMediaGenres {
  genres: Genres = {
    movie: [],
    tv: [],
  };

  constructor() {
    super();
    this.httpCache = new HTTPCache();
    this.baseURL = BASE_URL;
  }

  async load(language?: Iso6391Language | null): Promise<Genres> {
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
}

export default MediaGenres;
