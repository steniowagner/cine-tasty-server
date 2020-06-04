import { BaseMovie, TrendingMoviesQueryResult, TrendingMoviesArgs } from '@lib/types';
import {
  TrendingMoviesEndpoints,
  BasePaginationResponse,
  GetTMDBApiRequest,
  TheMovieDBHandler,
} from '@types';

type GetBaseMovieResponse = BasePaginationResponse & {
  results: BaseMovie[];
};

type GetRequestParams = { page: number } | { append_to_response: string } | {};

type Params = {
  resource: TrendingMoviesEndpoints;
  args: TrendingMoviesArgs;
};

class TrendingMoviesHandler implements TheMovieDBHandler<Params> {
  get: GetTMDBApiRequest;

  constructor(execGetRequest: GetTMDBApiRequest) {
    this.get = execGetRequest;
  }

  async handle({ resource, args }: Params): Promise<TrendingMoviesQueryResult> {
    const { page, language } = args;

    const { total_pages: totalPages, total_results, results } = await this.get<
      GetRequestParams,
      Promise<GetBaseMovieResponse>
    >(resource, { page }, language);

    return {
      hasMore: page < totalPages,
      total_pages: totalPages,
      items: results,
      total_results,
    };
  }
}

export default TrendingMoviesHandler;
