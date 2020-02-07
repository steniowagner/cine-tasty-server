import CONSTANTS from '../../utils/constants';
import {
  BaseMovie,
  TrendingMoviesQueryResult,
  QueryMovieArgs,
  Movie,
  TrendingMoviesArgs,
} from '../../../../../lib/types';
import {
  GetTMDBApiRequest,
  TrendingMoviesEndpoints,
  GetImagesResponse,
  BasePaginationResponse,
} from '../../../../../types';

const BASE_ENDPOINT = 'movie';

type GetBaseMovieResponse = BasePaginationResponse & {
  results: BaseMovie[];
};

type GetRequestParams = { page: number } | { append_to_response: string } | {};

export interface Props {
  getMovie: (params: QueryMovieArgs) => Promise<Movie | null>;
  getTrendingItem: (
    params: TrendingMoviesArgs,
    resource: TrendingMoviesEndpoints,
  ) => Promise<TrendingMoviesQueryResult>;
  getImages: (id: string) => Promise<string[]>;
}

class MovieHandler implements Props {
  get: GetTMDBApiRequest;

  constructor(execGetRequest: GetTMDBApiRequest) {
    this.get = execGetRequest;
  }

  async getMovie({ id, language }: QueryMovieArgs): Promise<Movie | null> {
    const result = await this.get<
      GetRequestParams,
      Promise<Movie & { status_code?: number }>
    >(
      `${BASE_ENDPOINT}/${id}`,
      { append_to_response: 'videos,credits,reviews,similar' },
      language,
    );

    if (result.status_code === CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE) {
      return null;
    }

    return result;
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

  async getImages(id: string): Promise<string[]> {
    const result = await this.get<
      GetRequestParams,
      Promise<GetImagesResponse & { status_code?: number }>
    >(`${BASE_ENDPOINT}/${id}/images`, {}, null);

    if (result.status_code === CONSTANTS.TMDBAPI_ITEM_NOT_FOUND_CODE) {
      return [];
    }

    return result.backdrops
      .filter(backdrop => !!backdrop.file_path)
      .map(backdrop => backdrop.file_path);
  }
}

export default MovieHandler;
