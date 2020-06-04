import { RESTDataSource } from 'apollo-datasource-rest';

import TVShowsHandler, { Props as TVShowsHandlerProps } from './handlers/tv-show';
import PeopleHandler, { Props as PeopleHandlerProps } from './handlers/people';
import PersonHandler, { Props as PersonHandlerProps } from './handlers/person';
import SearchHandler, { Props as SearchHandlerProps } from './handlers/search';
import TrendingMoviesHandler from './handlers/movies/trendings/TrendingMoviesHandler';
import MovieDetailHandler from './handlers/movies/details/MovieDetailHandler';
import MovieImagesHandler from './handlers/movies/images/MovieImagesHandler';

import { InvalidTMDBApiKey } from '../../../errors';
import { formatLanguage } from './helpers';
import env from '../../../config/environment';
import {
  PeopleQueryResult,
  Iso6391Language,
  Person,
  QueryPersonArgs,
  TrendingMoviesQueryResult,
  SearchQueryResult,
  QueryPeopleArgs,
  QueryMovieArgs,
  Movie,
  TrendingMoviesArgs,
  QueryTv_ShowArgs as QueryTvShowArgs,
  TrendingTvShowsArgs,
  TrendingTvShowsQueryResult,
  TvShow,
  SearchInput,
} from '../../../lib/types';
import {
  TrendingTVShowsEndpoints,
  TrendingMoviesEndpoints,
  GetTMDBApiRequest,
} from '../../../@types';

const BASE_URL = 'https://api.themoviedb.org/3';

export interface Props {
  getTrendingMoviesItem: (
    args: TrendingMoviesArgs,
    endpoint: TrendingMoviesEndpoints,
  ) => Promise<TrendingMoviesQueryResult>;
  getTrendingTVShowsItem: (
    args: TrendingTvShowsArgs,
    endpoint: TrendingTVShowsEndpoints,
  ) => Promise<TrendingTvShowsQueryResult>;
  getPeople: (args: QueryPeopleArgs) => Promise<PeopleQueryResult>;
  getPerson: (args: QueryPersonArgs) => Promise<Person | null>;
  getMovie: (args: QueryMovieArgs) => Promise<Movie | null>;
  getTVShow: (args: QueryTvShowArgs) => Promise<TvShow | null>;
  search: (input: SearchInput) => Promise<SearchQueryResult>;
  getTVShowImages(id: string): Promise<string[]>;
  getMovieImages(id: string): Promise<string[]>;
}

const INVALID_API_KEY_CODE = 7;

class TheMovieDBAPI extends RESTDataSource implements Props {
  tvshowsHandler: TVShowsHandlerProps;
  searchHandler: SearchHandlerProps;
  peopleHandler: PeopleHandlerProps;
  personHandler: PersonHandlerProps;
  movieDetailsHandler: MovieDetailHandler;
  trendingMoviesHandler: TrendingMoviesHandler;
  movieImagesHandler: MovieImagesHandler;

  constructor() {
    super();

    this.trendingMoviesHandler = new TrendingMoviesHandler(this.execGetRequest);
    this.movieDetailsHandler = new MovieDetailHandler(this.execGetRequest);
    this.movieImagesHandler = new MovieImagesHandler(this.execGetRequest);
    this.tvshowsHandler = new TVShowsHandler(this.execGetRequest);
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
    return this.peopleHandler.getPopularPeople(args);
  }

  async getPerson(args: QueryPersonArgs): Promise<Person | null> {
    return this.personHandler.getPerson(args);
  }

  async search(input: SearchInput): Promise<SearchQueryResult> {
    return this.searchHandler.search(input);
  }

  async getMovie(args: QueryMovieArgs): Promise<Movie | null> {
    return this.movieDetailsHandler.handle(args);
  }

  async getTrendingMoviesItem(
    args: TrendingMoviesArgs,
    endpoint: TrendingMoviesEndpoints,
  ): Promise<TrendingMoviesQueryResult> {
    return this.trendingMoviesHandler.handle({ args, resource: endpoint });
  }

  async getTVShow(args: QueryTvShowArgs): Promise<TvShow | null> {
    return this.tvshowsHandler.getTVShow(args);
  }

  async getMovieImages(id: string): Promise<string[]> {
    return this.movieImagesHandler.handle(id);
  }

  async getTrendingTVShowsItem(
    args: TrendingTvShowsArgs,
    endpoint: TrendingTVShowsEndpoints,
  ): Promise<TrendingTvShowsQueryResult> {
    return this.tvshowsHandler.getTrendingItem(args, endpoint);
  }

  async getTVShowImages(id: string): Promise<string[]> {
    return this.tvshowsHandler.getImages(id);
  }
}

export default TheMovieDBAPI;
