import { GetTMDBApiRequest } from '../../../../../types';
import { SearchQueryEmpty } from '../../../../../errors';
import {
  SearchResultItem,
  SearchQueryResult,
  QuerySearchArgs,
} from '../../../../../lib/types';

type SearchParams = {
  page: number;
  query: string;
};

type GetRequestResult = {
  results: SearchResultItem[];
  total_results: number;
  total_pages: number;
  page: number;
};

export interface Props {
  search: (params: QuerySearchArgs) => Promise<SearchQueryResult>;
}

const BASE_ENDPOINT = '/search';

class SearchHandler implements Props {
  get: GetTMDBApiRequest;

  constructor(execGetRequest: GetTMDBApiRequest) {
    this.get = execGetRequest;
  }

  async search({
    page,
    query,
    language,
    type,
  }: QuerySearchArgs): Promise<SearchQueryResult> {
    const endpoint = `${BASE_ENDPOINT}/${type.toLowerCase()}`;

    if (!query) {
      throw new SearchQueryEmpty();
    }

    const {
      total_results: totalResults,
      results,
      total_pages: totalPages,
    } = await this.get<SearchParams, GetRequestResult>(
      endpoint,
      {
        page,
        query,
      },
      language,
    );

    return {
      hasMore: page < totalPages,
      total_results: totalResults,
      items: results,
    };
  }
}

export default SearchHandler;
