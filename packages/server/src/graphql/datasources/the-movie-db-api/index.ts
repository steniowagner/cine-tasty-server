import { RESTDataSource } from 'apollo-datasource-rest';

import TVShowsHandler, { Props as TVShowsHandlerProps } from './handlers/tv-show';
import PeopleHandler, { Props as PeopleHandlerProps } from './handlers/people';
import PersonHandler, { Props as PersonHandlerProps } from './handlers/person';
import SearchHandler, { Props as SearchHandlerProps } from './handlers/search';
import MoviesHandler, { Props as MoviesHandlerProps } from './handlers/movies';

import { InvalidTMDBApiKey, ResourceNotFound } from '../../../errors';
import { formatLanguage } from './helpers';
import env from '../../../config/environment';
import {
  PeopleQueryResult,
  Iso6391Language,
  Person,
  QueryPersonArgs,
  QuerySearchArgs,
  TrendingMoviesQueryResult,
  SearchQueryResult,
  QueryPeopleArgs,
  QueryMovieArgs,
  Movie,
  MovieReviewsArgs,
  ReviewsQueryResult,
  MovieSimilarArgs,
  TrendingMoviesArgs,
  QueryTv_ShowArgs as QueryTvShowArgs,
  SimilarMoviesQueryResult,
  TrendingTvShowsArgs,
  TrendingTvShowsQueryResult,
  TvShow,
} from '../../../lib/types';
import {
  TrendingTVShowsEndpoints,
  TrendingMoviesEndpoints,
  GetTMDBApiRequest,
} from '../../../types';

const BASE_URL = 'https://api.themoviedb.org/3';

export interface Props {
  getSimilarMovies(args: MovieSimilarArgs): Promise<SimilarMoviesQueryResult>;
  getMovieReviews(args: MovieReviewsArgs): Promise<ReviewsQueryResult>;
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
  search: (args: QuerySearchArgs) => Promise<SearchQueryResult>;
  getTVShowImages(id: string): Promise<string[]>;
}

const RESOURCE_NOT_FOUND_CODE = 34;
const INVALID_API_KEY_CODE = 7;

class TheMovieDBAPI extends RESTDataSource implements Props {
  tvshowsHandler: TVShowsHandlerProps;
  searchHandler: SearchHandlerProps;
  peopleHandler: PeopleHandlerProps;
  personHandler: PersonHandlerProps;
  moviesHandler: MoviesHandlerProps;

  constructor() {
    super();

    this.tvshowsHandler = new TVShowsHandler(this.execGetRequest);
    this.peopleHandler = new PeopleHandler(this.execGetRequest);
    this.searchHandler = new SearchHandler(this.execGetRequest);
    this.personHandler = new PersonHandler(this.execGetRequest);
    this.moviesHandler = new MoviesHandler(this.execGetRequest);

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

    const result = await this.get(endpoint, requestParams);

    if (result.status_code === INVALID_API_KEY_CODE) {
      throw new InvalidTMDBApiKey();
    }

    if (result.status_code === RESOURCE_NOT_FOUND_CODE) {
      throw new ResourceNotFound();
    }

    return result;
  };

  async getPeople(args: QueryPeopleArgs): Promise<PeopleQueryResult> {
    return this.peopleHandler.getPopularPeople(args);
  }

  async getPerson(args: QueryPersonArgs): Promise<Person | null> {
    return this.personHandler.getPerson(args);
  }

  async search(args: QuerySearchArgs): Promise<SearchQueryResult> {
    return this.searchHandler.search(args);
  }

  async getTrendingMoviesItem(
    args: TrendingMoviesArgs,
    endpoint: TrendingMoviesEndpoints,
  ): Promise<TrendingMoviesQueryResult> {
    return this.moviesHandler.getTrendingItem(args, endpoint);
  }

  async getMovie(args: QueryMovieArgs): Promise<Movie | null> {
    return this.moviesHandler.getMovie(args);
  }

  async getMovieReviews(args: MovieReviewsArgs): Promise<ReviewsQueryResult> {
    return this.moviesHandler.getReviews(args);
  }

  async getSimilarMovies(args: MovieSimilarArgs): Promise<SimilarMoviesQueryResult> {
    return this.moviesHandler.getSimilars(args);
  }

  async getTrendingTVShowsItem(
    args: TrendingTvShowsArgs,
    endpoint: TrendingTVShowsEndpoints,
  ): Promise<TrendingTvShowsQueryResult> {
    return this.tvshowsHandler.getTrendingItem(args, endpoint);
  }

  async getTVShow(args: QueryTvShowArgs): Promise<TvShow | null> {
    return this.tvshowsHandler.getTVShow(args);
  }

  async getTVShowImages(id: string): Promise<string[]> {
    return this.tvshowsHandler.getImages(id);
  }
}

export default TheMovieDBAPI;
