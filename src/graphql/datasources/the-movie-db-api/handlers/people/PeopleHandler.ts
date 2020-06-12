import { PeopleQueryResult, BasePerson, QueryPeopleArgs } from '@lib/types';
import { GetTMDBApiRequest, BasePaginationResponse } from '@tmdb-api-types';

import TheMovieDBAPIHandler from '../TheMovieDBAPIHandler';
import CONSTANTS from '../../utils/constants';

type GetPeopleResponse = BasePaginationResponse & {
  results: BasePerson[];
};

type GetRequestParams = { page: number };

class PeopleHandler extends TheMovieDBAPIHandler<QueryPeopleArgs> {
  constructor(getRequest: GetTMDBApiRequest) {
    super(getRequest);
  }

  async handle({ language, page }: QueryPeopleArgs): Promise<PeopleQueryResult> {
    const endpoint = `${CONSTANTS.PERSON_ENDPOINT}${CONSTANTS.POPULAR_PERSON_ENDPOINT}`;

    const {
      total_results: totalResults,
      total_pages: totalPages,
      results,
    } = await this.get<GetRequestParams, Promise<GetPeopleResponse>>(
      endpoint,
      { page },
      language,
    );

    return {
      hasMore: page < totalPages,
      items: results,
      totalResults,
      totalPages,
    };
  }
}

export default PeopleHandler;
