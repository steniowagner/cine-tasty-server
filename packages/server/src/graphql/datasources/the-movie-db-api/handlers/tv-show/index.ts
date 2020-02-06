import {
  TrendingTVShowsEndpoints,
  GetImagesResponse,
  GetTMDBApiRequest,
  BasePaginationResponse,
} from '../../../../../types';
import {
  TrendingTvShowsArgs,
  TrendingTvShowsQueryResult,
  BaseTvShow,
  QueryTv_ShowArgs as QueryTvShowArgs,
  TvShow,
  ReviewsQueryResult,
  TvShowReviewsArgs,
  ReviewItem,
} from '../../../../../lib/types';

type GetBaseTVShowResponse = BasePaginationResponse & {
  results: BaseTvShow[];
};

type GetReviewsResponse = BasePaginationResponse & {
  results: ReviewItem[];
};

type GetRequestParams = { page: number } | { append_to_response: string } | {};

export interface Props {
  getTrendingItem(
    params: TrendingTvShowsArgs,
    resource: TrendingTVShowsEndpoints,
  ): Promise<TrendingTvShowsQueryResult>;
  getTVShow(params: QueryTvShowArgs): Promise<TvShow | null>;
  getReviews(args: TvShowReviewsArgs): Promise<ReviewsQueryResult>;
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
    const { backdrops } = await this.get<GetRequestParams, Promise<GetImagesResponse>>(
      `${BASE_ENDPOINT}/${id}/images`,
      {},
      null,
    );

    return backdrops
      .filter(backdrop => !!backdrop.file_path)
      .map(backdrop => backdrop.file_path);
  }

  async getReviews({
    id,
    reviewsPage,
    language,
  }: TvShowReviewsArgs): Promise<ReviewsQueryResult> {
    const { total_pages: totalPages, total_results, results } = await this.get<
      GetRequestParams,
      Promise<GetReviewsResponse>
    >(
      `${BASE_ENDPOINT}/${id}/reviews`,
      {
        page: reviewsPage,
      },
      language,
    );

    return {
      hasMore: reviewsPage < totalPages,
      total_pages: totalPages,
      total_results,
      items: results,
    };
  }

  async getTrendingItem(
    { page, language }: TrendingTvShowsArgs,
    endpoint: TrendingTVShowsEndpoints,
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
