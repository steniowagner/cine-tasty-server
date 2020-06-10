import { TrendingMoviesEndpoints, GetTMDBApiRequest } from '@types';
import {
  TrendingMoviesQueryResult,
  TrendingMoviesArgs,
  QueryMovieArgs,
  MovieResponse,
} from '@lib/types';

import MovieDetailsHandler from './details/MovieDetailsHandler';
import MovieImagesHandler from './images/MovieImagesHandler';
import TheMovieDBHandler from '../TheMovieDBHandler';
import TrendingMoviesHandler, {
  Params as TrendingMoviesHandlerParams,
} from './trendings/TrendingMoviesHandler';

class MovieHandler {
  private trendingsHandler: TheMovieDBHandler<TrendingMoviesHandlerParams>;
  private detailsHandler: TheMovieDBHandler<QueryMovieArgs>;
  private imagesHandler: TheMovieDBHandler<string>;

  constructor(getRequest: GetTMDBApiRequest) {
    this.trendingsHandler = new TrendingMoviesHandler(getRequest);
    this.detailsHandler = new MovieDetailsHandler(getRequest);
    this.imagesHandler = new MovieImagesHandler(getRequest);
  }

  async getDetails(args: QueryMovieArgs): Promise<MovieResponse | null> {
    return this.detailsHandler.handle(args);
  }

  async getImages(id: string): Promise<string[]> {
    return this.imagesHandler.handle(id);
  }

  async getTrendings(
    args: TrendingMoviesArgs,
    endpoint: TrendingMoviesEndpoints,
  ): Promise<TrendingMoviesQueryResult> {
    return this.trendingsHandler.handle({ args, endpoint });
  }
}

export default MovieHandler;
