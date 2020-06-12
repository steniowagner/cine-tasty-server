import { SearchResultItem, SearchQueryResult, SearchInput } from '@lib/types';
import { GetTMDBApiRequest, BasePaginationResponse } from '@tmdb-api-types';
import { SearchQueryEmptyError } from '@errors';

import TheMovieDBAPIHandler from '../TheMovieDBAPIHandler';
import CONSTANTS from '../../utils/constants';

type SearchParams = {
  page: number;
  query: string;
};

type GetRequestResult = BasePaginationResponse & {
  results: SearchResultItem[];
};

class SearchHandler extends TheMovieDBAPIHandler<SearchInput> {
  constructor(getRequest: GetTMDBApiRequest) {
    super(getRequest);
  }

  async handle({ page, query, language, type }: SearchInput): Promise<SearchQueryResult> {
    const endpoint = `${CONSTANTS.SEARCH_ENDPOINT}/${type.toLowerCase()}`;

    if (!query) {
      throw new SearchQueryEmptyError();
    }

    const {
      total_results: totalResults,
      total_pages: totalPages,
      results,
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
      items: results,
      totalResults,
    };
  }
}

export default SearchHandler;
