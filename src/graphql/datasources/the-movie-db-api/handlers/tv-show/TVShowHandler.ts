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
  TVShowTrendingsParams,
} from './trendings/TVShowTrendingsHandler';

class TVShowHandler {
  trendingsHandle: TheMovieDBHandler<TVShowTrendingsParams>;
  detailsHandler: TheMovieDBHandler<QueryTvShowArgs>;
  imagesHandler: TheMovieDBHandler<string>;
  get: GetTMDBApiRequest;

  constructor(execGetRequest: GetTMDBApiRequest) {
    this.get = execGetRequest;

    this.trendingsHandle = new TVShowTrendingsHandler(execGetRequest);
    this.detailsHandler = new TVShowDetailsHandler(execGetRequest);
    this.imagesHandler = new TVShowImagesHandler(execGetRequest);
  }

  async getDetails(args: QueryTvShowArgs): Promise<TvShowResponse | null> {
    return this.detailsHandler.handle(args);
  }

  async getImages(id: string): Promise<string[]> {
    return this.imagesHandler.handle(id);
  }

  async getTrendingItem(
    args: TrendingTvShowsArgs,
    endpoint: TrendingTVShowsEndpoints,
  ): Promise<TrendingTvShowsQueryResult> {
    return this.trendingsHandle.handle({ args, endpoint });
  }
}

export default TVShowHandler;
