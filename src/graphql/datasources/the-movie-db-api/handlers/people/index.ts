import { PeopleQueryResult, BasePerson, QueryPeopleArgs } from '@lib/types';
import { GetTMDBApiRequest, BasePaginationResponse } from '@types';

const POPULAR_PERSON_ENDPOINT = '/popular';
const PERSON_ENDPOINT = '/person';

type GetPeopleResponse = BasePaginationResponse & {
  results: BasePerson[];
};

type GetRequestParams = { page: number };

class PeopleHandler {
  get: GetTMDBApiRequest;

  constructor(execGetRequest: GetTMDBApiRequest) {
    this.get = execGetRequest;
  }

  async getPopularPeople({
    language,
    page,
  }: QueryPeopleArgs): Promise<PeopleQueryResult> {
    const endpoint = `${PERSON_ENDPOINT}${POPULAR_PERSON_ENDPOINT}`;

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
