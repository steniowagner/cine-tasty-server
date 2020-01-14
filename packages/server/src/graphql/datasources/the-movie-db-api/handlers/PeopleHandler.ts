import {
  Genres,
  BasePersonResponse,
  GetPersonDetailsResult,
  CastResult,
} from '../../../../types';
import { getFormatedLanguage } from '../helpers';
import { PeopleQueryResult, Iso6391Language, Person } from '../../../../lib/types';

const COMBINED_CREDITS_ENDPOINT = '/combined_credits';
const POPULAR_PERSON_ENDPOINT = '/popular';
const PERSON_ENDPOINT = '/person';

type BasePersonRequest = {
  append_to_response: string;
  language: string;
};

type BasePeopelRequest = {
  language: string;
  page: number;
};

type GetPopularPeopleResult = {
  results: BasePersonResponse[];
  total_pages: number;
};

type GetRequest = <T>(
  endpoint: string,
  params: { language: string } | BasePersonRequest | BasePeopelRequest,
) => Promise<T>;

export interface Props {
  getPopularPeople: (
    page: number,
    genres: Genres,
    language?: Iso6391Language | null,
  ) => Promise<PeopleQueryResult>;
  getPerson: (
    id: number,
    genres: Genres,
    language?: Iso6391Language | null,
  ) => Promise<Person | null>;
  get: GetRequest;
}

class PeopleHandler implements Props {
  get: GetRequest;

  constructor(execGetRequest: GetRequest) {
    this.get = execGetRequest;
  }

  async getPopularPeople(
    page: number,
    genres: Genres,
    language?: Iso6391Language | null,
  ): Promise<PeopleQueryResult> {
    const { total_pages, results } = await (<Promise<GetPopularPeopleResult>>this.get(
      `${PERSON_ENDPOINT}/${POPULAR_PERSON_ENDPOINT}`,
      {
        language: getFormatedLanguage(language),
        page,
      },
    ));

    return {
      hasMore: page < total_pages,
      items: [
        {
          knownForDepartment: '',
          adult: true,
          profileImage: '',
          popularity: 123.321,
          name: '',
          knownFor: [],
          gender: 123,
          id: '123',
        },
      ],
    };
  }

  async getPerson(
    id: number,
    genres: Genres,
    language?: Iso6391Language | null,
  ): Promise<Person | null> {
    const params = {
      language: getFormatedLanguage(language),
    };

    const [details, { cast }] = await Promise.all<GetPersonDetailsResult, CastResult>([
      this.get(`${PERSON_ENDPOINT}/${id}`, { ...params, append_to_response: 'images' }),
      this.get(`${PERSON_ENDPOINT}/${id}${COMBINED_CREDITS_ENDPOINT}`, params),
    ]);

    if (details.success === false) {
      return null;
    }

    return null;
  }
}

export default PeopleHandler;
