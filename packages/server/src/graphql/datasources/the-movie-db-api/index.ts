import { RESTDataSource } from 'apollo-datasource-rest';

import PeopleHandler, { Props as PeopleHandlerProps } from './handlers/people';
import PersonHandler, { Props as PersonHandlerProps } from './handlers/person';
import SearchHandler, { Props as SearchHandlerProps } from './handlers/search';
import MoviesHandler, { Props as MoviesHandlerProps } from './handlers/movies';

import { getFormatedLanguage } from './helpers';
import env from '../../../config/environment';
import {
  PeopleQueryResult,
  Iso6391Language,
  Person,
  QueryPersonArgs,
  QuerySearchArgs,
  TrendingMoviesQueryResult,
  TrendingMoviesInput,
  SearchResult,
  QueryPeopleArgs,
  QueryMovieArgs,
  Movie,
  MovieReviewsArgs,
  ReviewsQueryResult,
} from '../../../lib/types';

const BASE_URL = 'https://api.themoviedb.org/3';

export interface Props {
  getMovieReviews(params: MovieReviewsArgs): Promise<ReviewsQueryResult>;
  getTrendingMoviesItem: (
    params: TrendingMoviesInput,
    endpoint: string,
  ) => Promise<TrendingMoviesQueryResult>;
  getPeople: (params: QueryPeopleArgs) => Promise<PeopleQueryResult>;
  getPerson: (params: QueryPersonArgs) => Promise<Person | null>;
  search: (params: QuerySearchArgs) => Promise<SearchResult>;
  getMovie: (params: QueryMovieArgs) => Promise<Movie>;
}

class TheMovieDBAPI extends RESTDataSource implements Props {
  searchHandler: SearchHandlerProps;
  peopleHandler: PeopleHandlerProps;
  personHandler: PersonHandlerProps;
  moviesHandler: MoviesHandlerProps;

  constructor() {
    super();
    this.peopleHandler = new PeopleHandler(this.execGetRequest);
    this.searchHandler = new SearchHandler(this.execGetRequest);
    this.personHandler = new PersonHandler(this.execGetRequest);
    this.moviesHandler = new MoviesHandler(this.execGetRequest);
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

  async getPerson(params: QueryPersonArgs): Promise<Person | null> {
    return this.personHandler.getPerson(params);
  }

  async search(params: QuerySearchArgs): Promise<SearchResult> {
    return this.searchHandler.search(params);
  }

  async getTrendingMoviesItem(
    params: TrendingMoviesInput,
    resource: string,
  ): Promise<TrendingMoviesQueryResult> {
    return this.moviesHandler.getTrendingItem(params, resource);
  }

  async getMovie(params: QueryMovieArgs): Promise<Movie> {
    return this.moviesHandler.getMovie(params);
  }

  async getMovieReviews(params: MovieReviewsArgs): Promise<ReviewsQueryResult> {
    return this.moviesHandler.getReviews(params);
  }
}

export default TheMovieDBAPI;
