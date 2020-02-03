import { SearchQueryEmpty } from '../../../../../errors';
import {
  SearchResultItem,
  SearchQueryResult,
  QuerySearchArgs,
  Iso6391Language,
} from '../../../../../lib/types';

type SearchParams = {
  page: number;
  query: string;
  language: string;
};

type GetRequestResult = {
  results?: SearchResultItem[];
  total_results?: number;
  total_pages?: number;
  page?: number;
};

type GetRequest = <SearchParams, GetRequestResult>(
  endpoint: string,
  params: SearchParams,
  language?: Iso6391Language | null,
) => Promise<GetRequestResult>;

export interface Props {
  search: (params: QuerySearchArgs) => Promise<SearchQueryResult>;
}

const BASE_ENDPOINT = '/search';

class SearchHandler implements Props {
  get: GetRequest;

  constructor(execGetRequest: GetRequest) {
    this.get = execGetRequest;
  }

  async search(params: QuerySearchArgs): Promise<SearchQueryResult> {
    const endpoint = `${BASE_ENDPOINT}/${params.type.toLowerCase()}`;

    if (!params.query) {
      throw new SearchQueryEmpty();
    }

    const {
      total_results: totalResults,
      results,
      total_pages: totalPages,
    } = await this.get(
      endpoint,
      {
        page: params.page,
        query: params.query,
      },
      params.language,
    );

    return {
      hasMore: params.page < totalPages,
      total_results: totalResults,
      items: results,
    };
  }
}

export default SearchHandler;
