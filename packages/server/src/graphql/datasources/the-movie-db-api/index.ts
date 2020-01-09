import { RESTDataSource } from 'apollo-datasource-rest';

import PeopleHandler from './handlers/People';
import { PeopleQueryResult, Iso6391Language } from '../../../lib/types';
import env from '../../../config/environment';

const BASE_URL = 'http://api.themoviedb.org/3';

export interface ITheMovieDBAPI {
  getPeople: (
    page: number,
    language?: Iso6391Language | null,
  ) => Promise<PeopleQueryResult>;
}

class TheMovieDBAPI extends RESTDataSource implements ITheMovieDBAPI {
  constructor() {
    super();
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
    language?: Iso6391Language | null,
  ): Promise<PeopleQueryResult> {
    const peopleHandler = new PeopleHandler(this.execGetRequest);

    return peopleHandler.getPopularPeople(page, language);
  }
}

export default TheMovieDBAPI;
