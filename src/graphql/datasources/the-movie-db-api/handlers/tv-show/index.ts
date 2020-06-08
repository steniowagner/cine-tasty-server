import CONSTANTS from '../../utils/constants';
import {
  TrendingTVShowsEndpoints,
  GetImagesResponse,
  GetTMDBApiRequest,
  BasePaginationResponse,
} from '../../../../../@types';
import {
  TrendingTvShowsArgs,
  TrendingTvShowsQueryResult,
  BaseTvShow,
  QueryTv_ShowArgs as QueryTvShowArgs,
  TvShow,
} from '../../../../../lib/types';
type GetBaseTVShowResponse = BasePaginationResponse & {
  results: BaseTvShow[];
};

type GetRequestParams = { page: number } | { append_to_response: string } | {};

export interface Props {
  getTrendingItem(
    params: TrendingTvShowsArgs,
    resource: TrendingTVShowsEndpoints,
  ): Promise<TrendingTvShowsQueryResult>;
  getTVShow(params: QueryTvShowArgs): Promise<TvShow | null>;
  getImages(id: string): Promise<string[]>;
}

class TVShowHandler implements Props {
  get: GetTMDBApiRequest;

  constructor(execGetRequest: GetTMDBApiRequest) {
    this.get = execGetRequest;
  }

  async getTVShow({ id, language }: QueryTvShowArgs): Promise<TvShow | null> {
    const tvshow = await this.get<
      GetRequestParams,
      Promise<TvShow & { status_code?: number }>
    >(
      `${CONSTANTS.TV_ENDPOINT}/${id}`,
      {
        append_to_response: 'credits,similar,videos,reviews',
      },
      language,
    );

    if (tvshow.status_code === CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE) {
      return null;
    }

    return tvshow;
  }

  async getImages(id: string): Promise<string[]> {
    const result = await this.get<
      GetRequestParams,
      Promise<GetImagesResponse & { status_code?: number }>
    >(`${CONSTANTS.TV_ENDPOINT}/${id}/images`, {}, null);

    if (result.status_code === CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE) {
      return [];
    }

    return result.backdrops
      .filter(backdrop => !!backdrop.file_path)
      .map(backdrop => backdrop.file_path);
  }

  async getTrendingItem(
    { page, language }: TrendingTvShowsArgs,
    endpoint: TrendingTVShowsEndpoints,
  ): Promise<TrendingTvShowsQueryResult> {
    const {
      total_pages: totalPages,
      total_results: totalResults,
      results,
    } = await this.get<GetRequestParams, Promise<GetBaseTVShowResponse>>(
      endpoint,
      { page },
      language,
    );

    return {
      hasMore: page < totalPages,
      items: results,
      totalResults,
      totalPages,
    };
  }
}

export default TVShowHandler;
