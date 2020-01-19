import {
  PeopleQueryResult,
  Iso6391Language,
  BasePerson,
  QueryPeopleArgs,
} from '../../../../../lib/types';

const POPULAR_PERSON_ENDPOINT = '/popular';
const PERSON_ENDPOINT = '/person';

type GetPeopleResponse = {
  results: BasePerson[];
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
  getPopularPeople: (params: QueryPeopleArgs) => Promise<PeopleQueryResult>;
  get: GetRequest;
}

class PeopleHandler implements Props {
  get: GetRequest;

  constructor(execGetRequest: GetRequest) {
    this.get = execGetRequest;
  }

  async getPopularPeople({
    language,
    page,
  }: QueryPeopleArgs): Promise<PeopleQueryResult> {
    const endpoint = `${PERSON_ENDPOINT}${POPULAR_PERSON_ENDPOINT}`;

    const { total_pages: totalPages, total_results, results } = await this.get<
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
