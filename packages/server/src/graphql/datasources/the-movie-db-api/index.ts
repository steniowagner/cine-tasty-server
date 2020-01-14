import { RESTDataSource } from 'apollo-datasource-rest';

import MediaGenresHandlers, { Props as MediaGenresProps } from './handlers/MediaGenres';
import PeopleHandler, { Props as PeopleHandlerProps } from './handlers/PeopleHandler';
import SearchHandler, { Props as SearchHandlerProps } from './handlers/SearchHandler';
import { getFormatedLanguage } from './helpers';
import env from '../../../config/environment';

import {
  PeopleQueryResult,
  Iso6391Language,
  Person,
  QuerySearchArgs,
  SearchResult,
} from '../../../lib/types';

const BASE_URL = 'https://api.themoviedb.org/3';

export interface Props {
  getPeople: (
    page: number,
    language?: Iso6391Language | null,
  ) => Promise<PeopleQueryResult>;
  getPerson: (id: number, language?: Iso6391Language | null) => Promise<Person | null>;
  search: (params: QuerySearchArgs) => Promise<SearchResult>;
}

class TheMovieDBAPI extends RESTDataSource implements Props {
  searchHandler: SearchHandlerProps;
  mediaGenresHandler: MediaGenresProps;
  peopleHandler: PeopleHandlerProps;

  constructor() {
    super();
    this.mediaGenresHandler = new MediaGenresHandlers(this.execGetRequest);
    this.peopleHandler = new PeopleHandler(this.execGetRequest);
    this.searchHandler = new SearchHandler(this.execGetRequest);
    this.baseURL = BASE_URL;
  }

  execGetRequest = async <P, R>(
    endpoint: string,
    params: P,
    language?: Iso6391Language | null,
  ): Promise<R> => {
    return this.get(endpoint, {
      ...params,
      language: getFormatedLanguage(language),
      api_key: env.THE_MOVIE_DB_API_KEY,
    });
  };

  async getPeople(
    page: number,
    language?: Iso6391Language | null,
  ): Promise<PeopleQueryResult> {
    const mediaGenres = await this.mediaGenresHandler.load();

    return this.peopleHandler.getPopularPeople(page, mediaGenres, language);
  }

  async getPerson(id: number, language?: Iso6391Language | null): Promise<Person | null> {
    const mediaGenres = await this.mediaGenresHandler.load();

    return this.peopleHandler.getPerson(id, mediaGenres, language);
  }

  async search(params: QuerySearchArgs): Promise<SearchResult> {
    const mediaGenres = await this.mediaGenresHandler.load();

    return this.searchHandler.search(params, mediaGenres);
  }
}

export default TheMovieDBAPI;
