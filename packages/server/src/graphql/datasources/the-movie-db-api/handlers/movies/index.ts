import {
  BaseMovie,
  TrendingMoviesQueryResult,
  QueryMovieArgs,
  Movie,
  MovieReviewsArgs,
  SimilarMoviesQueryResult,
  ReviewsQueryResult,
  ReviewItem,
  MovieSimilarArgs,
  TrendingMoviesArgs,
} from '../../../../../lib/types';
import { GetTMDBApiRequest, TrendingMoviesEndpoints } from '../../../../../types';

const BASE_ENDPOINT = 'movie';

type BaseResponse = {
  total_results: number;
  total_pages: number;
  page: number;
};

type GetBaseMovieResponse = BaseResponse & {
  results: BaseMovie[];
};

type GetReviewsResponse = BaseResponse & {
  results: ReviewItem[];
};

type GetRequestParams = { page: number } | { append_to_response: string };

export interface Props {
  getSimilars(params: MovieSimilarArgs): Promise<SimilarMoviesQueryResult>;
  getReviews({ id, reviewsPage }: MovieReviewsArgs): Promise<ReviewsQueryResult>;
  getMovie: (params: QueryMovieArgs) => Promise<Movie | null>;
  getTrendingItem: (
    params: TrendingMoviesArgs,
    resource: TrendingMoviesEndpoints,
  ) => Promise<TrendingMoviesQueryResult>;
}

class MovieHandler implements Props {
  get: GetTMDBApiRequest;

  constructor(execGetRequest: GetTMDBApiRequest) {
    this.get = execGetRequest;
  }

  async getMovie({ id, language }: QueryMovieArgs): Promise<Movie | null> {
    const movie = await this.get<
      GetRequestParams,
      Promise<Movie & { status_message?: string }>
    >(`${BASE_ENDPOINT}/${id}`, { append_to_response: 'videos,credits' }, language);

    if (typeof movie.status_message === 'string') {
      return null;
    }

    return movie;
  }

  async getReviews({ id, reviewsPage }: MovieReviewsArgs): Promise<ReviewsQueryResult> {
    const { total_pages: totalPages, total_results, results } = await this.get<
      GetRequestParams,
      Promise<GetReviewsResponse>
    >(`${BASE_ENDPOINT}/${id}/reviews`, {
      page: reviewsPage,
    });

    return {
      hasMore: reviewsPage < totalPages,
      total_pages: totalPages,
      total_results,
      items: results,
    };
  }

  async getSimilars({
    id,
    similarsPage,
    language,
  }: MovieSimilarArgs): Promise<SimilarMoviesQueryResult> {
    const { total_pages: totalPages, total_results, results } = await this.get<
      GetRequestParams,
      Promise<GetBaseMovieResponse>
    >(
      `${BASE_ENDPOINT}/${id}/similar`,
      {
        page: similarsPage,
      },
      language,
    );

    return {
      hasMore: similarsPage < totalPages,
      total_pages: totalPages,
      total_results,
      items: results,
    };
  }

  async getTrendingItem(
    { page, language }: TrendingMoviesArgs,
    resource: TrendingMoviesEndpoints,
  ): Promise<TrendingMoviesQueryResult> {
    const { total_pages: totalPages, total_results, results } = await this.get<
      GetRequestParams,
      Promise<GetBaseMovieResponse>
    >(resource, { page }, language);

    return {
      hasMore: page < totalPages,
      total_pages: totalPages,
      total_results,
      items: results,
    };
  }
}

export default MovieHandler;
