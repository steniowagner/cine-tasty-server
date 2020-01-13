import { RESTDataSource } from 'apollo-datasource-rest';

import PeopleHandler, { IPeopleHandler } from './handlers/people';
import SearchHandler, { ISearchHandler } from './handlers/search';
import env from '../../../config/environment';
import { Genres } from '../../../types';
import {
  PeopleQueryResult,
  Iso6391Language,
  Person,
  QuerySearchArgs,
  SearchResult,
} from '../../../lib/types';

const BASE_URL = 'http://api.themoviedb.org/3';

export interface ITheMovieDBAPI {
  getPeople: (
    page: number,
    mediaGenres: Genres,
    language?: Iso6391Language | null,
  ) => Promise<PeopleQueryResult>;
  getPerson: (
    id: number,
    mediaGenres: Genres,
    language?: Iso6391Language | null,
  ) => Promise<Person | null>;
  search: (params: QuerySearchArgs, mediaGenres: Genres) => Promise<SearchResult>;
  peopleHandler: IPeopleHandler;
  searchHandler: ISearchHandler;
  genres: Genres;
}

class TheMovieDBAPI extends RESTDataSource implements ITheMovieDBAPI {
  peopleHandler: IPeopleHandler;
  searchHandler: ISearchHandler;

  genres: Genres = {
    movie: [],
    tv: [],
  };

  constructor() {
    super();
    this.peopleHandler = new PeopleHandler(this.execGetRequest);
    this.searchHandler = new SearchHandler(this.execGetRequest);
    this.baseURL = BASE_URL;
  }

  execGetRequest = async <P, R>(endpoint: string, params: P): Promise<R> => {
    return this.get(endpoint, {
      ...params,
      api_key: env.THE_MOVIE_DB_API_KEY,
    });
  };

  async getPeople(
    page: number,
    mediaGenres: Genres,
    language?: Iso6391Language | null,
  ): Promise<PeopleQueryResult> {
    return this.peopleHandler.getPopularPeople(page, mediaGenres, language);
  }

  async getPerson(
    id: number,
    mediaGenres: Genres,
    language?: Iso6391Language | null,
  ): Promise<Person | null> {
    return this.peopleHandler.getPerson(id, mediaGenres, language);
  }

  async search(params: QuerySearchArgs, mediaGenres: Genres): Promise<SearchResult> {
    return this.searchHandler.search(params, mediaGenres);
  }
}

export default TheMovieDBAPI;
