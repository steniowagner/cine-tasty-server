import { RESTDataSource } from 'apollo-datasource-rest';

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
  peopleHandler: PeopleHandlerProps;
  personHandler: PersonHandlerProps;

  constructor() {
    super();
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
    return this.peopleHandler.getPopularPeople(params);
  }

  async getPerson(params: QueryPersonArgs): Promise<PersonProfile | null> {
    return this.personHandler.getPerson(params);
  }

  async search(params: QuerySearchArgs): Promise<SearchResult> {
    // const mediaGenres = await this.mediaGenresHandler.load(params.language);
    return {
      total_results: 1,
      items: [],
      hasMore: false,
    };
    // return this.searchHandler.search(params, { tv: [], movie: [] });
  }
}

export default TheMovieDBAPI;
