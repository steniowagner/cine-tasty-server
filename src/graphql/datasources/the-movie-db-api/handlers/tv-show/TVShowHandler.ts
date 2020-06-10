import { TrendingTVShowsEndpoints, GetTMDBApiRequest } from '@types';
import {
  TrendingTvShowsQueryResult,
  TrendingTvShowsArgs,
  QueryTvShowArgs,
  TvShowResponse,
} from '@lib/types';

import TVShowDetailsHandler from './details/TVShowDetailsHandler';
import TVShowImagesHandler from './images/TVShowImagesHandler';
import TheMovieDBHandler from '../TheMovieDBHandler';
import TVShowTrendingsHandler, {
  Params as TVShowTrendingsParams,
} from './trendings/TVShowTrendingsHandler';

class TVShowHandler {
  private trendingsHandler: TheMovieDBHandler<TVShowTrendingsParams>;
  private detailsHandler: TheMovieDBHandler<QueryTvShowArgs>;
  private imagesHandler: TheMovieDBHandler<string>;

  constructor(getRequest: GetTMDBApiRequest) {
    this.trendingsHandler = new TVShowTrendingsHandler(getRequest);
    this.detailsHandler = new TVShowDetailsHandler(getRequest);
    this.imagesHandler = new TVShowImagesHandler(getRequest);
  }

  async getDetails(args: QueryTvShowArgs): Promise<TvShowResponse | null> {
    return this.detailsHandler.handle(args);
  }

  async getImages(id: string): Promise<string[]> {
    return this.imagesHandler.handle(id);
  }

  async getTrendings(
    args: TrendingTvShowsArgs,
    endpoint: TrendingTVShowsEndpoints,
  ): Promise<TrendingTvShowsQueryResult> {
    return this.trendingsHandler.handle({ args, endpoint });
  }
}

export default TVShowHandler;
