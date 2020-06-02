import { GetTMDBApiRequest, BasePaginationResponse } from '../../../../../@types';
import { SearchQueryEmpty } from '../../../../../errors';
import CONSTANTS from '../../utils/constants';
import {
  SearchResultItem,
  SearchQueryResult,
  SearchInput,
} from '../../../../../lib/types';

type SearchParams = {
  page: number;
  query: string;
};

type GetRequestResult = BasePaginationResponse & {
  results: SearchResultItem[];
};

export interface Props {
  search: (input: SearchInput) => Promise<SearchQueryResult>;
}

class SearchHandler implements Props {
  get: GetTMDBApiRequest;

  constructor(execGetRequest: GetTMDBApiRequest) {
    this.get = execGetRequest;
  }

  async search({ page, query, language, type }: SearchInput): Promise<SearchQueryResult> {
    const endpoint = `${CONSTANTS.SEARCH_ENDPOINT}/${type.toLowerCase()}`;

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
