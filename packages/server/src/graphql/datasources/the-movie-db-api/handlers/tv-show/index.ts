import {
  Iso6391Language,
  TrendingTvShowsArgs,
  TrendingTvShowsQueryResult,
  BaseTvShow,
} from '../../../../../lib/types';

import { TVShowsEndpoints } from '../../../../../types';

type GetBaseTVShowResponse = {
  status_message?: string;
  results: BaseTvShow[];
  total_pages: number;
  page: number;
  total_results: number;
};

type GetRequest = <T>(
  endpoint: string,
  params: { page: number } | { append_to_response: string },
  language?: Iso6391Language | null,
) => Promise<T>;

export interface Props {
  getTrendingItem(
    params: TrendingTvShowsArgs,
    resource: string,
  ): Promise<TrendingTvShowsQueryResult>;
}

class TVShowHandler implements Props {
  get: GetRequest;

  constructor(execGetRequest: GetRequest) {
    this.get = execGetRequest;
  }

  async getTrendingItem(
    { page, language }: TrendingTvShowsArgs,
    endpoint: TVShowsEndpoints,
  ): Promise<TrendingTvShowsQueryResult> {
    const tvshow = await this.get<Promise<GetBaseTVShowResponse>>(
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
