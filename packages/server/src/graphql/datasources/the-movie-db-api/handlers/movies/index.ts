import {
  Iso6391Language,
  BaseMovie,
  TrendingMoviesQueryResult,
  TrendingMoviesInput,
  QueryMovieArgs,
  Movie,
  MovieReviewsArgs,
  SimilarMoviesQueryResult,
  ReviewsQueryResult,
  ReviewItem,
  MovieSimilarArgs,
} from '../../../../../lib/types';

const BASE_ENDPOINT = 'movie';

type GetBaseMovieResponse = {
  results: BaseMovie[];
  total_pages: number;
  page: number;
  total_results: number;
};

type GetReviewsResponse = {
  results: ReviewItem[];
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
  getSimilars(params: MovieSimilarArgs): Promise<SimilarMoviesQueryResult>;
  getReviews({ id, reviewsPage }: MovieReviewsArgs): Promise<ReviewsQueryResult>;
  getTrendingItem: (
    params: TrendingMoviesInput,
    resource: string,
  ) => Promise<TrendingMoviesQueryResult>;
  getMovie: (params: QueryMovieArgs) => Promise<Movie>;
}

class MovieHandler implements Props {
  get: GetRequest;

  constructor(execGetRequest: GetRequest) {
    this.get = execGetRequest;
  }

  async getMovie({ id, language }: QueryMovieArgs): Promise<Movie> {
    return this.get<Promise<Movie>>(
      `${BASE_ENDPOINT}/${id}`,
      { append_to_response: 'videos,credits' },
      language,
    );
  }

  async getReviews({ id, reviewsPage }: MovieReviewsArgs): Promise<ReviewsQueryResult> {
    const { total_pages: totalPages, total_results, results } = await this.get<
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
    { page, language }: TrendingMoviesInput,
    resource: string,
  ): Promise<TrendingMoviesQueryResult> {
    const { total_pages: totalPages, total_results, results } = await this.get<
      Promise<GetBaseMovieResponse>
    >(`${BASE_ENDPOINT}/${resource}`, { page }, language);

    return {
      hasMore: page < totalPages,
      total_pages: totalPages,
      total_results,
      items: results,
    };
  }
}

export default MovieHandler;
