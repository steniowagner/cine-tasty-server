import { RESTDataSource } from 'apollo-datasource-rest';

import TVShowsHandler, { Props as TVShowsHandlerProps } from './handlers/tv-show';
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
  SearchQueryResult,
  QueryPeopleArgs,
  QueryMovieArgs,
  Movie,
  MovieReviewsArgs,
  ReviewsQueryResult,
  MovieSimilarArgs,
  TrendingMoviesArgs,
  SimilarMoviesQueryResult,
  TrendingTvShowsArgs,
  TrendingTvShowsQueryResult,
} from '../../../lib/types';
import { TVShowsEndpoints } from '../../../types';

const BASE_URL = 'https://api.themoviedb.org/3';

export interface Props {
  getSimilarMovies(args: MovieSimilarArgs): Promise<SimilarMoviesQueryResult>;
  getMovieReviews(args: MovieReviewsArgs): Promise<ReviewsQueryResult>;
  getTrendingMoviesItem: (
    args: TrendingMoviesArgs,
    endpoint: string,
  ) => Promise<TrendingMoviesQueryResult>;
  getTrendingTVShowsItem: (
    args: TrendingTvShowsArgs,
    endpoint: TVShowsEndpoints,
  ) => Promise<TrendingTvShowsQueryResult>;
  getPeople: (args: QueryPeopleArgs) => Promise<PeopleQueryResult>;
  getPerson: (args: QueryPersonArgs) => Promise<Person | null>;
  getMovie: (args: QueryMovieArgs) => Promise<Movie | null>;
  search: (args: QuerySearchArgs) => Promise<SearchQueryResult>;
}

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
    resource: string,
  ): Promise<TrendingMoviesQueryResult> {
    return this.moviesHandler.getTrendingItem(args, resource);
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
    endpoint: TVShowsEndpoints,
  ): Promise<TrendingTvShowsQueryResult> {
    return this.tvshowsHandler.getTrendingItem(args, endpoint);
  }
}

export default TheMovieDBAPI;
