import { TVShowsEndpoints, MediaImage, GetTMDBApiRequest } from '../../../../../types';
import {
  TrendingTvShowsArgs,
  TrendingTvShowsQueryResult,
  BaseTvShow,
  QueryTv_ShowArgs as QueryTvShowArgs,
  TvShow,
} from '../../../../../lib/types';

type GetBaseTVShowResponse = {
  results: BaseTvShow[];
  total_pages: number;
  page: number;
  total_results: number;
};

type GetTVShowImagesResponse = {
  backdrops: MediaImage[];
  posters: MediaImage[];
  id: number;
};

type GetRequestParams = { page: number } | { append_to_response: string } | {};

export interface Props {
  getTrendingItem(
    params: TrendingTvShowsArgs,
    resource: string,
  ): Promise<TrendingTvShowsQueryResult>;
  getTVShow(params: QueryTvShowArgs): Promise<TvShow | null>;
  getImages(id: string): Promise<string[]>;
}

const BASE_ENDPOINT = 'tv';

class TVShowHandler implements Props {
  get: GetTMDBApiRequest;

  constructor(execGetRequest: GetTMDBApiRequest) {
    this.get = execGetRequest;
  }

  async getTVShow({ id, language }: QueryTvShowArgs): Promise<TvShow | null> {
    return this.get<GetRequestParams, Promise<TvShow>>(
      `${BASE_ENDPOINT}/${id}`,
      {
        append_to_response: 'credits,similar,videos',
      },
      language,
    );
  }

  async getImages(id: string): Promise<string[]> {
    const { backdrops } = await this.get<
      GetRequestParams,
      Promise<GetTVShowImagesResponse>
    >(`tv/${id}/images`, {}, null);

    return backdrops
      .filter(backdrop => !!backdrop.file_path)
      .map(backdrop => backdrop.file_path);
  }

  async getTrendingItem(
    { page, language }: TrendingTvShowsArgs,
    endpoint: TVShowsEndpoints,
  ): Promise<TrendingTvShowsQueryResult> {
    const tvshow = await this.get<GetRequestParams, Promise<GetBaseTVShowResponse>>(
      endpoint,
      { page },
      language,
    );

    return {
      hasMore: page < tvshow.total_pages,
      total_pages: tvshow.total_pages,
      total_results: tvshow.total_results,
      items: tvshow.results,
    };
  }
}

export default TVShowHandler;
