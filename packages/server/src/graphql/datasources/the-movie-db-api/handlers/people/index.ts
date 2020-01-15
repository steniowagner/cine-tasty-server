import { attachKnownForToPeople } from '../../helpers';
import { Genres } from '../../../../../types';
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
  getPopularPeople: (
    params: QueryPeopleArgs,
    genres: Genres,
  ) => Promise<PeopleQueryResult>;
  get: GetRequest;
}

class PeopleHandler implements Props {
  get: GetRequest;

  constructor(execGetRequest: GetRequest) {
    this.get = execGetRequest;
  }

  attachKnownForToPeopleResult(people: BasePerson[], mediaGenres: Genres): BasePerson[] {
    return people.map(person => attachKnownForToPeople(person, mediaGenres));
  }

  async getPopularPeople(
    { language, page }: QueryPeopleArgs,
    mediaGenres: Genres,
  ): Promise<PeopleQueryResult> {
    const endpoint = `${PERSON_ENDPOINT}${POPULAR_PERSON_ENDPOINT}`;

    const { total_pages: totalPages, total_results, results } = await this.get<
      Promise<GetPeopleResponse>
    >(endpoint, { page }, language);

    const items = this.attachKnownForToPeopleResult(results, mediaGenres);

    return {
      hasMore: page < totalPages,
      total_pages: totalPages,
      total_results,
      items,
    };
  }
}

export default PeopleHandler;
