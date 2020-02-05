import { PeopleQueryResult, BasePerson, QueryPeopleArgs } from '../../../../../lib/types';
import { GetTMDBApiRequest } from '../../../../../types';

const POPULAR_PERSON_ENDPOINT = '/popular';
const PERSON_ENDPOINT = '/person';

type GetPeopleResponse = {
  results: BasePerson[];
  total_pages: number;
  page: number;
  total_results: number;
};

type GetRequestParams = { page: number };

export interface Props {
  getPopularPeople: (params: QueryPeopleArgs) => Promise<PeopleQueryResult>;
}

class PeopleHandler implements Props {
  get: GetTMDBApiRequest;

  constructor(execGetRequest: GetTMDBApiRequest) {
    this.get = execGetRequest;
  }

  async getPopularPeople({
    language,
    page,
  }: QueryPeopleArgs): Promise<PeopleQueryResult> {
    const endpoint = `${PERSON_ENDPOINT}${POPULAR_PERSON_ENDPOINT}`;

    const { total_pages: totalPages, total_results, results } = await this.get<
      GetRequestParams,
      Promise<GetPeopleResponse>
    >(endpoint, { page }, language);

    return {
      hasMore: page < totalPages,
      total_pages: totalPages,
      total_results,
      items: results,
    };
  }
}

export default PeopleHandler;
