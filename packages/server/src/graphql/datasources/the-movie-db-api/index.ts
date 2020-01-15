import { RESTDataSource } from 'apollo-datasource-rest';

import MediaGenresHandlers, { Props as MediaGenresProps } from './handlers/media-genres';
import PeopleHandler, { Props as PeopleHandlerProps } from './handlers/people';
import PersonHandler, { Props as PersonHandlerProps } from './handlers/person';
import SearchHandler, { Props as SearchHandlerProps } from './handlers/search';
import { getFormatedLanguage } from './helpers';
import env from '../../../config/environment';
import {
  PeopleQueryResult,
  Iso6391Language,
  PersonProfile,
  QueryPersonArgs,
  QuerySearchArgs,
  SearchResult,
  QueryPeopleArgs,
} from '../../../lib/types';

const BASE_URL = 'https://api.themoviedb.org/3';

export interface Props {
  getPeople: (params: QueryPeopleArgs) => Promise<PeopleQueryResult>;
  getPerson: (params: QueryPersonArgs) => Promise<PersonProfile | null>;
  search: (params: QuerySearchArgs) => Promise<SearchResult>;
}

class TheMovieDBAPI extends RESTDataSource implements Props {
  searchHandler: SearchHandlerProps;
  mediaGenresHandler: MediaGenresProps;
  peopleHandler: PeopleHandlerProps;
  personHandler: PersonHandlerProps;

  constructor() {
    super();
    this.mediaGenresHandler = new MediaGenresHandlers(this.execGetRequest);
    this.peopleHandler = new PeopleHandler(this.execGetRequest);
    this.searchHandler = new SearchHandler(this.execGetRequest);
    this.personHandler = new PersonHandler(this.execGetRequest);
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

  async getPeople(params: QueryPeopleArgs): Promise<PeopleQueryResult> {
    const mediaGenres = await this.mediaGenresHandler.load(params.language);

    return this.peopleHandler.getPopularPeople(params, mediaGenres);
  }

  async getPerson(params: QueryPersonArgs): Promise<PersonProfile | null> {
    const mediaGenres = await this.mediaGenresHandler.load(params.language);

    return this.personHandler.getPerson(params, mediaGenres);
  }

  async search(params: QuerySearchArgs): Promise<SearchResult> {
    const mediaGenres = await this.mediaGenresHandler.load(params.language);

    return this.searchHandler.search(params, mediaGenres);
  }
}

export default TheMovieDBAPI;
