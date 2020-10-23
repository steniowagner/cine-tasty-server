import { TrendingTVShowsEndpoints, GetTMDBApiRequest } from '@tmdb-api-types';
import {
  TrendingTvShowsQueryResult,
  QueryTvShowSeasonArgs,
  TvShowSeasonResponse,
  TrendingTvShowsArgs,
  QueryTvShowArgs,
  TvShowResponse,
} from '@lib/types';

import TVShowDetailsHandler from './details/TVShowDetailsHandler';
import TVShowImagesHandler from './images/TVShowImagesHandler';
import TVShowSeasonHandler from './season/TVShowSeasonHandler';
import TheMovieDBAPIHandler from '../TheMovieDBAPIHandler';
import TVShowTrendingsHandler, {
  Params as TVShowTrendingsParams,
} from './trendings/TVShowTrendingsHandler';

class TVShowHandler {
  private trendingsHandler: TheMovieDBAPIHandler<TVShowTrendingsParams>;
  private seasonHandler: TheMovieDBAPIHandler<QueryTvShowSeasonArgs>;
  private detailsHandler: TheMovieDBAPIHandler<QueryTvShowArgs>;
  private imagesHandler: TheMovieDBAPIHandler<string>;

  constructor(getRequest: GetTMDBApiRequest) {
    this.trendingsHandler = new TVShowTrendingsHandler(getRequest);
    this.detailsHandler = new TVShowDetailsHandler(getRequest);
    this.imagesHandler = new TVShowImagesHandler(getRequest);
    this.seasonHandler = new TVShowSeasonHandler(getRequest);
  }

  async getDetails(args: QueryTvShowArgs): Promise<TvShowResponse | null> {
    return this.detailsHandler.handle(args);
  }

  async getImages(id: string): Promise<string[]> {
    return this.imagesHandler.handle(id);
  }

  async getSeason(args: QueryTvShowSeasonArgs): Promise<TvShowSeasonResponse | null> {
    return this.seasonHandler.handle(args);
  }

  async getTrendings(
    args: TrendingTvShowsArgs,
    endpoint: TrendingTVShowsEndpoints,
  ): Promise<TrendingTvShowsQueryResult> {
    return this.trendingsHandler.handle({ args, endpoint });
  }
}

export default TVShowHandler;
