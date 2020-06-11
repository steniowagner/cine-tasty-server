import { TrendingMoviesEndpoints, GetTMDBApiRequest } from '@tmdb-api-types';
import * as LibTypes from '@lib/types';

import MovieDetailsHandler from './details/MovieDetailsHandler';
import MovieImagesHandler from './images/MovieImagesHandler';
import TheMovieDBHandler from '../TheMovieDBHandler';
import TrendingMoviesHandler, {
  Params as TrendingMoviesHandlerParams,
} from './trendings/TrendingMoviesHandler';

class MovieHandler {
  private trendingsHandler: TheMovieDBHandler<TrendingMoviesHandlerParams>;
  private detailsHandler: TheMovieDBHandler<LibTypes.QueryMovieArgs>;
  private imagesHandler: TheMovieDBHandler<string>;

  constructor(getRequest: GetTMDBApiRequest) {
    this.trendingsHandler = new TrendingMoviesHandler(getRequest);
    this.detailsHandler = new MovieDetailsHandler(getRequest);
    this.imagesHandler = new MovieImagesHandler(getRequest);
  }

  async getDetails(
    args: LibTypes.QueryMovieArgs,
  ): Promise<LibTypes.MovieResponse | null> {
    return this.detailsHandler.handle(args);
  }

  async getImages(id: string): Promise<string[]> {
    return this.imagesHandler.handle(id);
  }

  async getTrendings(
    args: LibTypes.TrendingMoviesArgs,
    endpoint: TrendingMoviesEndpoints,
  ): Promise<LibTypes.TrendingMoviesQueryResult> {
    return this.trendingsHandler.handle({ args, endpoint });
  }
}

export default MovieHandler;
