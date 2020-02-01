import {
  Iso6391Language,
  BaseMovie,
  TrendingMoviesQueryResult,
  TrendingMoviesInput,
} from '../../../../../lib/types';

const BASE_ENDPOINT = 'movie';

type APIResponse = {
  results: BaseMovie[];
  total_pages: number;
  page: number;
  total_results: number;
};

type GetRequest = <T>(
  endpoint: string,
  params: { page: number },
  language?: Iso6391Language | null,
) => Promise<T>;

export interface Props {
  getTrendingItem: (
    params: TrendingMoviesInput,
    resource: string,
  ) => Promise<TrendingMoviesQueryResult>;
}

class MovieHandler implements Props {
  get: GetRequest;

  constructor(execGetRequest: GetRequest) {
    this.get = execGetRequest;
  }

  async getTrendingItem(
    { page, language }: TrendingMoviesInput,
    resource: string,
  ): Promise<TrendingMoviesQueryResult> {
    const { total_pages: totalPages, total_results, results } = await this.get<
      Promise<APIResponse>
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
