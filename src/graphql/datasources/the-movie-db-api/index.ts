import { RESTDataSource } from 'apollo-datasource-rest';

import { InvalidTMDBApiKey } from 'errors';
import env from '@config/environment';
import {
  PeopleQueryResult,
  Iso6391Language,
  QueryPersonArgs,
  TrendingMoviesQueryResult,
  SearchQueryResult,
  QueryPeopleArgs,
  QueryMovieArgs,
  MovieResponse,
  TrendingMoviesArgs,
  QueryTvShowArgs,
  TrendingTvShowsArgs,
  TrendingTvShowsQueryResult,
  SearchInput,
  TvShowResponse,
  PersonResponse,
} from '@lib/types';
import {
  TrendingTVShowsEndpoints,
  TrendingMoviesEndpoints,
  GetTMDBApiRequest,
} from '@types';

import MoviesHandler from './handlers/movies/MovieHandler';
import PeopleHandler from './handlers/people/PeopleHandler';
import TVShowsHandler from './handlers/tv-show/TVShowHandler';
import PersonHandler from './handlers/person/PersonHandler';
import SearchHandler from './handlers/search';

import { formatLanguage } from './helpers';

const BASE_URL = 'https://api.themoviedb.org/3';

const INVALID_API_KEY_CODE = 7;

class TheMovieDBAPI extends RESTDataSource {
  tvshowsHandler: TVShowsHandler;
  moviesHandler: MoviesHandler;
  searchHandler: SearchHandler;
  peopleHandler: PeopleHandler;
  personHandler: PersonHandler;

  constructor() {
    super();

    this.tvshowsHandler = new TVShowsHandler(this.execGetRequest);
    this.moviesHandler = new MoviesHandler(this.execGetRequest);
    this.peopleHandler = new PeopleHandler(this.execGetRequest);
    this.searchHandler = new SearchHandler(this.execGetRequest);
    this.personHandler = new PersonHandler(this.execGetRequest);

    this.baseURL = BASE_URL;
  }

  execGetRequest: GetTMDBApiRequest = async <P, R>(
    endpoint: string,
    params: P,
    language?: Iso6391Language | null,
  ): Promise<R & { status_code?: number }> => {
    let requestParams = {
      ...params,
      api_key: env.THE_MOVIE_DB_API_KEY,
    };

    if (language !== null) {
      requestParams = {
        ...requestParams,
        language: formatLanguage(language),
      };
    }

    const result = await this.get<R & { status_code?: number }>(endpoint, requestParams);

    if (result.status_code === INVALID_API_KEY_CODE) {
      throw new InvalidTMDBApiKey();
    }

    return result;
  };

  async getPeople(args: QueryPeopleArgs): Promise<PeopleQueryResult> {
    return this.peopleHandler.handle(args);
  }

  async getPerson(args: QueryPersonArgs): Promise<PersonResponse | null> {
    return this.personHandler.handle(args);
  }

  async search(input: SearchInput): Promise<SearchQueryResult> {
    return this.searchHandler.search(input);
  }

  async getMovie(args: QueryMovieArgs): Promise<MovieResponse | null> {
    return this.moviesHandler.getDetails(args);
  }

  async getTrendingMovies(
    args: TrendingMoviesArgs,
    endpoint: TrendingMoviesEndpoints,
  ): Promise<TrendingMoviesQueryResult> {
    return this.moviesHandler.getTrendings(args, endpoint);
  }

  async getMovieImages(id: string): Promise<string[]> {
    return this.moviesHandler.getImages(id);
  }

  async getTVShow(args: QueryTvShowArgs): Promise<TvShowResponse | null> {
    return this.tvshowsHandler.getDetails(args);
  }

  async getTrendingTVShows(
    args: TrendingTvShowsArgs,
    endpoint: TrendingTVShowsEndpoints,
  ): Promise<TrendingTvShowsQueryResult> {
    return this.tvshowsHandler.getTrendings(args, endpoint);
  }

  async getTVShowImages(id: string): Promise<string[]> {
    return this.tvshowsHandler.getImages(id);
  }
}

export default TheMovieDBAPI;
